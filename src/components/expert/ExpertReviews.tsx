
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export function ExpertReviews() {
  // Mock reviews data - in a real application, this would be fetched from an API
  const reviews = [
    {
      id: "1",
      author: "John Smith",
      avatar: "/placeholder.svg",
      rating: 5,
      date: "2 months ago",
      content: "Dr. Johnson provided exceptional financial advice that helped my practice grow significantly. Her expertise in healthcare finance is unmatched.",
    },
    {
      id: "2",
      author: "Maria Garcia",
      avatar: "/placeholder.svg",
      rating: 5,
      date: "3 months ago",
      content: "Working with Sarah was a game-changer for our clinic. Her strategic financial planning helped us navigate a challenging period with confidence.",
    },
    {
      id: "3",
      author: "David Lee",
      avatar: "/placeholder.svg",
      rating: 4,
      date: "5 months ago",
      content: "Highly professional and knowledgeable. Dr. Johnson's insights into healthcare investment opportunities were invaluable for our long-term planning.",
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Client Reviews</h3>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.avatar} alt={review.author} />
                <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{review.author}</h4>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{review.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
