import React, { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Search, FileText, Cog, Truck, Settings, Headphones } from "lucide-react";
import ProcessNode from './WorkflowRoadmap';

const WorkflowRoadmapSection = () => {
  const nodeTypes = {
    processNode: ProcessNode,
  };

  // Initial nodes for the workflow
  const initialNodes = [
    {
      id: '1',
      type: 'processNode',
      position: { x: 50, y: 150 },
      data: {
        number: 1,
        icon: <Search className="h-6 w-6" />,
        title: "Консультация и анализ потребностей",
        description: "Выезд специалиста, анализ технических требований, разработка концепции решения",
        duration: "1-2 дня",
        gradient: "gradient-card-purple"
      },
    },
    {
      id: '2',
      type: 'processNode',
      position: { x: 400, y: 50 },
      data: {
        number: 2,
        icon: <FileText className="h-6 w-6" />,
        title: "Техническое проектирование",
        description: "Создание детального проекта, подготовка спецификации оборудования, согласование бюджета",
        duration: "3-5 дней",
        gradient: "gradient-card-blue"
      },
    },
    {
      id: '3',
      type: 'processNode',
      position: { x: 750, y: 150 },
      data: {
        number: 3,
        icon: <Truck className="h-6 w-6" />,
        title: "Поставка оборудования",
        description: "Закупка и доставка сертифицированного оборудования от ведущих производителей",
        duration: "1-2 недели",
        gradient: "gradient-card-cyan"
      },
    },
    {
      id: '4',
      type: 'processNode',
      position: { x: 1100, y: 250 },
      data: {
        number: 4,
        icon: <Cog className="h-6 w-6" />,
        title: "Монтаж и настройка",
        description: "Профессиональный монтаж, настройка и интеграция всех систем, тестирование",
        duration: "1-3 недели",
        gradient: "gradient-card-dark"
      },
    },
    {
      id: '5',
      type: 'processNode',
      position: { x: 750, y: 350 },
      data: {
        number: 5,
        icon: <Settings className="h-6 w-6" />,
        title: "Пуско-наладочные работы",
        description: "Финальная настройка, обучение персонала, подготовка технической документации",
        duration: "3-5 дней",
        gradient: "gradient-card-purple"
      },
    },
    {
      id: '6',
      type: 'processNode',
      position: { x: 400, y: 450 },
      data: {
        number: 6,
        icon: <Headphones className="h-6 w-6" />,
        title: "Сервисное обслуживание",
        description: "Техническая поддержка 24/7, плановое обслуживание, гарантийное сопровождение",
        duration: "Постоянно",
        gradient: "gradient-card-blue"
      },
    },
  ];

  // Initial edges connecting the workflow steps
  const initialEdges = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#3b82f6',
      },
    },
    {
      id: 'e2-3',
      source: '2',
      target: '3',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#06b6d4', strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#06b6d4',
      },
    },
    {
      id: 'e3-4',
      source: '3',
      target: '4',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#8b5cf6', strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#8b5cf6',
      },
    },
    {
      id: 'e4-5',
      source: '4',
      target: '5',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#3b82f6', strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#3b82f6',
      },
    },
    {
      id: 'e5-6',
      source: '5',
      target: '6',
      type: 'smoothstep',
      animated: true,
      style: { stroke: '#06b6d4', strokeWidth: 3 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#06b6d4',
      },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Дорожная карта процесса работы
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Интерактивная визуализация пошагового подхода к реализации мультимедийных проектов любой сложности
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden" style={{ height: '600px' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodeTypes={nodeTypes}
            fitView
            attributionPosition="bottom-left"
            proOptions={{ hideAttribution: true }}
            style={{ backgroundColor: '#f8fafc' }}
            minZoom={0.5}
            maxZoom={1.5}
            defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
          >
            <Controls 
              className="bg-white border border-slate-200 rounded-xl shadow-lg"
              showInteractive={false}
            />
            <Background 
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="#e2e8f0"
            />
          </ReactFlow>
        </div>

        <div className="mt-12 text-center">
          <div className="gradient-card-purple rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Готовы начать ваш проект?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Наши эксперты проведут вас через каждый этап реализации, обеспечивая высочайшее качество на всех стадиях
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-white/30">
                Обсудить проект
              </button>
              <button className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowRoadmapSection;