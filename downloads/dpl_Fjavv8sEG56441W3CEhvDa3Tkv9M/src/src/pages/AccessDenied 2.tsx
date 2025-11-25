import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { AlertCircle, Home, LogIn } from 'lucide-react';

export const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Доступ запрещен
          </h1>
          <p className="text-gray-600 mb-8">
            Необходимо войти в систему для доступа к этой странице
          </p>
        </div>

        <div className="space-y-4">
          <Button
            asChild
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              На главную
            </Link>
          </Button>
          
          <Button
            asChild
            variant="outline"
            className="w-full"
          >
            <Link to="/">
              <LogIn className="w-4 h-4 mr-2" />
              Войти в систему
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Если проблема повторяется, обратитесь к администратору</p>
        </div>
      </div>
    </div>
  );
};
