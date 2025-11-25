import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { LucideIcon } from 'lucide-react';

interface ProcessNodeData {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  duration: string;
  gradient: string;
}

interface ProcessNodeProps {
  data: ProcessNodeData;
}

const ProcessNode: React.FC<ProcessNodeProps> = memo(({ data }) => {
  const { number, icon, title, description, duration, gradient } = data;
  
  return (
    <div className={`${gradient} rounded-3xl p-6 min-w-[280px] relative shadow-lg border-2 border-white/20`}>
      {/* Input Handle */}
      {number > 1 && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-4 h-4 border-2 border-white bg-white/20 hover:bg-white/40"
        />
      )}
      
      {/* Step Number */}
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
        <span className="text-slate-900 font-bold text-sm">{number}</span>
      </div>
      
      {/* Icon */}
      <div className="text-white mb-4 flex justify-center">
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          {icon}
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-3 text-center leading-tight">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-white/90 text-sm leading-relaxed mb-4 text-center">
        {description}
      </p>
      
      {/* Duration */}
      <div className="text-xs font-medium text-white/80 bg-white/10 rounded-lg px-3 py-2 text-center">
        {duration}
      </div>
      
      {/* Output Handle */}
      {number < 6 && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-4 h-4 border-2 border-white bg-white/20 hover:bg-white/40"
        />
      )}
    </div>
  );
});

ProcessNode.displayName = 'ProcessNode';

export default ProcessNode;