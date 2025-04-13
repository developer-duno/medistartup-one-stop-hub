
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: {
          new (container: HTMLElement, options: MapOptions): Map;
        };
        LatLng: {
          new (lat: number, lng: number): LatLng;
        };
        Marker: {
          new (options: MarkerOptions): Marker;
        };
        CustomOverlay: {
          new (options: CustomOverlayOptions): CustomOverlay;
        };
        event: {
          addListener: (target: any, type: string, handler: (...args: any[]) => void) => void;
        };
      };
    };
  }
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

interface Map {
  setCenter(position: LatLng): void;
  setLevel(level: number): void;
  getLevel(): number;
  getCenter(): LatLng;
}

interface LatLng {
  getLat(): number;
  getLng(): number;
}

interface Marker {
  setMap(map: Map | null): void;
  setPosition(position: LatLng): void;
  setTitle(title: string): void;
}

interface CustomOverlay {
  setMap(map: Map | null): void;
  setPosition(position: LatLng): void;
  setContent(content: string | HTMLElement): void;
}

export {};
