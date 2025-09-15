
import React from 'react';
import Button from './common/Button';

interface AgeVerificationModalProps {
  onConfirm: () => void;
}

const AgeVerificationModal: React.FC<AgeVerificationModalProps> = ({ onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fade-in p-4">
      <div className="bg-brand-gray rounded-lg shadow-2xl p-8 max-w-md text-center border border-brand-primary/30">
        <h2 className="font-serif text-3xl font-bold text-brand-primary mb-4">Content Warning</h2>
        <p className="text-lg text-brand-light mb-6">
          This website contains adult content and is intended for individuals 18 years of age or older.
        </p>
        <p className="text-md text-gray-400 mb-8">
          By entering, you confirm that you are of legal age to view adult material in your jurisdiction and you agree to our Terms of Service.
        </p>
        <div className="flex justify-center space-x-4">
          <Button onClick={onConfirm} variant="primary" className="w-32">I am 18+</Button>
          <a href="https://google.com" className="px-8 py-3 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 shadow-lg bg-slate-600 text-white hover:bg-slate-500 focus:ring-slate-500/50 w-32 flex items-center justify-center">
            Exit
          </a>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;