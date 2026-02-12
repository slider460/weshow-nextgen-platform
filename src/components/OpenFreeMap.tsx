import React, { useEffect, useRef, useState } from 'react';
import { Button } from "../components/ui/button";
import { MapPin, Navigation, Clock, ExternalLink } from "lucide-react";

interface OpenFreeMapProps {
  address?: string;
  coordinates?: [number, number]; // [longitude, latitude]
  className?: string;
  showAddressInfo?: boolean;
  style?: 'liberty' | 'positron' | 'dark-matter';
}

declare global {
  interface Window {
    maplibregl: any;
  }
}

const OpenFreeMap: React.FC<OpenFreeMapProps> = ({ 
  address = "Москва, ул. Рочдельская, 14А",
  coordinates = [37.568929, 55.757759], // долгота, широта
  className = "w-full h-64",
  showAddressInfo = true,
  style = 'liberty'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    let isMounted = true;
    let linkElement: HTMLLinkElement | null = null;
    let scriptElement: HTMLScriptElement | null = null;

    const loadMapLibre = async () => {
      try {
        // Проверяем, загружен ли уже MapLibre
        if (window.maplibregl) {
          if (isMounted) initializeMap();
          return;
        }

        // Проверяем, не загружается ли уже скрипт
        const existingScript = document.querySelector('script[src*="maplibre-gl"]');
        if (existingScript) {
          existingScript.addEventListener('load', () => {
            if (isMounted) initializeMap();
          });
          return;
        }

        // Загружаем MapLibre CSS
        linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.css';
        linkElement.crossOrigin = 'anonymous';
        document.head.appendChild(linkElement);

        // Загружаем MapLibre JS
        scriptElement = document.createElement('script');
        scriptElement.src = 'https://unpkg.com/maplibre-gl/dist/maplibre-gl.js';
        scriptElement.crossOrigin = 'anonymous';
        
        scriptElement.onload = () => {
          if (isMounted) initializeMap();
        };

        scriptElement.onerror = () => {
          console.error('Ошибка загрузки MapLibre GL');
          if (isMounted) setIsMapLoaded(true); // Показываем fallback
        };

        document.head.appendChild(scriptElement);
      } catch (error) {
        console.error('Ошибка загрузки карты:', error);
        if (isMounted) setIsMapLoaded(true); // Показываем fallback
      }
    };

    const initializeMap = () => {
      if (!mapContainer.current || mapRef.current || !isMounted) return;

      const maplibregl = window.maplibregl;
      if (!maplibregl) {
        console.error('MapLibre GL не загружен');
        setIsMapLoaded(true);
        return;
      }

      // Убеждаемся что контейнер имеет размер
      if (!mapContainer.current.offsetWidth || !mapContainer.current.offsetHeight) {
        console.warn('Контейнер карты не имеет размера');
        // Ждем немного и пробуем снова
        setTimeout(() => {
          if (isMounted && mapContainer.current) initializeMap();
        }, 100);
        return;
      }

      try {
        // Создаем карту с OpenFreeMap стилем
        const map = new maplibregl.Map({
          container: mapContainer.current,
          style: `https://tiles.openfreemap.org/styles/${style}`,
          center: coordinates, // [longitude, latitude]
          zoom: 16,
          attributionControl: true
        });

        map.on('load', () => {
          if (!isMounted) {
            map.remove();
            return;
          }

          // Добавляем кастомный маркер
          const el = document.createElement('div');
          el.className = 'custom-marker';
          el.style.cssText = `
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
            border: 3px solid white;
            cursor: pointer;
          `;
          el.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          `;

          // Создаем маркер
          markerRef.current = new maplibregl.Marker({
            element: el,
            anchor: 'bottom'
          })
            .setLngLat(coordinates)
            .addTo(map);

          // Добавляем popup
          const popup = new maplibregl.Popup({
            offset: 25,
            closeButton: false,
            className: 'custom-popup'
          })
            .setLngLat(coordinates)
            .setHTML(`
              <div style="
                padding: 16px;
                text-align: center;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                min-width: 200px;
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
            `)
            .addTo(map);

          // Клик по маркеру показывает popup
          el.addEventListener('click', () => {
            popup.addTo(map);
          });

          // Добавляем навигационные элементы управления
          map.addControl(new maplibregl.NavigationControl({
            showCompass: true,
            showZoom: true,
            visualizePitch: true
          }), 'top-right');

          setIsMapLoaded(true);
          mapRef.current = map;
        });

        // Обработка ошибок загрузки карты
        map.on('error', (e: any) => {
          console.error('Ошибка карты:', e);
          if (isMounted) setIsMapLoaded(true);
        });

        map.on('style.load', () => {
          console.log('Стиль карты загружен');
        });
      } catch (error) {
        console.error('Ошибка инициализации карты:', error);
        if (isMounted) setIsMapLoaded(true);
      }
    };

    // Задержка для того чтобы контейнер точно был в DOM
    const timeoutId = setTimeout(() => {
      loadMapLibre();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      
      // Очистка при размонтировании
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
    };
  }, [coordinates, style, address]);

  // Добавляем стили для popup и маркера
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .custom-popup .maplibregl-popup-content {
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        border: none;
        padding: 0;
      }
      .custom-popup .maplibregl-popup-tip {
        border-top-color: white;
      }
      .maplibregl-ctrl-group button {
        background: white !important;
        color: #374151 !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 8px !important;
        margin: 2px !important;
        width: 32px !important;
        height: 32px !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
      }
      .maplibregl-ctrl-group button:hover {
        background: #f3f4f6 !important;
      }
      .maplibregl-ctrl-attrib {
        background: rgba(255, 255, 255, 0.8) !important;
        border-radius: 4px !important;
        font-size: 11px !important;
        padding: 4px 8px !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.querySelector('style');
      if (existingStyle && existingStyle.textContent?.includes('custom-popup')) {
        existingStyle.remove();
      }
    };
  }, []);

  return (
    <div className={`${className} relative rounded-2xl overflow-hidden`} style={{ minHeight: '300px' }}>
      {/* Интерактивная карта */}
      <div ref={mapContainer} className="w-full h-full" style={{ minHeight: '300px' }} />
      
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
      {!isMapLoaded && mapContainer.current && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center z-0">
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

export default OpenFreeMap;

