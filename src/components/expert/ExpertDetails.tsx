
import { type Expert } from "@/hooks/useExpertProfile";

interface ExpertDetailsProps {
  expert: Expert;
}

export function ExpertDetails({ expert }: ExpertDetailsProps) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-3 text-lg font-medium">About</h3>
        <p className="text-muted-foreground">{expert.bio}</p>
      </section>
      
      <section>
        <h3 className="mb-3 text-lg font-medium">Experience</h3>
        <p className="text-muted-foreground">{expert.experience}</p>
      </section>
      
      <section>
        <h3 className="mb-3 text-lg font-medium">Education</h3>
        <ul className="list-inside list-disc text-muted-foreground">
          {expert.education.map((edu, index) => (
            <li key={index}>{edu}</li>
          ))}
        </ul>
      </section>
      
      <section>
        <h3 className="mb-3 text-lg font-medium">Certifications</h3>
        <ul className="list-inside list-disc text-muted-foreground">
          {expert.certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
