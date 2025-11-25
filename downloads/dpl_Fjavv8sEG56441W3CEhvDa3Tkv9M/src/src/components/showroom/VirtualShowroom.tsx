import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Text,
  Html,
  useProgress,
  Stats,
  Grid,
  Sky,
  PerspectiveCamera,
  PointerLockControls
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Equipment3DModel } from '../3d/ThreeViewer';
import { LoadingSpinner } from '../ui/LoadingStates';
import { AnimatedButton } from '../ui/AnimatedComponents';

// === ТИПЫ ДЛЯ ВИРТУАЛЬНОГО ШОУРУМА ===

interface ShowroomLayout {
  id: string;
  name: string;
  description: string;
  zones: ShowroomZone[];
  lighting: LightingSetup;
  environment: EnvironmentSettings;
  navigation: NavigationSettings;
}

interface ShowroomZone {
  id: string;
  name: string;
  category: string;
  position: [number, number, number];
  size: [number, number, number];
  models: Equipment3DModel[];
  color?: string;
  description?: string;
}

interface LightingSetup {
  ambient: { intensity: number; color: string };
  directional: Array<{
    position: [number, number, number];
    intensity: number;
    color: string;
    castShadow?: boolean;
  }>;
  spots: Array<{
    position: [number, number, number];
    target: [number, number, number];
    intensity: number;
    angle: number;
    color: string;
  }>;
}

interface EnvironmentSettings {
  type: 'indoor' | 'outdoor' | 'studio' | 'futuristic';
  skybox?: string;
  fog?: { color: string; near: number; far: number };
  ground?: {
    color: string;
    material: 'concrete' | 'wood' | 'metal' | 'glass';
    reflectivity: number;
  };
}

interface NavigationSettings {
  mode: 'orbit' | 'firstPerson' | 'guided';
  speed: number;
  boundaries: {
    min: [number, number, number];
    max: [number, number, number];
  };
  waypoints: Array<{
    id: string;
    name: string;
    position: [number, number, number];
    lookAt: [number, number, number];
    description?: string;
  }>;
}

interface Tour {
  id: string;
  name: string;
  waypoints: string[];
  duration: number;
  autoPlay: boolean;
}

// === КОМПОНЕНТЫ ШОУРУМА ===

// Компонент зоны оборудования
function EquipmentZone({ zone, onModelClick }: { 
  zone: ShowroomZone;
  onModelClick?: (model: Equipment3DModel) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <group position={zone.position}>
      {/* Платформа зоны */}
      <mesh 
        position={[0, -0.05, 0]}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <boxGeometry args={[zone.size[0], 0.1, zone.size[2]]} />
        <meshStandardMaterial 
          color={zone.color || '#f3f4f6'}
          transparent
          opacity={isHovered ? 0.8 : 0.6}
        />
      </mesh>
      
      {/* Название зоны */}
      <Text
        position={[0, 0.2, zone.size[2] / 2 + 0.5]}
        fontSize={0.3}
        color={zone.color || '#374151'}
        anchorX=\"center\"
        anchorY=\"middle\"
        font=\"/fonts/inter-bold.woff\"
      >
        {zone.name}
      </Text>
      
      {/* Модели в зоне */}
      {zone.models.map((model, index) => {
        const cols = Math.ceil(Math.sqrt(zone.models.length));
        const x = (index % cols - (cols - 1) / 2) * 1.5;
        const z = (Math.floor(index / cols) - Math.floor((zone.models.length - 1) / cols) / 2) * 1.5;
        
        return (
          <group 
            key={model.id}
            position={[x, 0, z]}
            onClick={() => onModelClick?.(model)}
          >
            {/* Здесь должна быть загрузка реальной 3D модели */}
            <mesh>
              <boxGeometry args={[0.8, 0.8, 0.8]} />
              <meshStandardMaterial color=\"#3b82f6\" />
            </mesh>
            
            {/* Информационная табличка */}
            <Text
              position={[0, -0.6, 0]}
              fontSize={0.1}
              color=\"#6b7280\"
              anchorX=\"center\"
              anchorY=\"middle\"
              maxWidth={1.5}
            >
              {model.name}
            </Text>
          </group>
        );
      })}
      
      {/* Описание зоны при наведении */}
      {isHovered && zone.description && (
        <Html position={[0, 1.5, 0]} center>
          <motion.div
            className=\"bg-black/80 text-white px-4 py-2 rounded-lg text-sm max-w-xs\"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            {zone.description}
          </motion.div>
        </Html>
      )}
    </group>
  );
}

// Компонент навигационных точек
function NavigationWaypoints({ 
  waypoints, 
  currentWaypoint, 
  onWaypointClick 
}: {
  waypoints: NavigationSettings['waypoints'];
  currentWaypoint?: string;
  onWaypointClick?: (waypointId: string) => void;
}) {
  return (
    <>
      {waypoints.map((waypoint) => {
        const isActive = currentWaypoint === waypoint.id;
        
        return (
          <group key={waypoint.id} position={waypoint.position}>
            <mesh 
              onClick={() => onWaypointClick?.(waypoint.id)}
              scale={isActive ? 1.2 : 1}
            >
              <sphereGeometry args={[0.1]} />
              <meshBasicMaterial 
                color={isActive ? '#ef4444' : '#3b82f6'}
                transparent
                opacity={0.8}
              />
            </mesh>
            
            {/* Пульсирующий эффект */}
            <mesh scale={isActive ? 1.5 : 0}>
              <sphereGeometry args={[0.15]} />
              <meshBasicMaterial 
                color={isActive ? '#ef4444' : '#3b82f6'}
                transparent
                opacity={0.3}
              />
            </mesh>
            
            {/* Название точки */}
            <Text
              position={[0, 0.3, 0]}
              fontSize={0.08}
              color={isActive ? '#ef4444' : '#3b82f6'}
              anchorX=\"center\"
              anchorY=\"middle\"
            >
              {waypoint.name}
            </Text>
          </group>
        );
      })}
    </>
  );
}

// Компонент освещения шоурума
function ShowroomLighting({ setup }: { setup: LightingSetup }) {
  return (
    <>
      {/* Ambient освещение */}
      <ambientLight 
        intensity={setup.ambient.intensity} 
        color={setup.ambient.color} 
      />
      
      {/* Направленное освещение */}
      {setup.directional.map((light, index) => (
        <directionalLight
          key={`dir-${index}`}
          position={light.position}
          intensity={light.intensity}
          color={light.color}
          castShadow={light.castShadow}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
      ))}
      
      {/* Прожекторы */}
      {setup.spots.map((spot, index) => (
        <spotLight
          key={`spot-${index}`}
          position={spot.position}
          target-position={spot.target}
          intensity={spot.intensity}
          angle={spot.angle}
          color={spot.color}
          penumbra={0.5}
          castShadow
        />
      ))}
    </>
  );
}

// Компонент окружения
function ShowroomEnvironment({ settings }: { settings: EnvironmentSettings }) {
  const getGroundMaterial = () => {
    const baseProps = {
      color: settings.ground?.color || '#f3f4f6',
      roughness: 1 - (settings.ground?.reflectivity || 0)
    };
    
    switch (settings.ground?.material) {
      case 'metal':
        return { ...baseProps, metalness: 0.8, roughness: 0.2 };
      case 'glass':
        return { ...baseProps, transparent: true, opacity: 0.8, roughness: 0.1 };
      case 'wood':
        return { ...baseProps, roughness: 0.8 };
      default:
        return baseProps;
    }
  };
  
  return (
    <>
      {/* Окружение */}
      {settings.type === 'outdoor' ? (
        <Sky sunPosition={[100, 20, 100]} />
      ) : (
        <Environment preset=\"city\" />
      )}
      
      {/* Туман */}
      {settings.fog && (
        <fog 
          attach=\"fog\" 
          args={[settings.fog.color, settings.fog.near, settings.fog.far]} 
        />
      )}
      
      {/* Пол */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial {...getGroundMaterial()} />
      </mesh>
    </>
  );
}

// === ОСНОВНОЙ КОМПОНЕНТ ВИРТУАЛЬНОГО ШОУРУМА ===

interface VirtualShowroomProps {
  layout: ShowroomLayout;
  tours?: Tour[];
  onModelClick?: (model: Equipment3DModel) => void;
  onTourComplete?: (tourId: string) => void;
  className?: string;
}

export const VirtualShowroom: React.FC<VirtualShowroomProps> = ({
  layout,
  tours = [],
  onModelClick,
  onTourComplete,
  className
}) => {
  const [currentTour, setCurrentTour] = useState<Tour | null>(null);
  const [currentWaypoint, setCurrentWaypoint] = useState<string | null>(null);
  const [isFirstPerson, setIsFirstPerson] = useState(false);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  
  // Автоматический тур
  useEffect(() => {
    if (!currentTour || !currentTour.autoPlay) return;
    
    let waypointIndex = 0;
    const interval = setInterval(() => {
      if (waypointIndex < currentTour.waypoints.length) {
        setCurrentWaypoint(currentTour.waypoints[waypointIndex]);
        waypointIndex++;
      } else {
        setCurrentTour(null);
        setCurrentWaypoint(null);
        onTourComplete?.(currentTour.id);
      }
    }, (currentTour.duration / currentTour.waypoints.length) * 1000);
    
    return () => clearInterval(interval);
  }, [currentTour, onTourComplete]);
  
  const handleStartTour = useCallback((tour: Tour) => {
    setCurrentTour(tour);
    setCurrentWaypoint(tour.waypoints[0]);
  }, []);
  
  const handleWaypointClick = useCallback((waypointId: string) => {
    setCurrentWaypoint(waypointId);
  }, []);
  
  const handleZoneClick = useCallback((zoneId: string) => {
    setSelectedZone(selectedZone === zoneId ? null : zoneId);
  }, [selectedZone]);
  
  // Найти текущую точку обзора
  const currentWaypointData = useMemo(() => {
    if (!currentWaypoint) return null;
    return layout.navigation.waypoints.find(w => w.id === currentWaypoint);
  }, [currentWaypoint, layout.navigation.waypoints]);
  
  return (
    <div className={cn('relative w-full h-full', className)}>
      {/* Панель управления */}
      <div className=\"absolute top-4 left-4 z-10 space-y-2\">
        <motion.div 
          className=\"bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg\"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className=\"font-semibold text-gray-800 mb-3\">{layout.name}</h3>
          
          {/* Переключение режима навигации */}
          <div className=\"flex space-x-2 mb-3\">
            <AnimatedButton
              size=\"sm\"
              variant={isFirstPerson ? \"outline\" : \"primary\"}
              onClick={() => setIsFirstPerson(false)}
            >
              Обзор
            </AnimatedButton>
            <AnimatedButton
              size=\"sm\"
              variant={isFirstPerson ? \"primary\" : \"outline\"}
              onClick={() => setIsFirstPerson(true)}
            >
              Прогулка
            </AnimatedButton>
          </div>
          
          {/* Туры */}
          {tours.length > 0 && (
            <div className=\"space-y-2\">
              <h4 className=\"text-sm font-medium text-gray-700\">Туры:</h4>
              {tours.map(tour => (
                <AnimatedButton
                  key={tour.id}
                  size=\"sm\"
                  variant=\"outline\"
                  onClick={() => handleStartTour(tour)}
                  className=\"w-full justify-start\"
                >
                  {tour.name}
                </AnimatedButton>
              ))}
            </div>
          )}
        </motion.div>
        
        {/* Информация о текущем туре */}
        <AnimatePresence>
          {currentTour && (
            <motion.div
              className=\"bg-blue-600 text-white rounded-xl p-4 shadow-lg\"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className=\"flex items-center space-x-2 mb-2\">
                <div className=\"w-2 h-2 bg-white rounded-full animate-pulse\" />
                <span className=\"text-sm font-medium\">Тур активен</span>
              </div>
              <p className=\"text-sm\">{currentTour.name}</p>
              <button 
                onClick={() => setCurrentTour(null)}
                className=\"text-xs text-blue-200 hover:text-white mt-2\"
              >
                Остановить тур
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Информация о зонах */}
      <div className=\"absolute top-4 right-4 z-10\">
        <motion.div 
          className=\"bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs\"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className=\"font-semibold text-gray-800 mb-3\">Зоны оборудования</h4>
          <div className=\"space-y-2\">
            {layout.zones.map(zone => (
              <div 
                key={zone.id}
                className={cn(
                  'flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors',
                  selectedZone === zone.id 
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100'
                )}
                onClick={() => handleZoneClick(zone.id)}
              >
                <div 
                  className=\"w-3 h-3 rounded-full\" 
                  style={{ backgroundColor: zone.color || '#3b82f6' }}
                />
                <div className=\"flex-1\">
                  <div className=\"text-sm font-medium\">{zone.name}</div>
                  <div className=\"text-xs text-gray-500\">{zone.models.length} моделей</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* 3D Canvas */}
      <Canvas 
        shadows 
        camera={{ position: [10, 8, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Окружение */}
          <ShowroomEnvironment settings={layout.environment} />
          
          {/* Освещение */}
          <ShowroomLighting setup={layout.lighting} />
          
          {/* Зоны оборудования */}
          {layout.zones.map(zone => (
            <EquipmentZone 
              key={zone.id} 
              zone={zone} 
              onModelClick={onModelClick}
            />
          ))}
          
          {/* Навигационные точки */}
          <NavigationWaypoints 
            waypoints={layout.navigation.waypoints}
            currentWaypoint={currentWaypoint}
            onWaypointClick={handleWaypointClick}
          />
          
          {/* Управление камерой */}
          {isFirstPerson ? (
            <PointerLockControls />
          ) : (
            <OrbitControls 
              target={currentWaypointData?.position || [0, 0, 0]}
              autoRotate={!currentTour}
              autoRotateSpeed={0.5}
              enableDamping
              dampingFactor={0.05}
            />
          )}
          
          {/* Тени */}
          <ContactShadows 
            position={[0, -0.9, 0]} 
            opacity={0.6} 
            scale={50} 
            blur={2} 
            far={10} 
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Компонент загрузки
function LoadingFallback() {
  return (
    <Html center>
      <LoadingSpinner size=\"lg\" />
    </Html>
  );
}

// === ПРЕДУСТАНОВЛЕННЫЕ МАКЕТЫ ===

export const SHOWROOM_LAYOUTS: ShowroomLayout[] = [
  {
    id: 'modern-tech',
    name: 'Современный технологический шоурум',
    description: 'Футуристический шоурум с современным дизайном',
    zones: [
      {
        id: 'displays',
        name: 'Дисплеи и экраны',
        category: 'displays',
        position: [-5, 0, -5],
        size: [4, 2, 4],
        models: [],
        color: '#3b82f6'
      },
      {
        id: 'audio',
        name: 'Аудиосистемы',
        category: 'audio',
        position: [5, 0, -5],
        size: [4, 2, 4],
        models: [],
        color: '#8b5cf6'
      },
      {
        id: 'lighting',
        name: 'Освещение',
        category: 'lighting',
        position: [0, 0, 5],
        size: [6, 2, 4],
        models: [],
        color: '#06b6d4'
      }
    ],
    lighting: {
      ambient: { intensity: 0.4, color: '#ffffff' },
      directional: [
        { position: [10, 10, 5], intensity: 0.8, color: '#ffffff', castShadow: true }
      ],
      spots: [
        { position: [0, 8, 0], target: [0, 0, 0], intensity: 1.0, angle: Math.PI / 4, color: '#ffffff' }
      ]
    },
    environment: {
      type: 'studio',
      ground: {
        color: '#1f2937',
        material: 'metal',
        reflectivity: 0.3
      }
    },
    navigation: {
      mode: 'orbit',
      speed: 1,
      boundaries: {
        min: [-15, 0, -15],
        max: [15, 10, 15]
      },
      waypoints: [
        {
          id: 'entrance',
          name: 'Вход',
          position: [0, 5, 10],
          lookAt: [0, 0, 0],
          description: 'Добро пожаловать в шоурум WeShow'
        },
        {
          id: 'displays-view',
          name: 'Обзор дисплеев',
          position: [-8, 3, -5],
          lookAt: [-5, 0, -5]
        },
        {
          id: 'audio-view',
          name: 'Аудиозона',
          position: [8, 3, -5],
          lookAt: [5, 0, -5]
        },
        {
          id: 'lighting-view',
          name: 'Освещение',
          position: [0, 3, 8],
          lookAt: [0, 0, 5]
        }
      ]
    }
  }
];

export default VirtualShowroom;"