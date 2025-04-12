
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { QuickLinkItem } from './dashboardTypes';

interface QuickLinksProps {
  links: QuickLinkItem[];
  setActiveSection: (section: string) => void;
}

const QuickLinks: React.FC<QuickLinksProps> = ({ links, setActiveSection }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {links.map((link, index) => (
        <Card 
          key={index} 
          className="cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setActiveSection(link.section)}
        >
          <CardContent className="flex items-center gap-3 p-4">
            <div className="bg-primary/10 p-2 rounded-full">
              {link.icon}
            </div>
            <span className="font-medium">{link.title}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickLinks;
