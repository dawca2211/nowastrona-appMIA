import React, { useState } from 'react';
import Button from './common/Button';

interface EnterCodeModalProps {
  onClose: () => void;
  onStartCall: (code: string) => void;
}

const EnterCodeModal: React.FC<EnterCodeModalProps> = ({ onClose, onStartCall }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      onStartCall(code.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
      <div className="bg-brand-gray rounded-2xl shadow-2xl w-full max-w-md text-center border border-brand-primary/30 relative p-8" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="font-serif text-3xl font-bold text-brand-primary mb-4">Enter Your Session Code</h2>
        <p className="text-lg text-gray-300 mb-8">
          Please enter the 8-character code you received when you booked your session.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="A1B2C3D4"
              maxLength={8}
              className="w-full bg-brand-dark border-2 border-brand-primary/30 rounded-lg py-4 px-6 text-white text-3xl text-center font-mono tracking-[0.2em] placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
            <Button type="submit" variant="primary" className="w-full text-lg" disabled={!code.trim()}>
                Start Call
            </Button>
        </form>
      </div>
    </div>
  );
};

export default EnterCodeModal;