import React from 'react';

interface PolicyModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ title, onClose, children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
      <div className="bg-brand-gray rounded-2xl shadow-2xl w-full max-w-3xl h-[90vh] flex flex-col border border-brand-primary/30 relative" onClick={e => e.stopPropagation()}>
        <header className="p-6 flex items-center justify-between border-b border-brand-primary/20 sticky top-0 bg-brand-gray/80 backdrop-blur-sm z-10">
          <h2 className="font-serif text-3xl font-bold text-brand-primary">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <main className="flex-1 p-8 overflow-y-auto text-gray-300">
          <div className="prose prose-invert prose-lg max-w-none prose-h3:text-brand-primary prose-h3:font-bold prose-h3:font-serif prose-a:text-brand-secondary hover:prose-a:text-purple-400">
             {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PolicyModal;