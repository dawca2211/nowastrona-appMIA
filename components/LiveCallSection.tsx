import React from 'react';
import type { Avatar } from '../types';
import AvatarCard from './AvatarCard';
import Button from './common/Button';

const avatars: Avatar[] = [
  { id: 'en1', name: 'Mia', language: 'English', imageUrl: 'https://picsum.photos/seed/mia-en1/400/600', faceId: 'mia_english_v1' },
  { id: 'de', name: 'Mia', language: 'German', imageUrl: 'https://picsum.photos/seed/mia-de/400/600', faceId: 'mia_german_v1' },
  { id: 'pl', name: 'Mia', language: 'Polish', imageUrl: 'https://picsum.photos/seed/mia-pl/400/600', faceId: 'mia_polish_v1' },
  { id: 'en2', name: 'Chloe', language: 'English', imageUrl: 'https://picsum.photos/seed/mia-en2/400/600', faceId: 'chloe_english_v1' },
];

interface LiveCallSectionProps {
  onBookCall: (avatar: Avatar) => void;
  onOpenEnterCodeModal: () => void;
}

const LiveCallSection: React.FC<LiveCallSectionProps> = ({ onBookCall, onOpenEnterCodeModal }) => {
  return (
    <section id="live" className="py-20 bg-brand-gray">
      <div className="container mx-auto px-6 text-center">
        <h3 className="font-serif text-4xl font-bold text-brand-primary mb-4">Talk to Mia Live</h3>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">
          Ready for something more personal? Choose your companion and book a private, 1-on-1 live video session.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {avatars.map(avatar => (
            <AvatarCard key={avatar.id} avatar={avatar} onBook={() => onBookCall(avatar)} />
          ))}
        </div>
        <div className="mt-16 border-t border-brand-primary/20 pt-10">
            <h4 className="font-serif text-2xl font-bold text-white mb-4">Already have a booking?</h4>
            <Button onClick={onOpenEnterCodeModal} variant="secondary">
                Have a code? Start Your Call
            </Button>
        </div>
      </div>
    </section>
  );
};

export default LiveCallSection;