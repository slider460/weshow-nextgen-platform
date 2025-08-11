import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface MapboxMapProps {
  address?: string;
  coordinates?: [number, number];
  className?: string;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ 
  address = "Москва, ул. Рочдельская, 14А",
  coordinates = [37.6156, 55.7796], // долгота, широта для указанного адреса
  className = "w-full h-64"
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || !token) return;

    try {
      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        zoom: 15,
        center: coordinates,
      });

      // Добавляем маркер
      new mapboxgl.Marker({
        color: '#3b82f6'
      })
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<div class="p-2"><strong>WESHOW</strong><br/>${address}</div>`)
        )
        .addTo(map.current);

      // Добавляем элементы управления
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      setIsTokenSet(true);
    } catch (error) {
      console.error('Ошибка инициализации карты:', error);
    }
  };

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      localStorage.setItem('mapbox_token', mapboxToken);
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    // Проверяем сохраненный токен
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      initializeMap(savedToken);
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isTokenSet) {
    return (
      <div className={`${className} bg-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center`}>
        <div className="max-w-md w-full space-y-4 text-center">
          <h3 className="text-lg font-semibold text-slate-900">Настройка карты</h3>
          <p className="text-sm text-slate-600">
            Для отображения карты необходим Mapbox токен. 
            Получите его на <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">mapbox.com</a>
          </p>
          <div className="space-y-3">
            <div>
              <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
              <Input
                id="mapbox-token"
                type="text"
                placeholder="pk.ey..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button onClick={handleTokenSubmit} disabled={!mapboxToken.trim()}>
              Загрузить карту
            </Button>
          </div>
          <div className="text-xs text-slate-500 mt-4">
            <p><strong>Рекомендация:</strong> Добавьте Mapbox токен в Supabase Edge Function Secrets для автоматической инициализации</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} relative rounded-2xl overflow-hidden`}>
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default MapboxMap;