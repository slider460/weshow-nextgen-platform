import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PageTransition = ({ children, duration = 300 }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    
    const timer = setTimeout(() => {
      setDisplayChildren(children);
      setIsTransitioning(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [location.pathname, children, duration]);

  return (
    <div className="relative overflow-hidden">
      <div className={`transition-all duration-300 ease-in-out ${
        isTransitioning 
          ? 'opacity-0 transform translate-y-4' 
          : 'opacity-100 transform translate-y-0'
      }`}>
        {displayChildren}
      </div>
      
      {isTransitioning && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50 z-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse">
              <span className="text-white font-black text-2xl tracking-tight">W</span>
            </div>
            <div className="text-slate-600 text-sm font-medium">Загрузка...</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageTransition;