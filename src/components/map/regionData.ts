
import { Region } from './types';

// 한국 지도에 표시할 지역 정보
export const regions: Region[] = [
  { 
    id: 'seoul', 
    name: '서울/경기', 
    path: 'M95,90 C105,75 125,65 145,70 C160,72 175,85 180,100 C185,115 182,135 172,145 C155,160 130,165 110,150 C95,140 85,115 95,90 Z',
    labelX: 135,
    labelY: 105,
    includesRegions: ['서울', '경기', '인천'],
    latitude: 37.5665,
    longitude: 126.9780
  },
  { 
    id: 'gangwon', 
    name: '강원', 
    path: 'M200,50 C220,40 250,45 265,60 C280,75 290,95 285,120 C280,140 260,155 240,155 C220,155 200,140 190,120 C185,100 185,65 200,50 Z',
    labelX: 240,
    labelY: 100,
    includesRegions: ['강원'],
    latitude: 37.8228,
    longitude: 128.1555
  },
  { 
    id: 'chungcheong', 
    name: '충청', 
    path: 'M125,160 C145,150 175,150 195,160 C210,170 220,190 215,210 C210,230 190,245 170,245 C150,245 130,235 120,215 C110,195 110,175 125,160 Z',
    labelX: 165,
    labelY: 195,
    includesRegions: ['대전', '충남', '충북', '세종'],
    latitude: 36.6372,
    longitude: 127.4897
  },
  { 
    id: 'gyeongbuk', 
    name: '경북/대구', 
    path: 'M250,180 C270,170 290,175 305,190 C320,205 325,225 320,245 C315,265 290,280 270,275 C250,270 235,255 230,235 C225,215 230,195 250,180 Z',
    labelX: 275,
    labelY: 225,
    includesRegions: ['대구', '경북'],
    latitude: 35.8714,
    longitude: 128.6014
  },
  { 
    id: 'jeonlla', 
    name: '전라', 
    path: 'M120,260 C140,245 165,245 185,255 C205,265 215,285 210,305 C205,325 185,340 165,340 C145,340 125,330 115,310 C105,290 105,275 120,260 Z',
    labelX: 160,
    labelY: 295,
    includesRegions: ['광주', '전남', '전북'],
    latitude: 35.1595,
    longitude: 126.8526
  },
  { 
    id: 'gyeongnam', 
    name: '경남/부산', 
    path: 'M220,280 C240,270 265,275 280,290 C295,305 300,325 295,345 C290,365 270,375 250,370 C230,365 215,350 210,330 C205,310 205,290 220,280 Z',
    labelX: 255,
    labelY: 325,
    includesRegions: ['부산', '경남', '울산'],
    latitude: 35.1796,
    longitude: 129.0756
  },
  { 
    id: 'jeju', 
    name: '제주', 
    path: 'M145,380 C155,375 170,375 180,380 C190,385 195,395 195,405 C195,415 185,425 170,425 C155,425 145,415 145,405 C145,395 135,385 145,380 Z',
    labelX: 170,
    labelY: 405,
    includesRegions: ['제주'],
    latitude: 33.4996,
    longitude: 126.5312
  }
];
