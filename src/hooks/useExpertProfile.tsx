
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Define the expert type
export type Expert = {
  id: string;
  name: string;
  role: string;
  profileImage: string;
  bio: string;
  specialties: string[];
  experience: string;
  education: string[];
  certifications: string[];
  rating: number;
  reviews: number;
  services: {
    id: string;
    name: string;
    description: string;
  }[];
  contactInfo: {
    email: string;
    phone: string;
    location: string;
  };
};

export function useExpertProfile() {
  const { id } = useParams<{ id: string }>();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real application, you would fetch the expert data from an API
    // For now, we'll just simulate that with a timeout
    setLoading(true);
    
    setTimeout(() => {
      // Mock data
      const mockExpert: Expert = {
        id: id || '1',
        name: 'Dr. Sarah Johnson',
        role: 'Financial Consultant',
        profileImage: '/placeholder.svg',
        bio: 'Dr. Sarah Johnson is a leading expert in healthcare financial consulting with over 15 years of experience helping medical practices optimize their financial operations.',
        specialties: ['Financial Analysis', 'Practice Optimization', 'Investment Strategy'],
        experience: '15+ years of experience in healthcare financial consulting',
        education: ['MBA, Harvard Business School', 'BS in Finance, Stanford University'],
        certifications: ['Certified Financial Planner (CFP)', 'Certified Healthcare Financial Professional (CHFP)'],
        rating: 4.9,
        reviews: 128,
        services: [
          {
            id: '1',
            name: 'Financial Consulting',
            description: 'Comprehensive financial analysis and optimization strategies for healthcare practices.'
          },
          {
            id: '2',
            name: 'Investment Advisory',
            description: 'Expert guidance on investment opportunities specific to healthcare professionals.'
          }
        ],
        contactInfo: {
          email: 'sarah.johnson@example.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA'
        }
      };
      
      setExpert(mockExpert);
      setLoading(false);
    }, 1000);
  }, [id]);
  
  return {
    expert,
    loading,
    error
  };
}
