
import { Expert } from "@/types/expert";
import { regionOptions } from "@/utils/schema/regionSchema";

/**
 * Migrates deprecated region names to current regionSchema values.
 * - "경기" → "경기남부", "경기북부"
 * - "전라" → "광주"
 * - Removes any region not in regionOptions
 */
export const migrateExpertRegions = (experts: Expert[]): Expert[] => {
  const migrationMap: Record<string, string[]> = {
    "경기": ["경기남부", "경기북부"],
    "전라": ["광주"],
    "전남": ["광주"],
    "전북": ["광주"],
  };

  return experts.map(expert => {
    if (!expert.regions) return expert;
    
    let updated = false;
    let newRegions = [...expert.regions];

    // Apply migration map
    for (const [oldName, replacements] of Object.entries(migrationMap)) {
      if (newRegions.includes(oldName)) {
        newRegions = newRegions.filter(r => r !== oldName);
        for (const replacement of replacements) {
          if (!newRegions.includes(replacement)) {
            newRegions.push(replacement);
          }
        }
        updated = true;
      }
    }

    // Remove any region not in the valid regionOptions
    const validRegions = newRegions.filter(r => regionOptions.includes(r));
    if (validRegions.length !== newRegions.length) {
      updated = true;
      newRegions = validRegions;
    }

    return updated ? { ...expert, regions: newRegions } : expert;
  });
};
