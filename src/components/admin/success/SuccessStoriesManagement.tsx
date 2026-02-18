
import React, { useState } from 'react';
import { Plus, Edit, Trash, Eye, EyeOff, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useSuccessStories, SuccessStory } from '@/contexts/SuccessStoriesContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';

// Define form type to avoid the 'never' type issue
interface SuccessStoryFormData {
  title: string;
  hospital: string;
  location: string;
  services: string[] | string;
  date: string;
  imageUrl: string;
  featured: boolean;
  visible: boolean;
  content: string;
  summary: string;
}

const SuccessStoriesManagement = () => {
  const { 
    successStories, 
    addSuccessStory, 
    updateSuccessStory, 
    deleteSuccessStory,
    toggleVisibility,
    toggleFeatured
  } = useSuccessStories();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentStory, setCurrentStory] = useState<SuccessStory | null>(null);
  const { toast } = useToast();
  
  const form = useForm<SuccessStoryFormData>({
    defaultValues: {
      title: '',
      hospital: '',
      location: '',
      services: [],
      date: new Date().toISOString().split('T')[0],
      imageUrl: '',
      featured: false,
      visible: true,
      content: '',
      summary: ''
    }
  });

  const handleAddNew = () => {
    setCurrentStory(null);
    form.reset({
      title: '',
      hospital: '',
      location: '',
      services: [],
      date: new Date().toISOString().split('T')[0],
      imageUrl: '',
      featured: false,
      visible: true,
      content: '',
      summary: ''
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (story: SuccessStory) => {
    setCurrentStory(story);
    form.reset({
      title: story.title,
      hospital: story.hospital,
      location: story.location,
      services: story.services,
      date: story.date,
      imageUrl: story.imageUrl,
      featured: story.featured,
      visible: story.visible,
      content: story.content,
      summary: story.summary
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteSuccessStory(id);
    toast({
      title: "성공 사례 삭제됨",
      description: "성공 사례가 성공적으로 삭제되었습니다.",
    });
  };

  const handleToggleVisibility = (id: number) => {
    toggleVisibility(id);
    const story = successStories.find(s => s.id === id);
    toast({
      title: story?.visible ? "성공 사례 숨겨짐" : "성공 사례 공개됨",
      description: story?.visible 
        ? "이 성공 사례는 이제 웹사이트에 표시되지 않습니다." 
        : "이 성공 사례가 웹사이트에 다시 표시됩니다.",
    });
  };

  const handleToggleFeatured = (id: number) => {
    toggleFeatured(id);
    const story = successStories.find(s => s.id === id);
    toast({
      title: story?.featured ? "메인 노출 설정됨" : "일반 노출로 변경됨",
      description: story?.featured 
        ? "이 성공 사례는 메인 페이지에 노출됩니다." 
        : "이 성공 사례는 메인 페이지에 노출되지 않습니다.",
    });
  };

  const onSubmit = (data: SuccessStoryFormData) => {
    const formattedData = {
      ...data,
      services: typeof data.services === 'string' 
        ? data.services.split(',').map(s => s.trim())
        : Array.isArray(data.services) ? data.services : []
    };

    if (currentStory) {
      updateSuccessStory({ ...formattedData, id: currentStory.id });
      toast({
        title: "성공 사례 업데이트됨",
        description: "성공 사례가 성공적으로 업데이트되었습니다.",
      });
    } else {
      addSuccessStory(formattedData);
      toast({
        title: "성공 사례 추가됨",
        description: "새로운 성공 사례가 추가되었습니다.",
      });
    }
    setIsDialogOpen(false);
  };

  const formatServices = (services: string[]) => {
    return services.map((service, index) => (
      <span 
        key={index} 
        className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 mr-1 mb-1"
      >
        {service}
      </span>
    ));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
        <h2 className="font-pretendard font-bold text-xl md:text-2xl">성공사례 관리</h2>
        <Button size="sm" onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-1 md:mr-2" />
          <span className="text-xs md:text-sm">성공사례 추가</span>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table className="min-w-[700px]">
            <TableHeader>
              <TableRow>
                <TableHead>제목</TableHead>
                <TableHead>의료기관</TableHead>
                <TableHead>지역</TableHead>
                <TableHead>서비스</TableHead>
                <TableHead>등록일</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {successStories.map((story) => (
                <TableRow key={story.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <img 
                        src={story.imageUrl} 
                        className="w-12 h-8 rounded object-cover mr-3" 
                        alt={story.title} 
                      />
                      <span className={!story.visible ? "text-gray-400" : ""}>
                        {story.title}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className={!story.visible ? "text-gray-400" : ""}>
                    {story.hospital}
                  </TableCell>
                  <TableCell className={!story.visible ? "text-gray-400" : ""}>
                    {story.location}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {formatServices(story.services)}
                    </div>
                  </TableCell>
                  <TableCell className={!story.visible ? "text-gray-400" : ""}>
                    {story.date}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {story.featured ? 
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">메인 노출</span> :
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">일반</span>
                      }
                      {!story.visible && 
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">숨김</span>
                      }
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-yellow-600 hover:text-yellow-900"
                      onClick={() => handleToggleFeatured(story.id)}
                      title={story.featured ? "일반으로 변경" : "메인 노출로 설정"}
                    >
                      <Star className={`h-4 w-4 ${story.featured ? "fill-yellow-500" : ""}`} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={story.visible ? "text-green-600 hover:text-green-900" : "text-red-600 hover:text-red-900"}
                      onClick={() => handleToggleVisibility(story.id)}
                      title={story.visible ? "숨기기" : "보이기"}
                    >
                      {story.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleEdit(story)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(story.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {successStories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    등록된 성공 사례가 없습니다
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentStory ? '성공 사례 수정' : '새 성공 사례 추가'}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input placeholder="성공 사례 제목" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="hospital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>의료기관명</FormLabel>
                      <FormControl>
                        <Input placeholder="의료기관명" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>지역</FormLabel>
                      <FormControl>
                        <Input placeholder="지역 (예: 서울 강남)" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>날짜</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="services"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>서비스</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="서비스 (쉼표로 구분)" 
                          value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                          onChange={e => field.onChange(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이미지 URL</FormLabel>
                    <FormControl>
                      <Input placeholder="이미지 URL" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>요약</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="성공 사례 요약 (1-2줄)" 
                        className="resize-none" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상세 내용</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="성공 사례 상세 내용" 
                        className="resize-none min-h-[100px]" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between">
                <FormField
                  control={form.control}
                  name="visible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Switch 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel>웹사이트에 표시</FormLabel>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                      <FormControl>
                        <Switch 
                          checked={field.value} 
                          onCheckedChange={field.onChange} 
                        />
                      </FormControl>
                      <FormLabel>메인 페이지 노출</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              
              <DialogFooter>
                <Button type="submit">{currentStory ? '수정' : '추가'}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuccessStoriesManagement;
