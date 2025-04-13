
// Global declaration for the Kakao Maps API
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: typeof kakao.maps.Map;
        LatLng: typeof kakao.maps.LatLng;
        Marker: typeof kakao.maps.Marker;
        CustomOverlay: typeof kakao.maps.CustomOverlay;
        event: {
          addListener: (
            target: any, 
            type: string, 
            handler: (...args: any[]) => void
          ) => void;
        };
      };
    };
  }
}

// Kakao Maps namespace declaration
declare namespace kakao {
  namespace maps {
    class Map {
      constructor(container: HTMLElement, options: MapOptions);
      setCenter(position: LatLng): void;
      setLevel(level: number): void;
      getLevel(): number;
      getCenter(): LatLng;
    }

    class LatLng {
      constructor(lat: number, lng: number);
      getLat(): number;
      getLng(): number;
    }

    class Marker {
      constructor(options: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(position: LatLng): void;
      setTitle(title: string): void;
    }

    class CustomOverlay {
      constructor(options: CustomOverlayOptions);
      setMap(map: Map | null): void;
      setPosition(position: LatLng): void;
      setContent(content: string | HTMLElement): void;
    }

    interface MapOptions {
      center: LatLng;
      level?: number;
    }

    interface MarkerOptions {
      position: LatLng;
      map?: Map;
      title?: string;
    }

    interface CustomOverlayOptions {
      position: LatLng;
      content: string | HTMLElement;
      map?: Map;
      clickable?: boolean;
      xAnchor?: number;
      yAnchor?: number;
      zIndex?: number;
    }
  }
}

// Make sure types are exported
export {};
