
import { Expert } from "@/types/expert";

/**
 * Migrates old "경기" region to new "경기남부" and "경기북부" regions
 * @param experts The experts array to update
 * @returns Updated experts array with migrated regions
 */
export const migrateExpertRegions = (experts: Expert[]): Expert[] => {
  return experts.map(expert => {
    // Skip if expert doesn't have regions data
    if (!expert.regions) return expert;
    
    // Check if expert has the deprecated "경기" region
    if (expert.regions.includes("경기")) {
      // Create new regions array without "경기"
      const updatedRegions = expert.regions.filter(r => r !== "경기");
      
      // Add "경기남부" if not already present
      if (!updatedRegions.includes("경기남부")) {
        updatedRegions.push("경기남부");
      }
      
      return {
        ...expert,
        regions: updatedRegions
      };
    }
    
    return expert;
  });
};
