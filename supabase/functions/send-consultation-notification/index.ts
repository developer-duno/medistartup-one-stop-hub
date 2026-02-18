import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
    if (!SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get notification email from admin_settings
    const { data: settingsData, error: settingsError } = await supabase
      .from("admin_settings")
      .select("value")
      .eq("key", "notification_email")
      .single();

    if (settingsError || !settingsData) {
      throw new Error("Notification email not configured");
    }

    const adminEmail = settingsData.value;

    // Get sender email from admin_settings
    const { data: senderData } = await supabase
      .from("admin_settings")
      .select("value")
      .eq("key", "sender_email")
      .single();

    const senderEmail = senderData?.value || "noreply@medistartup.kr";
    const { name, phone, email, region, specialty, message } = await req.json();

    const emailContent = `
      <h2>새로운 상담 신청이 접수되었습니다</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">이름</td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">연락처</td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">이메일</td><td style="padding: 8px; border: 1px solid #ddd;">${email || "미입력"}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">관심 지역</td><td style="padding: 8px; border: 1px solid #ddd;">${region}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">진료과목</td><td style="padding: 8px; border: 1px solid #ddd;">${specialty}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">문의사항</td><td style="padding: 8px; border: 1px solid #ddd;">${message || "없음"}</td></tr>
      </table>
      <p style="margin-top: 16px; color: #666;">관리자 페이지에서 상세 내용을 확인하세요.</p>
    `;

    const sgResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: adminEmail }] }],
        from: { email: senderEmail, name: "메디스타트업" },
        subject: `[메디스타트업] 새 상담 신청 - ${name} (${specialty})`,
        content: [{ type: "text/html", value: emailContent }],
      }),
    });

    if (!sgResponse.ok) {
      const errorBody = await sgResponse.text();
      throw new Error(`SendGrid API failed [${sgResponse.status}]: ${errorBody}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error sending notification:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
