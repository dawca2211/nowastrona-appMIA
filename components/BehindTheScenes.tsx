import React from 'react';
import Button from './common/Button';

const videoMedia = [
  { id: 1, thumbUrl: 'https://picsum.photos/seed/video1/600/400' },
  { id: 2, thumbUrl: 'https://picsum.photos/seed/video2/600/400' },
  { id: 3, thumbUrl: 'https://picsum.photos/seed/video3/600/400' },
  { id: 4, thumbUrl: 'https://picsum.photos/seed/video4/600/400' },
];

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/50" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white absolute top-2 right-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z" clipRule="evenodd" />
    </svg>
)

interface BehindTheScenesProps {
    onSubscribeClick: () => void;
}

const BehindTheScenes: React.FC<BehindTheScenesProps> = ({ onSubscribeClick }) => {
    return (
        <section id="videos" className="py-20 bg-brand-gray">
            <div className="container mx-auto px-6 text-center">
                <h3 className="font-serif text-4xl font-bold text-brand-primary mb-4">Behind The Scenes</h3>
                <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
                    Come closer and see the real me. Candid moments, personal vlogs, and a peek into my daily life. Available only to my subscribers.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 max-w-4xl mx-auto">
                    {videoMedia.map(item => (
                        <div key={item.id} className="aspect-video rounded-lg overflow-hidden relative group cursor-pointer bg-cover bg-center" style={{backgroundImage: `url(${item.thumbUrl})`}}>
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:backdrop-blur-none">
                                <PlayIcon />
                                <LockIcon />
                            </div>
                        </div>
                    ))}
                </div>

                <Button onClick={onSubscribeClick} variant="primary" className="text-xl px-10 py-4">
                    Watch All Videos
                </Button>
            </div>
        </section>
    );
};

export default BehindTheScenes;