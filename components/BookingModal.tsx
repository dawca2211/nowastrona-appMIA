import React, { useState, useMemo } from 'react';
import type { Avatar, ConfirmedBooking } from '../types';
import Button from './common/Button';

interface BookingModalProps {
  avatar: Avatar;
  onClose: () => void;
  onInitiatePayment: (duration: number, scheduledTime: Date) => void;
  allBookings: ConfirmedBooking[];
}

const bookingOptions = [
  { duration: 15, price: 14.99 },
  { duration: 30, price: 24.99 },
  { duration: 60, price: 39.99 },
];

// Helper function to generate time slots
const generateTimeSlots = () => {
  const slots = [];
  const now = new Date();
  // Start from the next hour
  let startTime = new Date(now);
  startTime.setHours(now.getHours() + 1, 0, 0, 0);

  for (let i = 0; i < 24; i++) {
    const slotTime = new Date(startTime.getTime() + i * 30 * 60 * 1000);
    slots.push(slotTime);
  }
  return slots;
};

const BookingModal: React.FC<BookingModalProps> = ({ avatar, onClose, onInitiatePayment, allBookings }) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(15);
  
  // Memoize the set of booked times for efficient lookup
  const bookedTimes = useMemo(() =>
    new Set(allBookings.map(b => b.scheduledTime.getTime())),
    [allBookings]
  );
  
  const timeSlots = useMemo(() => generateTimeSlots(), []);
  
  // Set initial selected time to the first *available* slot
  const firstAvailableSlot = useMemo(() => 
    timeSlots.find(slot => !bookedTimes.has(slot.getTime())) || timeSlots[0],
    [timeSlots, bookedTimes]
  );
  const [selectedTime, setSelectedTime] = useState<Date>(firstAvailableSlot);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
      <div className="bg-brand-gray rounded-2xl shadow-2xl w-full max-w-lg text-center border border-brand-primary/30 relative p-8" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <img src={avatar.imageUrl} alt={avatar.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-brand-primary" />
        <h2 className="font-serif text-3xl font-bold text-brand-primary mb-2">Book a Call with {avatar.name}</h2>
        <p className="text-lg text-gray-300 mb-8">
          Select your desired session length and time.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {bookingOptions.map(opt => (
            <button 
              key={opt.duration} 
              onClick={() => setSelectedDuration(opt.duration)}
              className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 border-2 ${selectedDuration === opt.duration ? 'bg-brand-primary text-brand-dark border-brand-primary' : 'bg-transparent text-brand-primary border-brand-primary/50 hover:border-brand-primary'}`}
            >
              <span className="block text-lg">{opt.duration} min</span>
              <span className="text-xs">${opt.price.toFixed(2)}</span>
            </button>
          ))}
        </div>
        
        <div className="bg-brand-dark p-4 rounded-lg border border-brand-primary/20 mb-8">
            <p className="text-gray-400 text-sm mb-3">Select a date & time (unavailable slots are marked)</p>
            <div className="max-h-32 overflow-y-auto space-y-2 text-left pr-2">
                {timeSlots.map((time) => {
                    const isBooked = bookedTimes.has(time.getTime());
                    return (
                        <button
                            key={time.toISOString()}
                            onClick={() => setSelectedTime(time)}
                            disabled={isBooked}
                            className={`w-full text-left p-2 rounded-md transition-colors flex justify-between items-center ${
                              selectedTime.getTime() === time.getTime() && !isBooked 
                                ? 'bg-brand-primary text-brand-dark font-bold' 
                                : isBooked
                                ? 'bg-brand-dark/50 text-gray-500 cursor-not-allowed'
                                : 'hover:bg-brand-gray/80'
                            }`}
                        >
                            <span>
                                {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} - {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {isBooked && <span className="text-xs font-bold text-brand-secondary/80">BOOKED</span>}
                        </button>
                    );
                })}
            </div>
        </div>

        <Button onClick={() => onInitiatePayment(selectedDuration, selectedTime)} variant="primary" className="w-full text-lg">
          Confirm & Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default BookingModal;