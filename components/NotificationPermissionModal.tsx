import React, { useState, useEffect } from 'react';
import type { ConfirmedBooking } from '../types';
import Button from './common/Button';

interface NotificationPermissionModalProps {
  booking: ConfirmedBooking;
  onClose: () => void;
}

const NotificationPermissionModal: React.FC<NotificationPermissionModalProps> = ({ booking, onClose }) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check if Notifications API is supported and what the current permission is
    if ('Notification' in window) {
      setPermission(Notification.permission);
    } else {
        setPermission('denied'); // Treat as denied if not supported
    }
  }, []);

  const scheduleReminder = () => {
    const reminderTime = booking.scheduledTime.getTime() - (15 * 60 * 1000);
    const now = new Date().getTime();
    const delay = reminderTime - now;

    // Only schedule if the reminder time is in the future
    if (delay > 0) {
      setTimeout(() => {
        new Notification(`Reminder: Your call with ${booking.avatar.name}`, {
          body: `Your live call with ${booking.avatar.name} starts in 15 minutes!`,
          icon: '/favicon.svg', // Optional: Add an icon for the notification
        });
      }, delay);
    }
  };

  const handleRequestPermission = async () => {
    if (!('Notification' in window)) {
      alert("This browser does not support desktop notification.");
      return;
    }
    
    const status = await Notification.requestPermission();
    setPermission(status);

    if (status === 'granted') {
      scheduleReminder();
    }
  };
  
  const renderContent = () => {
    switch (permission) {
      case 'granted':
        return (
          <>
            <h2 className="font-serif text-3xl font-bold text-brand-primary mb-4">You're All Set!</h2>
            <p className="text-lg text-gray-300 mb-8">
              Great! We'll send you a notification 15 minutes before your call with {booking.avatar.name}.
            </p>
            <Button onClick={onClose} variant="primary" className="w-full">
              Awesome!
            </Button>
          </>
        );
      case 'denied':
        return (
          <>
            <h2 className="font-serif text-3xl font-bold text-brand-primary mb-4">Notifications Blocked</h2>
            <p className="text-lg text-gray-300 mb-8">
              You've disabled notifications. To get a reminder, you'll need to enable them in your browser settings for this site.
            </p>
            <Button onClick={onClose} variant="primary" className="w-full">
              Got It
            </Button>
          </>
        );
      default: // 'default'
        return (
          <>
            <h2 className="font-serif text-3xl font-bold text-brand-primary mb-4">Get a Reminder?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Would you like us to send you a notification 15 minutes before your call with {booking.avatar.name} starts?
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={handleRequestPermission} variant="primary" className="w-1/2">
                Yes, notify me
              </Button>
              <Button onClick={onClose} variant="outline" className="w-1/2">
                No, thanks
              </Button>
            </div>
          </>
        );
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
        {renderContent()}
      </div>
    </div>
  );
};

export default NotificationPermissionModal;