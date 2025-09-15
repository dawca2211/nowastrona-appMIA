import React from 'react';

interface GeneratedImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const GeneratedImageModal: React.FC<GeneratedImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
      <div className="bg-brand-gray rounded-lg shadow-2xl p-4 max-w-lg w-full text-center border border-brand-primary/30 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-4 -right-4 text-brand-dark bg-brand-primary rounded-full h-10 w-10 flex items-center justify-center hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="font-serif text-2xl font-bold text-brand-primary mb-4">Just For You...</h2>
        <div className="rounded-lg overflow-hidden">
          <img src={imageUrl} alt="AI generated portrait of Mia" className="w-full h-auto object-contain" />
        </div>
        <p className="text-md text-gray-400 mt-4">
          I hope you like this little surprise I created for you.
        </p>
      </div>
    </div>
  );
};

export default GeneratedImageModal;