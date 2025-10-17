import React, { useRef, useEffect } from 'react';

const GameSimple: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log('GameSimple component mounted');
    
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      console.log('Canvas found:', canvas);
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        console.log('2D context obtained');
        
        // Устанавливаем размеры
        canvas.width = 800;
        canvas.height = 400;
        
        // Рисуем что-то
        ctx.fillStyle = '#87CEEB';
        ctx.fillRect(0, 0, 800, 400);
        
        ctx.fillStyle = '#000000';
        ctx.font = '24px Arial';
        ctx.fillText('Простая игра работает!', 200, 200);
        
        console.log('Canvas drawn successfully');
      } else {
        console.error('Failed to get 2D context');
      }
    } else {
      console.error('Canvas ref is null');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl text-center mb-8">Простая игра</h1>
      
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width="800"
          height="400"
          style={{
            border: '2px solid white',
            backgroundColor: '#87CEEB'
          }}
        />
      </div>
      
      <div className="text-center mt-4">
        <p>Canvas должен отображаться выше</p>
      </div>
    </div>
  );
};

export default GameSimple;
