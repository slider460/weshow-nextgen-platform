import { motion } from 'framer-motion';
import { useState } from 'react';

// Анимированная иконка Wi-Fi
export const AnimatedWifiIcon = ({ className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-full h-full">
        {/* Центральная точка */}
        <motion.circle
          cx="12"
          cy="20"
          r="1.5"
          fill="currentColor"
          animate={{ scale: isHovered ? 1.2 : 1 }}
        />
        
        {/* Волны */}
        {[1, 2, 3].map((wave, i) => (
          <motion.path
            key={wave}
            d={`M ${6 + i * 2} ${16 - i * 2} Q 12 ${10 - i * 2} ${18 - i * 2} ${16 - i * 2}`}
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: isHovered ? 1 : 0.7,
              opacity: isHovered ? 1 : 0.6,
            }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}
      </svg>
    </div>
  );
};

// Анимированная иконка загрузки
export const AnimatedLoadingIcon = ({ className = '', isLoading = false }) => {
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"
        animate={{ rotate: isLoading ? 360 : 0 }}
        transition={{ duration: 1, repeat: isLoading ? Infinity : 0, ease: 'linear' }}
      />
      {isLoading && (
        <motion.div
          className="absolute inset-0 w-6 h-6 border-2 border-purple-600 border-b-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );
};

// Анимированная иконка сердца
export const AnimatedHeartIcon = ({ className = '', isLiked = false, onClick }) => {
  return (
    <motion.button
      className={`${className} focus:outline-none`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={isLiked ? '#ef4444' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        animate={{
          fill: isLiked ? '#ef4444' : 'none',
          scale: isLiked ? [1, 1.2, 1] : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </motion.svg>
      
      {/* Эффект частиц при лайке */}
      {isLiked && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full"
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
};

// Анимированная иконка меню бургер
export const AnimatedMenuIcon = ({ isOpen = false, onClick, className = '' }) => {
  return (
    <motion.button
      className={`${className} focus:outline-none`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center">
        <motion.span
          className="w-6 h-0.5 bg-current mb-1"
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-current mb-1"
          animate={{
            opacity: isOpen ? 0 : 1,
            x: isOpen ? -10 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="w-6 h-0.5 bg-current"
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -6 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.button>
  );
};

// Анимированная иконка звезды
export const AnimatedStarIcon = ({ rating = 0, maxRating = 5, onRate, className = '' }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className={`flex space-x-1 ${className}`}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const starValue = i + 1;
        const isFilled = starValue <= (hoverRating || rating);
        
        return (
          <motion.button
            key={i}
            className="focus:outline-none"
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => onRate?.(starValue)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isFilled ? '#fbbf24' : 'none'}
              stroke="#fbbf24"
              strokeWidth="1"
              animate={{
                fill: isFilled ? '#fbbf24' : 'none',
                scale: isFilled ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </motion.svg>
          </motion.button>
        );
      })}
    </div>
  );
};

// Анимированная иконка уведомления
export const AnimatedNotificationIcon = ({ hasNotification = false, count = 0, onClick, className = '' }) => {
  return (
    <motion.button
      className={`relative ${className} focus:outline-none`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        animate={{
          rotate: hasNotification ? [0, 15, -15, 0] : 0,
        }}
        transition={{
          duration: 0.5,
          repeat: hasNotification ? Infinity : 0,
          repeatDelay: 2,
        }}
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </motion.svg>
      
      {/* Индикатор уведомлений */}
      {hasNotification && (
        <motion.div
          className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-5 h-5 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {count > 9 ? '9+' : count}
        </motion.div>
      )}
    </motion.button>
  );
};