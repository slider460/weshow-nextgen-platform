import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowLeft, Home } from 'lucide-react';

interface BackToAdminButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

const BackToAdminButton: React.FC<BackToAdminButtonProps> = ({ 
  className = '', 
  variant = 'outline',
  size = 'default'
}) => {
  return (
    <Button 
      asChild 
      variant={variant} 
      size={size}
      className={`flex items-center gap-2 ${className}`}
    >
      <Link to="/admin/">
        <ArrowLeft className="h-4 w-4" />
        <Home className="h-4 w-4" />
        Вернуться на главную панель
      </Link>
    </Button>
  );
};

export default BackToAdminButton;
