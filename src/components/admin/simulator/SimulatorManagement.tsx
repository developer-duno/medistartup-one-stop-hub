
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import UnifiedSimulator from '@/components/simulator/UnifiedSimulator';

const SimulatorManagement: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // DB에서 노출 설정 로드
  useEffect(() => {
    const loadVisibility = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_settings')
          .select('value')
          .eq('key', 'simulator_visible')
          .single();

        if (error) throw error;
        setIsVisible(data?.value === 'true');
      } catch (error) {
        console.error('시뮬레이터 설정 로드 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadVisibility();
  }, []);

  // 노출 여부 토글
  const handleToggleVisibility = async (checked: boolean) => {
    try {
      const { error } = await supabase
        .from('admin_settings')
        .update({ value: checked ? 'true' : 'false' })
        .eq('key', 'simulator_visible');

      if (error) throw error;

      setIsVisible(checked);
      toast({
        title: checked ? '시뮬레이터 노출' : '시뮬레이터 숨김',
        description: checked
          ? '메인 홈페이지에 시뮬레이터가 표시됩니다.'
          : '메인 홈페이지에서 시뮬레이터가 숨겨집니다.',
      });
    } catch (error) {
      console.error('시뮬레이터 설정 저장 오류:', error);
      toast({
        title: '설정 저장 실패',
        description: '시뮬레이터 노출 설정을 저장하지 못했습니다.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <div className="p-6 text-center text-muted-foreground">로딩 중...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 노출 설정 카드 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">시뮬레이터 관리</CardTitle>
          <CardDescription>
            메인 홈페이지에 표시되는 병원 창업 종합 시뮬레이터의 노출 여부를 설정합니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              {isVisible ? (
                <Eye className="h-5 w-5 text-primary" />
              ) : (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <Label htmlFor="simulator-visible" className="text-base font-medium cursor-pointer">
                  메인 홈페이지 노출
                </Label>
                <p className="text-sm text-muted-foreground">
                  {isVisible ? '현재 홈페이지에 시뮬레이터가 표시되고 있습니다.' : '현재 홈페이지에서 시뮬레이터가 숨겨져 있습니다.'}
                </p>
              </div>
            </div>
            <Switch
              id="simulator-visible"
              checked={isVisible}
              onCheckedChange={handleToggleVisibility}
            />
          </div>
        </CardContent>
      </Card>

      {/* 시뮬레이터 미리보기 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">시뮬레이터 미리보기</CardTitle>
          <CardDescription>사용자에게 보이는 실제 시뮬레이터입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={`border rounded-lg p-4 bg-muted/30 ${!isVisible ? 'opacity-50' : ''}`}>
            <UnifiedSimulator />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimulatorManagement;
