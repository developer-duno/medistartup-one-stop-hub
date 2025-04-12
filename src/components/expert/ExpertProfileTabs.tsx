
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpertDetails } from "./ExpertDetails";
import { ExpertServices } from "./ExpertServices";
import { ExpertReviews } from "./ExpertReviews";
import { type Expert } from "@/hooks/useExpertProfile";

interface ExpertProfileTabsProps {
  expert: Expert;
}

export function ExpertProfileTabs({ expert }: ExpertProfileTabsProps) {
  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      
      <TabsContent value="about" className="mt-6">
        <ExpertDetails expert={expert} />
      </TabsContent>
      
      <TabsContent value="services" className="mt-6">
        <ExpertServices expert={expert} />
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-6">
        <ExpertReviews />
      </TabsContent>
    </Tabs>
  );
}
