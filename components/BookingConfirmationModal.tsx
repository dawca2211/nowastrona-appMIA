import React, { useState } from 'react';
import type { ConfirmedBooking } from '../types';
import Button from './common/Button';

interface BookingConfirmationModalProps {
  booking: ConfirmedBooking;
  onClose: () => void;
  onDone: () => void;
}

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
);


const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({ booking, onClose, onDone }) => {
  const [copied, setCopied] = useState(false);

  const handleAddToCalendar = () => {
    const start = booking.scheduledTime;
    const end = new Date(start.getTime() + booking.duration * 60 * 1000);

    const toGoogleISO = (date: Date) => date.toISOString().replace(/-|:|\.\d{3}/g, "");
    
    const startDate = toGoogleISO(start);
    const endDate = toGoogleISO(end);

    const title = encodeURIComponent(`Live Call with ${booking.avatar.name}`);
    const details = encodeURIComponent(`Your private ${booking.duration}-minute video session with ${booking.avatar.name}.\n\nYour session code: ${booking.sessionCode}`);

    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}`;

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(booking.sessionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
      <div className="bg-brand-gray rounded-2xl shadow-2xl w-full max-w-md text-center border border-brand-primary/30 relative p-8" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <img src={booking.avatar.imageUrl} alt={booking.avatar.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-brand-secondary" />
        <h2 className="font-serif text-3xl font-bold text-brand-primary mb-2">Your Call is Booked!</h2>
        <p className="text-lg text-gray-300 mb-6">
          Your {booking.duration}-minute session with {booking.avatar.name} is scheduled for:
          <br />
          <strong className="text-white">{booking.scheduledTime.toLocaleString()}</strong>
        </p>

        <div className="bg-brand-dark p-4 rounded-lg border-2 border-dashed border-brand-primary/50 mb-6">
          <p className="text-gray-400 text-sm mb-2">Your unique session code (SAVE IT!):</p>
          <div className="flex items-center justify-center space-x-4">
              <p className="text-3xl font-mono font-bold text-brand-primary tracking-widest">{booking.sessionCode}</p>
              <button onClick={handleCopyCode} className="px-3 py-1 text-sm bg-brand-primary text-brand-dark rounded-md font-semibold w-24">
                  {copied ? 'Copied!' : 'Copy'}
              </button>
          </div>
        </div>

        <div className="space-y-4">
            <Button onClick={handleAddToCalendar} variant="outline" className="w-full text-lg">
                <CalendarIcon />
                Add to Google Calendar
            </Button>
            <Button onClick={onDone} variant="primary" className="w-full text-lg">
                Done
            </Button>
        </div>

      </div>
    </div>
  );
};

export default BookingConfirmationModal;