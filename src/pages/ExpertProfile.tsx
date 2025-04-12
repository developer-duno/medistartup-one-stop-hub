
import { useExpertProfile } from "@/hooks/useExpertProfile";
import { ExpertProfileHeader } from "@/components/expert/ExpertProfileHeader";
import { ExpertProfileTabs } from "@/components/expert/ExpertProfileTabs";
import { ExpertContactCard } from "@/components/expert/ExpertContactCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExpertProfile() {
  const { expert, loading } = useExpertProfile();

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          <Skeleton className="h-24 w-24 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-6 w-48" />
            <div className="mt-2 flex gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Skeleton className="h-12 w-full" />
            <div className="mt-6">
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
          <div>
            <Skeleton className="h-80 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Expert Not Found</h1>
          <p className="mt-2 text-muted-foreground">The expert profile you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <ExpertProfileHeader expert={expert} />
      
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ExpertProfileTabs expert={expert} />
        </div>
        <div>
          <ExpertContactCard expert={expert} />
        </div>
      </div>
    </div>
  );
}
