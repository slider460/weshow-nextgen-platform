import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation, Phone, Mail, Clock } from "lucide-react";

interface MapboxMapProps {
  address?: string;
  coordinates?: [number, number];
  className?: string;
  showAddressInfo?: boolean;
}

const MapboxMap: React.FC<MapboxMapProps> = ({ 
  address = "Москва, ул. Рочдельская, 14А",
  coordinates = [37.6156, 55.7796], // долгота, широта для указанного адреса
  className = "w-full h-64",
  showAddressInfo = true
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet(true); // Временно отключаем требование токена для демо

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    try {
      // Для демо используем OpenStreetMap через Leaflet или создаем статичную карту
      if (!token || token === 'demo') {
        // Создаем статичную карту с помощью CSS и HTML
        setIsTokenSet(true);
        return;
      }

      mapboxgl.accessToken = token;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        zoom: 16,
        center: coordinates,
      });

      // Добавляем маркер
      new mapboxgl.Marker({
        color: '#3b82f6'
      })
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<div class="p-3"><strong>WESHOW</strong><br/>${address}</div>`)
        )
        .addTo(map.current);

      // Добавляем элементы управления
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      setIsTokenSet(true);
    } catch (error) {
      console.error('Ошибка инициализации карты:', error);
      setIsTokenSet(true); // Показываем статичную карту в случае ошибки
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
    } else {
      // Для демо показываем статичную карту
      initializeMap('demo');
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
      {/* Статичная карта для демо */}
      <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 relative">
        {/* Карта */}
        <div className="absolute inset-0 bg-slate-200 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">WESHOW</h3>
            <p className="text-slate-600 mb-4">{address}</p>
            <div className="text-sm text-slate-500">
              <p>Координаты: {coordinates[1].toFixed(4)}, {coordinates[0].toFixed(4)}</p>
            </div>
          </div>
        </div>
        
        {/* Информация об адресе */}
        {showAddressInfo && (
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-blue-500" />
                <span className="text-slate-700">{address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Navigation className="h-4 w-4 text-green-500" />
                <span className="text-slate-700">Центр Москвы</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="text-slate-700">5 мин от метро</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Кнопка "Построить маршрут" */}
      <div className="absolute top-4 right-4">
        <Button 
          size="sm" 
          variant="secondary"
          className="bg-white/90 hover:bg-white shadow-lg"
          onClick={() => {
            const url = `https://yandex.ru/maps/?rtext=~${coordinates[1]},${coordinates[0]}&rtt=auto`;
            window.open(url, '_blank');
          }}
        >
          <Navigation className="h-4 w-4 mr-2" />
          Маршрут
        </Button>
      </div>
    </div>
  );
};

export default MapboxMap;