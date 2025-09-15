import React from 'react';
import Button from './common/Button';

const photoMedia = [
  { id: 1, url: 'https://picsum.photos/seed/photo1/400/600' },
  { id: 2, url: 'https://picsum.photos/seed/photo2/400/600' },
  { id: 3, url: 'https://picsum.photos/seed/photo3/400/600' },
  { id: 4, url: 'https://picsum.photos/seed/photo4/400/600' },
];

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/50" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" clipRule="evenodd" />
    </svg>
)

interface ExclusivePhotosProps {
    onGenerateClick: () => void;
    isGenerating: boolean;
    onSubscribeClick: () => void;
}

const ExclusivePhotos: React.FC<ExclusivePhotosProps> = ({ onGenerateClick, isGenerating, onSubscribeClick }) => {
    return (
        <section id="photos" className="py-20 bg-brand-dark">
            <div className="container mx-auto px-6 text-center">
                <h3 className="font-serif text-4xl font-bold text-brand-primary mb-4">Exclusive Photos</h3>
                <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
                    A glimpse into my private world. A curated collection of my most intimate and artistic portraits. Subscribe to unlock the full, uncensored gallery.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
                    {photoMedia.map(item => (
                        <div key={item.id} className="aspect-[3/4] rounded-lg overflow-hidden relative group cursor-pointer bg-cover bg-center" style={{backgroundImage: `url(${item.url})`}}>
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 group-hover:backdrop-blur-sm">
                                <LockIcon />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button onClick={onSubscribeClick} variant="primary" className="text-xl px-10 py-4">
                        Unlock All Photos
                    </Button>
                    <Button onClick={onGenerateClick} variant="secondary" className="text-xl px-10 py-4" isLoading={isGenerating}>
                        {isGenerating ? 'Creating...' : 'Generate a New Photo'}
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default ExclusivePhotos;