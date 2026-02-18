import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max 5 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Input sanitization
function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateInput(body: Record<string, unknown>): { valid: boolean; error?: string } {
  const { name, phone, region, specialty } = body;
  
  if (!name || typeof name !== "string" || name.trim().length < 1 || name.length > 100) {
    return { valid: false, error: "유효하지 않은 이름입니다." };
  }
  if (!phone || typeof phone !== "string" || !/^[\d\-\+\s()]{8,20}$/.test(phone)) {
    return { valid: false, error: "유효하지 않은 전화번호입니다." };
  }
  if (!region || typeof region !== "string" || region.length > 50) {
    return { valid: false, error: "유효하지 않은 지역입니다." };
  }
  if (!specialty || typeof specialty !== "string" || specialty.length > 100) {
    return { valid: false, error: "유효하지 않은 진료과목입니다." };
  }
  
  if (body.email && typeof body.email === "string" && body.email.length > 0) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email) || body.email.length > 254) {
      return { valid: false, error: "유효하지 않은 이메일입니다." };
    }
  }
  
  if (body.message && typeof body.message === "string" && body.message.length > 2000) {
    return { valid: false, error: "메시지가 너무 깁니다." };
  }
  
  return { valid: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || "unknown";
    
    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ success: false, error: "요청이 너무 많습니다. 잠시 후 다시 시도해주세요." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const SENDGRID_API_KEY = Deno.env.get("SENDGRID_API_KEY");
    if (!SENDGRID_API_KEY) {
      throw new Error("SENDGRID_API_KEY is not configured");
    }

    const body = await req.json();

    // Input validation
    const validation = validateInput(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ success: false, error: validation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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
    
    // Sanitize all user inputs before embedding in HTML
    const name = sanitizeHtml(String(body.name));
    const phone = sanitizeHtml(String(body.phone));
    const email = body.email ? sanitizeHtml(String(body.email)) : "미입력";
    const region = sanitizeHtml(String(body.region));
    const specialty = sanitizeHtml(String(body.specialty));
    const message = body.message ? sanitizeHtml(String(body.message)) : "없음";

    const emailContent = `
      <h2>새로운 상담 신청이 접수되었습니다</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">이름</td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">연락처</td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">이메일</td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">관심 지역</td><td style="padding: 8px; border: 1px solid #ddd;">${region}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">진료과목</td><td style="padding: 8px; border: 1px solid #ddd;">${specialty}</td></tr>
        <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">문의사항</td><td style="padding: 8px; border: 1px solid #ddd;">${message}</td></tr>
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
