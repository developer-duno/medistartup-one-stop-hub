
import React, { useEffect, useRef, useState } from 'react';
import { Region } from './types';

interface KakaoMapProps {
  regions: Region[];
  activeRegion: string;
  setActiveRegion: (name: string) => void;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ regions, activeRegion, setActiveRegion }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [customOverlays, setCustomOverlays] = useState<any[]>([]);

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
    
    const newMarkers: any[] = [];
    const newOverlays: any[] = [];

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
        
        // 커스텀 오버레이 생성
        const content = `
          <div class="marker-overlay ${activeRegion === region.name ? 'active' : ''}">
            <div class="marker-title">${region.name}</div>
            <div class="marker-count">${region.expertCount}명의 전문가</div>
          </div>
        `;
        
        const overlay = new window.kakao.maps.CustomOverlay({
          position,
          content,
          yAnchor: 1.3,
          zIndex: activeRegion === region.name ? 2 : 1
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
        style={{ position: 'relative' }}
      ></div>
      <style jsx>{`
        .marker-overlay {
          background: white;
          padding: 5px 10px;
          border-radius: 4px;
          border: 1px solid #ddd;
          text-align: center;
          font-family: 'Noto Sans KR', sans-serif;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .marker-overlay.active {
          background: #3b82f6;
          color: white;
          border-color: #2563eb;
          font-weight: bold;
        }
        .marker-title {
          font-size: 14px;
          font-weight: 500;
        }
        .marker-count {
          font-size: 12px;
          margin-top: 2px;
        }
      `}</style>
    </div>
  );
};

export default KakaoMap;
