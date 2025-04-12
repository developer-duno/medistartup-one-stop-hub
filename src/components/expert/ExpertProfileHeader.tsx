
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { type Expert } from "@/hooks/useExpertProfile";

interface ExpertProfileHeaderProps {
  expert: Expert;
}

export function ExpertProfileHeader({ expert }: ExpertProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <Avatar className="h-24 w-24 border">
        <AvatarImage src={expert.profileImage} alt={expert.name} />
        <AvatarFallback>{expert.name.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">{expert.name}</h1>
        <p className="text-lg text-muted-foreground">{expert.role}</p>
        
        <div className="mt-2 flex flex-wrap gap-2">
          {expert.specialties.map((specialty, index) => (
            <Badge key={index} variant="outline">{specialty}</Badge>
          ))}
        </div>
        
        <div className="mt-2 flex items-center gap-1">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{expert.rating}</span>
          <span className="text-muted-foreground">({expert.reviews} reviews)</span>
        </div>
      </div>
    </div>
  );
}
