import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlockGameModal } from '../components/BlockGameModal';
import SEOHead from '../components/SEOHead';

const Tetris = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(true);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      navigate('/');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <SEOHead title="Игра — WESHOW" description="Интерактивная игра." url="https://weshow.su/tetris" noIndex />
      <BlockGameModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};

export default Tetris;

