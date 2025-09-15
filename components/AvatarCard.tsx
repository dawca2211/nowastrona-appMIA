import React from 'react';
import Button from './common/Button';
import type { Avatar } from '../types';

interface AvatarCardProps {
  avatar: Avatar;
  onBook: () => void;
}

const AvatarCard: React.FC<AvatarCardProps> = ({ avatar, onBook }) => {
  return (
    <div className="bg-brand-dark rounded-xl shadow-lg border border-brand-primary/20 flex flex-col items-center transform transition-transform hover:-translate-y-2 overflow-hidden">
      <div className="w-full h-80 bg-cover bg-center" style={{ backgroundImage: `url(${avatar.imageUrl})` }}></div>
      <div className="p-6 text-center w-full">
        <h4 className="font-serif text-2xl font-bold text-white">{avatar.name}</h4>
        <p className="text-brand-primary mb-4">{avatar.language}</p>
        <Button onClick={onBook} variant="outline" className="w-full">
          Book a Call
        </Button>
      </div>
    </div>
  );
};

export default AvatarCard;
