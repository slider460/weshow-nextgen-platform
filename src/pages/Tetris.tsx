import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlockGameModal } from '../components/BlockGameModal';

const Tetris = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(true);

  useEffect(() => {
    // Открываем модальное окно при загрузке страницы
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    // Перенаправляем на главную страницу после закрытия
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <BlockGameModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default Tetris;

