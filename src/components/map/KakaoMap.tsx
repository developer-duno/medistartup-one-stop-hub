
import React, { useEffect, useRef, useState } from 'react';
import { Region } from './types';

// 타입스크립트 인터페이스로 Window.kakao에서 필요한 타입들을 참조
type KakaoMap = {
  setCenter: (position: KakaoLatLng) => void;
  setLevel: (level: number) => void;
  getLevel: () => number;
  getCenter: () => KakaoLatLng;
};

type KakaoLatLng = {
  getLat: () => number;
  getLng: () => number;
};

type KakaoMarker = {
  setMap: (map: KakaoMap | null) => void;
  setPosition: (position: KakaoLatLng) => void;
  setTitle: (title: string) => void;
};

type KakaoCustomOverlay = {
  setMap: (map: KakaoMap | null) => void;
  setPosition: (position: KakaoLatLng) => void;
  setContent: (content: string | HTMLElement) => void;
};

interface KakaoMapProps {
  regions: Region[];
  activeRegion: string;
  setActiveRegion: (name: string) => void;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ regions, activeRegion, setActiveRegion }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<KakaoMap | null>(null);
  const [markers, setMarkers] = useState<KakaoMarker[]>([]);
  const [customOverlays, setCustomOverlays] = useState<KakaoCustomOverlay[]>([]);

  // 카카오맵 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=c43d5347a799e3c48342ab2155fc1acc&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (mapRef.current) {
          const options = {
            center: new window.kakao.maps.LatLng(36.2, 127.9), // 한국 중앙 좌표
            level: 13 // 지도 확대 레벨
          };
          const map = new window.kakao.maps.Map(mapRef.current, options);
          setMapInstance(map);
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 지역 마커 생성
  useEffect(() => {
    if (!mapInstance) return;

    // 기존 마커와 오버레이 제거
    markers.forEach(marker => marker.setMap(null));
    customOverlays.forEach(overlay => overlay.setMap(null));
    
    const newMarkers: KakaoMarker[] = [];
    const newOverlays: KakaoCustomOverlay[] = [];

    regions.forEach(region => {
      if (region.latitude && region.longitude) {
        const position = new window.kakao.maps.LatLng(region.latitude, region.longitude);
        
        // 마커 생성
        const marker = new window.kakao.maps.Marker({
          position,
          map: mapInstance,
          title: region.name
        });
        
        // 마커 클릭 이벤트
        window.kakao.maps.event.addListener(marker, 'click', function() {
          setActiveRegion(region.name);
        });
        
        newMarkers.push(marker);
        
        // 커스텀 오버레이 생성 - 이제 HTML 클래스를 사용합니다.
        const isActive = activeRegion === region.name;
        const content = document.createElement('div');
        content.className = `bg-white p-2 rounded-md border ${isActive ? 'bg-primary text-white border-primary-700' : 'border-gray-300'} shadow-sm text-center font-noto`;
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'text-sm font-medium';
        titleDiv.textContent = region.name;
        content.appendChild(titleDiv);
        
        const countDiv = document.createElement('div');
        countDiv.className = 'text-xs mt-0.5';
        countDiv.textContent = `${region.expertCount}명의 전문가`;
        content.appendChild(countDiv);
        
        const overlay = new window.kakao.maps.CustomOverlay({
          position,
          content,
          yAnchor: 1.3,
          zIndex: isActive ? 2 : 1
        });
        
        overlay.setMap(mapInstance);
        newOverlays.push(overlay);
      }
    });
    
    setMarkers(newMarkers);
    setCustomOverlays(newOverlays);
    
    // 활성 지역으로 지도 중심 이동
    const activeRegionData = regions.find(r => r.name === activeRegion);
    if (activeRegionData?.latitude && activeRegionData?.longitude) {
      const newCenter = new window.kakao.maps.LatLng(
        activeRegionData.latitude, 
        activeRegionData.longitude
      );
      mapInstance.setCenter(newCenter);
      mapInstance.setLevel(11); // 확대 레벨 조정
    }
    
  }, [mapInstance, regions, activeRegion, setActiveRegion]);

  return (
    <div className="relative bg-white rounded-xl shadow-md p-4 h-[400px] md:h-[500px]">
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
      ></div>
    </div>
  );
};

export default KakaoMap;
