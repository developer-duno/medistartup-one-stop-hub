
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { type Expert } from "@/hooks/useExpertProfile";

interface ExpertContactCardProps {
  expert: Expert;
}

export function ExpertContactCard({ expert }: ExpertContactCardProps) {
  return (
    <Card className="lg:max-w-sm">
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-muted-foreground" />
          <span>{expert.contactInfo.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <span>{expert.contactInfo.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <span>{expert.contactInfo.location}</span>
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button className="w-full">Schedule a Consultation</Button>
        </div>
      </CardContent>
    </Card>
  );
}
