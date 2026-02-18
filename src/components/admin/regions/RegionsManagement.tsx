
import React, { useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin, Users, User, Crown } from 'lucide-react';
import { useExperts } from '@/contexts/ExpertsContext';
import { regionGroups, RegionGroup } from '@/utils/schema/regionSchema';
import { Link } from 'react-router-dom';

const RegionsManagement: React.FC = () => {
  const { experts } = useExperts();

  const getExpertCountForRegion = (regionName: string) => {
    return experts.filter(expert => expert.regions.includes(regionName)).length;
  };

  const getManagerForRegion = (regionName: string) => {
    return experts.find(expert =>
      expert.isRegionalManager && expert.regions.includes(regionName)
    );
  };

  const getGroupExpertCount = (group: RegionGroup) => {
    const uniqueExperts = new Set<number>();
    group.regions.forEach(regionName => {
      experts.forEach(expert => {
        if (expert.regions.includes(regionName)) {
          uniqueExperts.add(expert.id);
        }
      });
    });
    return uniqueExperts.size;
  };

  const getGroupManagers = (group: RegionGroup) => {
    const managers = new Map<number, typeof experts[0]>();
    group.regions.forEach(regionName => {
      const manager = getManagerForRegion(regionName);
      if (manager) managers.set(manager.id, manager);
    });
    return Array.from(managers.values());
  };

  const totalExperts = experts.length;

  return (
    <div className="space-y-6">
      {/* 요약 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-pretendard font-bold text-2xl">지역별 전문가 네트워크</h2>
          <p className="text-sm text-muted-foreground mt-1">
            메인 홈페이지의 지역별 전문가 네트워크와 동일한 구조입니다.
          </p>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1.5">
          <Users className="h-4 w-4 mr-1.5" />
          전체 전문가 {totalExperts}명
        </Badge>
      </div>

      {/* 권역별 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {regionGroups.map((group) => {
          const groupCount = getGroupExpertCount(group);
          const managers = getGroupManagers(group);

          return (
            <Card key={group.name} className="overflow-hidden">
              <CardHeader className="bg-muted/50 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {group.name}
                  </CardTitle>
                  <Badge variant="secondary" className="text-sm">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    {groupCount}명
                  </Badge>
                </div>
                {managers.length > 0 && (
                  <div className="flex items-center gap-2 mt-2">
                    <Crown className="h-3.5 w-3.5 text-accent" />
                    <span className="text-xs text-muted-foreground">총괄:</span>
                    {managers.map(m => (
                      <Badge key={m.id} variant="outline" className="text-xs gap-1">
                        <User className="h-3 w-3" />
                        {m.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                {group.regions.map((regionName) => {
                  const count = getExpertCountForRegion(regionName);
                  const manager = getManagerForRegion(regionName);

                  return (
                    <div
                      key={regionName}
                      className="flex items-center justify-between p-3 rounded-lg border bg-background hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary/70" />
                        <span className="font-medium text-sm">{regionName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {manager && (
                          <div className="flex items-center gap-1.5">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={manager.image} alt={manager.name} />
                              <AvatarFallback className="text-[10px]">{manager.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground hidden sm:inline">{manager.name}</span>
                          </div>
                        )}
                        <Badge variant={count > 0 ? 'default' : 'outline'} className="text-xs min-w-[3rem] justify-center">
                          {count}명
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 안내 */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            💡 <strong>지역 구조</strong>는 <code className="bg-muted px-1 rounded">regionSchema.ts</code>에서 관리됩니다.
            전문가의 담당 지역과 총괄 매니저 설정은 <strong>전문가 관리</strong> 메뉴에서 각 전문가 프로필을 편집하여 변경할 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegionsManagement;
