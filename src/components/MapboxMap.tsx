import React, { useEffect, useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation, Phone, Mail, Clock, ExternalLink } from "lucide-react";

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
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Динамически загружаем Leaflet CSS и JS
    const loadLeaflet = async () => {
      if (!mapContainer.current || isMapLoaded) return;

      try {
        // Загружаем Leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoSV5AIGvZOfI=';
        link.crossOrigin = '';
        document.head.appendChild(link);

        // Загружаем Leaflet JS
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1eT+6vw=';
        script.crossOrigin = '';
        
        script.onload = () => {
          // @ts-ignore
          const L = window.L;
          if (L && mapContainer.current) {
            // Создаем карту
            const map = L.map(mapContainer.current).setView(coordinates, 16);

            // Добавляем слой OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors',
              maxZoom: 19,
              minZoom: 10
            }).addTo(map);

            // Добавляем красивый маркер
            const customIcon = L.divIcon({
              className: 'custom-marker',
              html: `
                <div style="
                  width: 50px;
                  height: 50px;
                  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
                  border: 3px solid white;
                  position: relative;
                ">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
              `,
              iconSize: [50, 50],
              iconAnchor: [25, 50],
              popupAnchor: [0, -50]
            });

            // Добавляем маркер на карту
            const marker = L.marker(coordinates, { icon: customIcon }).addTo(map);

            // Добавляем всплывающее окно
            const popup = L.popup({
              className: 'custom-popup',
              closeButton: false,
              offset: [0, -10]
            }).setContent(`
              <div style="
                padding: 16px;
                text-align: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              ">
                <div style="
                  font-size: 18px;
                  font-weight: 700;
                  color: #1e293b;
                  margin-bottom: 8px;
                ">WESHOW</div>
                <div style="
                  font-size: 14px;
                  color: #64748b;
                  margin-bottom: 8px;
                ">${address}</div>
                <div style="
                  font-size: 12px;
                  color: #94a3b8;
                ">Координаты: ${coordinates[1].toFixed(4)}, ${coordinates[0].toFixed(4)}</div>
              </div>
            `);

            marker.bindPopup(popup);

            // Добавляем элементы управления
            map.addControl(L.control.zoom({
              position: 'topright'
            }));

            // Добавляем масштаб
            L.control.scale({
              position: 'bottomleft',
              metric: true,
              imperial: false
            }).addTo(map);

            // Добавляем стили для карты
            const style = document.createElement('style');
            style.textContent = `
              .custom-marker {
                background: transparent !important;
                border: none !important;
              }
              .custom-popup .leaflet-popup-content-wrapper {
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                border: none;
              }
              .custom-popup .leaflet-popup-tip {
                background: white;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
              }
              .leaflet-control-zoom a {
                background: white !important;
                color: #374151 !important;
                border: 1px solid #e5e7eb !important;
                border-radius: 8px !important;
                margin: 2px !important;
                width: 32px !important;
                height: 32px !important;
                line-height: 30px !important;
                font-size: 18px !important;
                font-weight: bold !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
              }
              .leaflet-control-zoom a:hover {
                background: #f3f4f6 !important;
                color: #1f2937 !important;
              }
              .leaflet-control-scale {
                background: rgba(255, 255, 255, 0.9) !important;
                border-radius: 8px !important;
                padding: 8px !important;
                border: 1px solid #e5e7eb !important;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
              }
            `;
            document.head.appendChild(style);

            setIsMapLoaded(true);
          }
        };

        document.head.appendChild(script);
      } catch (error) {
        console.error('Ошибка загрузки карты:', error);
        setIsMapLoaded(true); // Показываем fallback
      }
    };

    loadLeaflet();

    return () => {
      // Очистка при размонтировании
      const existingStyle = document.querySelector('link[href*="leaflet"]');
      const existingScript = document.querySelector('script[src*="leaflet"]');
      if (existingStyle) existingStyle.remove();
      if (existingScript) existingScript.remove();
    };
  }, [coordinates, isMapLoaded]);

  return (
    <div className={`${className} relative rounded-2xl overflow-hidden`}>
      {/* Интерактивная карта */}
      <div ref={mapContainer} className="w-full h-full" />
      
      {/* Кнопка "Построить маршрут" */}
      <div className="absolute top-4 right-4 z-[1000]">
        <Button 
          size="sm" 
          variant="secondary"
          className="bg-white/95 hover:bg-white shadow-lg border border-slate-200"
          onClick={() => {
            const url = `https://yandex.ru/maps/?rtext=~${coordinates[1]},${coordinates[0]}&rtt=auto`;
            window.open(url, '_blank');
          }}
        >
          <Navigation className="h-4 w-4 mr-2" />
          Маршрут
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </div>

      {/* Информация об адресе */}
      {showAddressInfo && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t border-slate-200 z-[1000]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span className="text-slate-700 font-medium">{address}</span>
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

      {/* Fallback если карта не загрузилась */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Загрузка карты...</h3>
            <p className="text-slate-600 mb-4">{address}</p>
            <div className="text-sm text-slate-500">
              <p>Координаты: {coordinates[1].toFixed(4)}, {coordinates[0].toFixed(4)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapboxMap;