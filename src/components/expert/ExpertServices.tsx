
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Expert } from "@/hooks/useExpertProfile";

interface ExpertServicesProps {
  expert: Expert;
}

export function ExpertServices({ expert }: ExpertServicesProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Services Offered</h3>
      
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        {expert.services.map((service) => (
          <Card key={service.id}>
            <CardHeader>
              <CardTitle>{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{service.description}</CardDescription>
              <Button variant="outline" className="w-full">Learn More</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
