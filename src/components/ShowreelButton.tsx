import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Film } from 'lucide-react';
import ShowreelModal from './ShowreelModal';

interface ShowreelButtonProps {
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children?: React.ReactNode;
  icon?: 'play' | 'film';
  showText?: boolean;
  autoPlay?: boolean;
}

const ShowreelButton: React.FC<ShowreelButtonProps> = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
  icon = 'play',
  showText = true,
  autoPlay = true
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openShowreel = () => {
    setIsModalOpen(true);
  };

  const closeShowreel = () => {
    setIsModalOpen(false);
  };

  const getIcon = () => {
    switch (icon) {
      case 'film':
        return <Film className="w-4 h-4" />;
      case 'play':
      default:
        return <Play className="w-4 h-4" />;
    }
  };

  const getButtonText = () => {
    if (children) return children;
    
    switch (icon) {
      case 'film':
        return showText ? 'Смотреть шоурил' : '';
      case 'play':
      default:
        return showText ? 'Смотреть шоурил' : '';
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        onClick={openShowreel}
        className={`group transition-all duration-300 hover:scale-105 ${className}`}
      >
        {getIcon()}
        {showText && <span className="ml-2">{getButtonText()}</span>}
      </Button>

      <ShowreelModal
        isOpen={isModalOpen}
        onClose={closeShowreel}
      />
    </>
  );
};

export default ShowreelButton;
