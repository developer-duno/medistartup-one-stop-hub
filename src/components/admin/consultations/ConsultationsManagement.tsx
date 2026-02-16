import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Eye, Clock, CheckCircle, XCircle, MessageSquare, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Consultation {
  id: string;
  name: string;
  phone: string;
  email: string;
  region: string;
  specialty: string;
  message: string;
  status: string;
  admin_notes: string;
  created_at: string;
  updated_at: string;
  selected_expert_ids: number[];
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: '대기 중', color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: <Clock className="h-3 w-3" /> },
  in_progress: { label: '진행 중', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: <MessageSquare className="h-3 w-3" /> },
  completed: { label: '완료', color: 'bg-green-100 text-green-800 border-green-200', icon: <CheckCircle className="h-3 w-3" /> },
  cancelled: { label: '취소', color: 'bg-red-100 text-red-800 border-red-200', icon: <XCircle className="h-3 w-3" /> },
};

const ConsultationsManagement: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const { toast } = useToast();

  const fetchConsultations = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('consultations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching consultations:', error);
      toast({ title: '오류', description: '상담 목록을 불러오는데 실패했습니다.', variant: 'destructive' });
    } else {
      setConsultations((data as Consultation[]) || []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchConsultations();
  }, [fetchConsultations]);

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('consultations')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast({ title: '오류', description: '상태 변경에 실패했습니다.', variant: 'destructive' });
      return;
    }

    setConsultations(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    if (selectedConsultation?.id === id) {
      setSelectedConsultation(prev => prev ? { ...prev, status: newStatus } : null);
    }
    toast({ title: '상태 변경', description: '상담 상태가 변경되었습니다.' });
  };

  const saveNotes = async () => {
    if (!selectedConsultation) return;

    const { error } = await supabase
      .from('consultations')
      .update({ admin_notes: adminNotes })
      .eq('id', selectedConsultation.id);

    if (error) {
      toast({ title: '오류', description: '메모 저장에 실패했습니다.', variant: 'destructive' });
      return;
    }

    setConsultations(prev => prev.map(c => c.id === selectedConsultation.id ? { ...c, admin_notes: adminNotes } : c));
    setSelectedConsultation(prev => prev ? { ...prev, admin_notes: adminNotes } : null);
    toast({ title: '저장 완료', description: '관리자 메모가 저장되었습니다.' });
  };

  const openDetail = (consultation: Consultation) => {
    setSelectedConsultation(consultation);
    setAdminNotes(consultation.admin_notes || '');
  };

  const filtered = statusFilter === 'all'
    ? consultations
    : consultations.filter(c => c.status === statusFilter);

  const counts = {
    all: consultations.length,
    pending: consultations.filter(c => c.status === 'pending').length,
    in_progress: consultations.filter(c => c.status === 'in_progress').length,
    completed: consultations.filter(c => c.status === 'completed').length,
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-pretendard font-bold text-2xl">상담 신청 관리</h2>
          <p className="text-sm text-muted-foreground mt-1">
            총 {counts.all}건 · 대기 {counts.pending}건 · 진행 중 {counts.in_progress}건 · 완료 {counts.completed}건
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchConsultations}>
          <RefreshCw className="h-4 w-4 mr-2" />
          새로고침
        </Button>
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'all', label: '전체' },
          { key: 'pending', label: '대기 중' },
          { key: 'in_progress', label: '진행 중' },
          { key: 'completed', label: '완료' },
          { key: 'cancelled', label: '취소' },
        ].map(f => (
          <Button
            key={f.key}
            variant={statusFilter === f.key ? 'default' : 'outline'}
            size="sm"
            onClick={() => setStatusFilter(f.key)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Consultation list */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">불러오는 중...</div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            상담 신청 내역이 없습니다.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(consultation => {
            const status = statusConfig[consultation.status] || statusConfig.pending;
            return (
              <Card key={consultation.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{consultation.name}</span>
                        <Badge variant="outline" className={status.color}>
                          <span className="flex items-center gap-1">
                            {status.icon}
                            {status.label}
                          </span>
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-0.5">
                        <p>{consultation.phone} {consultation.email && `· ${consultation.email}`}</p>
                        <p>지역: {consultation.region} · 분야: {consultation.specialty}</p>
                        {consultation.message && (
                          <p className="truncate max-w-md">메시지: {consultation.message}</p>
                        )}
                        <p className="text-xs">
                          {format(new Date(consultation.created_at), 'yyyy.MM.dd HH:mm', { locale: ko })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Select
                        value={consultation.status || 'pending'}
                        onValueChange={(value) => updateStatus(consultation.id, value)}
                      >
                        <SelectTrigger className="w-[120px] h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">대기 중</SelectItem>
                          <SelectItem value="in_progress">진행 중</SelectItem>
                          <SelectItem value="completed">완료</SelectItem>
                          <SelectItem value="cancelled">취소</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm" onClick={() => openDetail(consultation)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Detail dialog */}
      <Dialog open={!!selectedConsultation} onOpenChange={(open) => !open && setSelectedConsultation(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>상담 상세 정보</DialogTitle>
            <DialogDescription>상담 신청 내용과 관리자 메모를 확인합니다.</DialogDescription>
          </DialogHeader>
          {selectedConsultation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">이름</span>
                  <p className="font-medium">{selectedConsultation.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">연락처</span>
                  <p className="font-medium">{selectedConsultation.phone}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">이메일</span>
                  <p className="font-medium">{selectedConsultation.email || '-'}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">지역</span>
                  <p className="font-medium">{selectedConsultation.region}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">분야</span>
                  <p className="font-medium">{selectedConsultation.specialty}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">신청일</span>
                  <p className="font-medium">
                    {format(new Date(selectedConsultation.created_at), 'yyyy.MM.dd HH:mm', { locale: ko })}
                  </p>
                </div>
              </div>
              {selectedConsultation.message && (
                <div>
                  <span className="text-sm text-muted-foreground">메시지</span>
                  <p className="text-sm mt-1 p-3 bg-muted rounded-md">{selectedConsultation.message}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-muted-foreground">관리자 메모</span>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="관리자 메모를 입력하세요..."
                  className="mt-1 min-h-[100px]"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedConsultation(null)}>닫기</Button>
            <Button onClick={saveNotes}>메모 저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConsultationsManagement;
