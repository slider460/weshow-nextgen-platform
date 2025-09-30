import React, { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { ResetPasswordForm } from './ResetPasswordForm';

type AuthMode = 'signin' | 'signup' | 'reset';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialMode = 'signin' 
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onClose();
  };

  const handleSwitchToSignUp = () => {
    setMode('signup');
  };

  const handleSwitchToSignIn = () => {
    setMode('signin');
  };

  const handleSwitchToReset = () => {
    setMode('reset');
  };

  return (
    <div 
      className="auth-modal-overlay"
      style={{ 
        position: 'fixed !important',
        top: '0 !important',
        left: '0 !important',
        right: '0 !important',
        bottom: '0 !important',
        width: '100vw !important',
        height: '100vh !important',
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        padding: '2rem 1rem !important',
        zIndex: '9999 !important',
        margin: '0 !important',
        transform: 'none !important'
      }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
        style={{ position: 'absolute !important' }}
      />

      {/* Modal */}
      <div 
        className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-y-auto"
        style={{ 
          maxHeight: 'calc(100vh - 4rem)',
          margin: '0 !important',
          position: 'relative !important',
          transform: 'none !important'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6">
          {mode === 'signin' && (
            <SignInForm
              onSuccess={handleSuccess}
              onSwitchToSignUp={handleSwitchToSignUp}
              onSwitchToResetPassword={handleSwitchToReset}
            />
          )}
          
          {mode === 'signup' && (
            <SignUpForm
              onSuccess={handleSuccess}
              onSwitchToSignIn={handleSwitchToSignIn}
            />
          )}
          
          {mode === 'reset' && (
            <ResetPasswordForm
              onSuccess={handleSuccess}
              onSwitchToSignIn={handleSwitchToSignIn}
            />
          )}
        </div>
      </div>
    </div>
  );
};
