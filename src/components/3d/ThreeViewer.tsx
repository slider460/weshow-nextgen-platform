import React, { useRef, useEffect, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Text,
  Html,
  useProgress,
  Stats,
  Grid,
  GizmoHelper,
  GizmoViewport
} from '@react-three/drei';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { LoadingSpinner } from '../ui/LoadingStates';

// Extend Three.js with additional materials/geometries if needed
extend({ OrbitControls });

// === ТИПЫ ДЛЯ 3D СЦЕНЫ ===

interface Equipment3DModel {
  id: string;
  name: string;
  modelUrl: string;
  thumbnailUrl?: string;
  scale?: [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
  materials?: Record<string, any>;
  animations?: string[];
}

interface ViewerSettings {
  showGrid?: boolean;
  showStats?: boolean;
  showGizmo?: boolean;
  autoRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  background?: 'transparent' | 'environment' | 'gradient' | string;
  lighting?: 'studio' | 'outdoor' | 'custom';
  shadows?: boolean;
  wireframe?: boolean;
}

interface CameraPosition {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
}

// === КОМПОНЕНТ ЗАГРУЗЧИКА ===

function Loader() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <motion.div 
        className="flex flex-col items-center space-y-4 p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <LoadingSpinner size="lg" />
        <div className="text-center">
          <p className="font-semibold text-gray-800 mb-2">Загрузка 3D модели</p>
          <div className="w-48 bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{Math.round(progress)}%</p>
        </div>
      </motion.div>
    </Html>
  );
}

// === КОМПОНЕНТ 3D МОДЕЛИ ===

interface Model3DProps {
  model: Equipment3DModel;
  onClick?: (model: Equipment3DModel) => void;
  onHover?: (model: Equipment3DModel | null) => void;
  wireframe?: boolean;
}

function Model3D({ model, onClick, onHover, wireframe = false }: Model3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Загружаем GLTF модель
  const gltf = useLoader(GLTFLoader, model.modelUrl, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);
  });

  // Анимация вращения при наведении
  useFrame((state, delta) => {
    if (meshRef.current && hovered) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // Применяем настройки модели
  useEffect(() => {
    if (gltf.scene && meshRef.current) {
      // Применяем масштаб
      if (model.scale) {
        meshRef.current.scale.set(...model.scale);
      }
      
      // Применяем позицию
      if (model.position) {
        meshRef.current.position.set(...model.position);
      }
      
      // Применяем поворот
      if (model.rotation) {
        meshRef.current.rotation.set(...model.rotation);
      }

      // Применяем wireframe если нужно
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (wireframe) {
            child.material = child.material.clone();
            child.material.wireframe = true;
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [gltf, model, wireframe]);

  const handleClick = useCallback(() => {
    onClick?.(model);
  }, [onClick, model]);

  const handlePointerOver = useCallback(() => {
    setHovered(true);
    onHover?.(model);
    document.body.style.cursor = 'pointer';
  }, [onHover, model]);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    onHover?.(null);
    document.body.style.cursor = 'default';
  }, [onHover]);

  return (
    <group
      ref={meshRef}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <primitive 
        object={gltf.scene.clone()} 
        scale={hovered ? 1.05 : 1}
      />
      
      {/* Подпись к модели */}
      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color={hovered ? "#2563eb" : "#374151"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {model.name}
      </Text>
    </group>
  );
}

// === КОМПОНЕНТ ОСВЕЩЕНИЯ ===

interface LightingProps {
  type: 'studio' | 'outdoor' | 'custom';
  intensity?: number;
}

function Lighting({ type, intensity = 1 }: LightingProps) {
  switch (type) {
    case 'studio':
      return (
        <>
          <ambientLight intensity={0.4 * intensity} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={0.8 * intensity}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.3 * intensity} />
        </>
      );
    
    case 'outdoor':
      return (
        <>
          <ambientLight intensity={0.6 * intensity} />
          <directionalLight
            position={[0, 10, 5]}
            intensity={1.2 * intensity}
            castShadow
          />
        </>
      );
    
    default:
      return (
        <>
          <ambientLight intensity={0.5 * intensity} />
          <pointLight position={[10, 10, 10]} intensity={intensity} />
        </>
      );
  }
}

// === ОСНОВНОЙ КОМПОНЕНТ ВЬЮЕРА ===

interface ThreeViewerProps {
  models: Equipment3DModel[];
  settings?: ViewerSettings;
  cameraPosition?: CameraPosition;
  onModelClick?: (model: Equipment3DModel) => void;
  onModelHover?: (model: Equipment3DModel | null) => void;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const ThreeViewer: React.FC<ThreeViewerProps> = ({
  models,
  settings = {},
  cameraPosition,
  onModelClick,
  onModelHover,
  className,
  width = '100%',
  height = 400
}) => {
  const {
    showGrid = false,
    showStats = false,
    showGizmo = false,
    autoRotate = false,
    enableZoom = true,
    enablePan = true,
    background = 'transparent',
    lighting = 'studio',
    shadows = true,
    wireframe = false
  } = settings;

  const [hoveredModel, setHoveredModel] = useState<Equipment3DModel | null>(null);

  const handleModelHover = useCallback((model: Equipment3DModel | null) => {
    setHoveredModel(model);
    onModelHover?.(model);
  }, [onModelHover]);

  // Настройки фона
  const getBackground = () => {
    switch (background) {
      case 'environment':
        return <Environment preset="city" />;
      case 'gradient':
        return <color attach="background" args={['#f0f4f8']} />;
      case 'transparent':
        return null;
      default:
        return <color attach="background" args={[background]} />;
    }
  };

  return (
    <div className={cn('relative', className)} style={{ width, height }}>
      {/* Информация о наведенной модели */}
      {hoveredModel && (
        <motion.div
          className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <h4 className="font-semibold text-gray-800">{hoveredModel.name}</h4>
          <p className="text-sm text-gray-600">Нажмите для подробностей</p>
        </motion.div>
      )}

      {/* 3D Canvas */}
      <Canvas
        camera={{
          position: cameraPosition?.position || [5, 5, 5],
          fov: cameraPosition?.fov || 45
        }}
        shadows={shadows}
        style={{ background: 'transparent' }}
      >
        {/* Фон */}
        {getBackground()}
        
        {/* Освещение */}
        <Lighting type={lighting} />
        
        {/* Сетка */}
        {showGrid && (
          <Grid
            position={[0, -1, 0]}
            args={[10.5, 10.5]}
            cellSize={0.6}
            cellThickness={1}
            sectionSize={3.3}
            sectionThickness={1.5}
            cellColor="#6b7280"
            sectionColor="#374151"
            fadeDistance={25}
            fadeStrength={1}
          />
        )}
        
        {/* Модели */}
        <Suspense fallback={<Loader />}>
          {models.map((model) => (
            <Model3D
              key={model.id}
              model={model}
              onClick={onModelClick}
              onHover={handleModelHover}
              wireframe={wireframe}
            />
          ))}
        </Suspense>
        
        {/* Тени */}
        {shadows && (
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.4}
            scale={20}
            blur={2}
            far={4}
          />
        )}
        
        {/* Управление камерой */}
        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
          enableZoom={enableZoom}
          enablePan={enablePan}
          target={cameraPosition?.target || [0, 0, 0]}
        />
        
        {/* Гизмо навигации */}
        {showGizmo && (
          <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
            <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
          </GizmoHelper>
        )}
        
        {/* Статистика производительности */}
        {showStats && <Stats />}
      </Canvas>
    </div>
  );
};

// === КОМПОНЕНТ ДЛЯ СРАВНЕНИЯ МОДЕЛЕЙ ===

interface ModelComparisonProps {
  models: Equipment3DModel[];
  onModelSelect?: (model: Equipment3DModel) => void;
  className?: string;
}

export const ModelComparison: React.FC<ModelComparisonProps> = ({
  models,
  onModelSelect,
  className
}) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const handleModelClick = useCallback((model: Equipment3DModel) => {
    setSelectedModel(model.id);
    onModelSelect?.(model);
  }, [onModelSelect]);

  // Разделяем модели на группы для отображения
  const arrangedModels = models.map((model, index) => ({
    ...model,
    position: [index * 3 - (models.length - 1) * 1.5, 0, 0] as [number, number, number]
  }));

  return (
    <div className={cn('relative', className)}>
      <ThreeViewer
        models={arrangedModels}
        settings={{
          showGrid: true,
          autoRotate: false,
          lighting: 'studio',
          shadows: true,
          background: 'gradient'
        }}
        onModelClick={handleModelClick}
        height={500}
      />
      
      {/* Панель управления */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <div className="flex space-x-2">
          {models.map((model, index) => (
            <motion.button
              key={model.id}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedModel === model.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border'
              )}
              onClick={() => handleModelClick(model)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {model.name}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

// === КОМПОНЕНТ КОНФИГУРАТОРА ===

interface ModelConfiguratorProps {
  model: Equipment3DModel;
  onConfigChange?: (config: any) => void;
  className?: string;
}

export const ModelConfigurator: React.FC<ModelConfiguratorProps> = ({
  model,
  onConfigChange,
  className
}) => {
  const [config, setConfig] = useState({
    wireframe: false,
    showDimensions: false,
    explodedView: false,
    material: 'default'
  });

  const handleConfigUpdate = useCallback((updates: Partial<typeof config>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    onConfigChange?.(newConfig);
  }, [config, onConfigChange]);

  return (
    <div className={cn('flex', className)}>
      <div className="flex-1">
        <ThreeViewer
          models={[model]}
          settings={{
            wireframe: config.wireframe,
            showGizmo: true,
            showStats: true,
            lighting: 'studio',
            shadows: true
          }}
          height={600}
        />
      </div>
      
      {/* Панель настроек */}
      <div className="w-64 bg-white border-l border-gray-200 p-4 space-y-4">
        <h3 className="font-semibold text-gray-800 mb-4">Настройки модели</h3>
        
        <div className="space-y-3">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.wireframe}
              onChange={(e) => handleConfigUpdate({ wireframe: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm">Каркасный режим</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.showDimensions}
              onChange={(e) => handleConfigUpdate({ showDimensions: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm">Показать размеры</span>
          </label>
          
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={config.explodedView}
              onChange={(e) => handleConfigUpdate({ explodedView: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm">Разнесенный вид</span>
          </label>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Материал
            </label>
            <select
              value={config.material}
              onChange={(e) => handleConfigUpdate({ material: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            >
              <option value="default">По умолчанию</option>
              <option value="metal">Металл</option>
              <option value="plastic">Пластик</option>
              <option value="glass">Стекло</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeViewer;