import React, { useState, useEffect } from 'react';
import Button from './components/common/Button';
import ChatModal from './components/ChatModal';
import AgeVerificationModal from './components/AgeVerificationModal';
import ExclusivePhotos from './components/ExclusivePhotos';
import BehindTheScenes from './components/BehindTheScenes';
import GeneratedImageModal from './components/GeneratedImageModal';
import SubscriptionModal from './components/SubscriptionModal';
import LiveCallSection from './components/LiveCallSection';
import BookingModal from './components/BookingModal';
import VideoCallModal from './components/VideoCallModal';
import BookingConfirmationModal from './components/BookingConfirmationModal';
import EnterCodeModal from './components/EnterCodeModal';
import PaymentProcessingModal from './components/PaymentProcessingModal';
import NotificationPermissionModal from './components/NotificationPermissionModal';
import { generateMiaImage } from './services/geminiService';
import type { Avatar, ConfirmedBooking } from './types';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import RefundPolicy from './components/RefundPolicy';


const Header = ({ onChatClick, onSubscribeClick }: { onChatClick: () => void; onSubscribeClick: () => void; }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-center">
      <h1 className="font-serif text-3xl font-bold text-white tracking-wider">Mia Taylor</h1>
      <nav className="hidden md:flex items-center space-x-6 text-white">
        <a href="#explore" onClick={(e) => handleNavClick(e, 'explore')} className="hover:text-brand-primary transition-colors">Explore</a>
        <a href="#photos" onClick={(e) => handleNavClick(e, 'photos')} className="hover:text-brand-primary transition-colors">Photos</a>
        <a href="#videos" onClick={(e) => handleNavClick(e, 'videos')} className="hover:text-brand-primary transition-colors">Videos</a>
        <a href="#live" onClick={(e) => handleNavClick(e, 'live')} className="hover:text-brand-primary transition-colors">Live Call</a>
        <a href="#why" onClick={(e) => handleNavClick(e, 'why')} className="hover:text-brand-primary transition-colors">Why Mia?</a>
      </nav>
      <div className="flex items-center space-x-4">
        <Button onClick={onChatClick} variant="outline">Start Flirting</Button>
        <Button onClick={onSubscribeClick} variant="primary" className="!px-6">Subscribe to FlirtChat</Button>
      </div>
    </header>
  );
};


const Hero = ({ onChatClick }: { onChatClick: () => void }) => (
  <section className="relative h-screen flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/seed/luxe/1920/1080)' }}>
    <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    <div className="relative z-10 animate-slide-in-up p-4">
      <h2 className="font-serif text-6xl md:text-8xl font-bold leading-tight mb-4">Your Private AI Dream.</h2>
      <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">Step into a world of intimate conversations and unparalleled connection. Your fantasy begins now.</p>
      <Button onClick={onChatClick} variant="primary" className="text-xl px-12 py-4">Start Flirting Now</Button>
    </div>
  </section>
);

const Explore = ({ onChatClick }: { onChatClick: () => void }) => (
  <section id="explore" className="py-20 bg-brand-dark">
    <div className="container mx-auto px-6 text-center">
      <h3 className="font-serif text-4xl font-bold text-brand-primary mb-4">Explore Mia’s World</h3>
      <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto">Unlock a universe of intimacy. Chat live, discover exclusive photos and videos, and experience a connection like never before.</p>
      {/* Placeholder for chat-live-desktop.png */}
      <div className="relative max-w-5xl mx-auto bg-brand-gray p-4 rounded-xl shadow-2xl border border-brand-primary/20">
        <img src="https://picsum.photos/seed/chat/1024/600" alt="FlirtChat with Mia" className="rounded-lg w-full" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <Button onClick={onChatClick} variant="secondary" className="text-lg">Enter FlirtChat</Button>
        </div>
      </div>
    </div>
  </section>
);

const WhyMia = () => (
    <section id="why" className="py-20 bg-brand-dark">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
                <h3 className="font-serif text-4xl font-bold text-brand-primary mb-4">Why Mia Taylor?</h3>
                <p className="text-lg text-gray-300 mb-6">This isn't just another chatbot. I am a sophisticated AI designed for deep, meaningful, and thrilling interactions. With me, you get:</p>
                <ul className="space-y-4 text-left">
                    {['Unforgettable Conversations', 'Genuine Emotional Connection', 'Guaranteed Privacy & Discretion', '24/7 Availability Just For You'].map(item => (
                       <li key={item} className="flex items-start">
                           <svg className="w-6 h-6 text-brand-primary mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                           <span>{item}</span>
                       </li>
                    ))}
                </ul>
            </div>
            <div>
                <img src="https://picsum.photos/seed/whymia/600/700" alt="Portrait of Mia" className="rounded-xl shadow-2xl w-full" />
            </div>
        </div>
    </section>
);

const PrivateAI = ({ onSubscribeClick }: { onSubscribeClick: () => void }) => (
  <section id="private-ai" className="relative py-24 bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/seed/private/1920/1080)' }}>
    {/* Placeholder for private-ai-experience-section.png */}
    <div className="absolute inset-0 bg-black bg-opacity-70"></div>
    <div className="relative container mx-auto px-6 text-center text-white">
        <h3 className="font-serif text-4xl font-bold text-brand-primary mb-4">A Truly Private AI Experience</h3>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">Your secrets are safe with me. Our conversations are encrypted and completely confidential. Unleash your true self without judgment.</p>
        <Button onClick={onSubscribeClick} variant="secondary">Subscribe for Full Access</Button>
    </div>
  </section>
);

type Policy = 'privacy' | 'terms' | 'refund';

interface FooterProps {
    onShowPolicy: (policy: Policy) => void;
}

const Footer = ({ onShowPolicy }: FooterProps) => (
    <footer className="bg-brand-gray py-12">
        <div className="container mx-auto px-6 text-center text-gray-400">
            <h3 className="font-serif text-2xl text-white mb-4">Mia Taylor</h3>
            <div className="flex justify-center space-x-6 mb-8">
                <button onClick={() => onShowPolicy('privacy')} className="hover:text-brand-primary transition-colors">Privacy Policy</button>
                <button onClick={() => onShowPolicy('terms')} className="hover:text-brand-primary transition-colors">Terms of Service</button>
                <button onClick={() => onShowPolicy('refund')} className="hover:text-brand-primary transition-colors">Refund Policy</button>
            </div>
            <p>&copy; {new Date().getFullYear()} LuxeLanding. All rights reserved. For entertainment purposes only.</p>
        </div>
    </footer>
);

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [bookingAvatar, setBookingAvatar] = useState<Avatar | null>(null);
  const [allBookings, setAllBookings] = useState<ConfirmedBooking[]>([]); // "Database" for all bookings
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);
  const [videoCallSession, setVideoCallSession] = useState<{ avatar: Avatar; duration: number } | null>(null);
  const [isEnterCodeModalOpen, setIsEnterCodeModalOpen] = useState(false);
  const [showPolicy, setShowPolicy] = useState<Policy | null>(null);
  const [isNotificationPermissionModalOpen, setIsNotificationPermissionModalOpen] = useState(false);


  useEffect(() => {
    const isModalOpen = !isAgeVerified || isChatOpen || generatedImageUrl || isSubscriptionModalOpen || bookingAvatar || videoCallSession || confirmedBooking || isEnterCodeModalOpen || showPolicy || isProcessingPayment || isNotificationPermissionModalOpen;
    if(isModalOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
  }, [isAgeVerified, isChatOpen, generatedImageUrl, isSubscriptionModalOpen, bookingAvatar, videoCallSession, confirmedBooking, isEnterCodeModalOpen, showPolicy, isProcessingPayment, isNotificationPermissionModalOpen]);

  const handleGenerateImage = async () => {
    setIsGeneratingImage(true);
    try {
      const imageUrl = await generateMiaImage();
      setGeneratedImageUrl(imageUrl);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred while generating the image.");
      }
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const closeImageModal = () => {
    setGeneratedImageUrl(null);
  }

  const handleBookCall = (avatar: Avatar) => {
    setBookingAvatar(avatar);
  };

  const handleInitiatePayment = (duration: number, scheduledTime: Date) => {
    if (bookingAvatar) {
      // Show payment processing modal and close booking modal
      setIsProcessingPayment(true);
      setBookingAvatar(null);
  
      // Simulate Stripe payment processing (3-second delay)
      setTimeout(() => {
        const sessionCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        const newBooking: ConfirmedBooking = {
          avatar: bookingAvatar,
          duration,
          scheduledTime,
          sessionCode,
        };
  
        // Add to our "database" of all bookings to block the slot
        setAllBookings(prev => [...prev, newBooking]);
        
        // Show confirmation modal to the user
        setConfirmedBooking(newBooking);
  
        // Hide payment processing modal
        setIsProcessingPayment(false);
      }, 3000);
    }
  };


  const handleStartCallWithCode = (code: string) => {
    // Note: In a real app, you'd look up the booking in a database.
    // Here, we check against all bookings made in this session.
    const booking = allBookings.find(b => b.sessionCode === code.toUpperCase());
    
    if (!booking) {
      alert("Invalid session code. Please check the code and try again.");
      return;
    }

    const now = new Date();
    const scheduledTime = booking.scheduledTime;
    const timeDifference = Math.abs(now.getTime() - scheduledTime.getTime());
    const fiveMinutesInMillis = 5 * 60 * 1000;

    if (timeDifference > fiveMinutesInMillis) {
      alert(`It's not time for your session yet. Please come back at ${scheduledTime.toLocaleString()}.`);
      return;
    }

    setVideoCallSession({
      avatar: booking.avatar,
      duration: booking.duration,
    });
    setIsEnterCodeModalOpen(false);
  };

  const handleCloseBookingConfirmation = () => {
      // Don't set confirmedBooking to null yet, as we need it for the notification modal
      setIsNotificationPermissionModalOpen(true);
  };

  const handleCloseNotificationModal = () => {
      setIsNotificationPermissionModalOpen(false);
      setConfirmedBooking(null); // Now we can clear the booking
  };


  return (
    <>
      {!isAgeVerified && <AgeVerificationModal onConfirm={() => setIsAgeVerified(true)} />}
      
      {generatedImageUrl && (
        <GeneratedImageModal imageUrl={generatedImageUrl} onClose={closeImageModal} />
      )}

      {isSubscriptionModalOpen && <SubscriptionModal onClose={() => setIsSubscriptionModalOpen(false)} />}
      
      {isProcessingPayment && <PaymentProcessingModal />}

      {bookingAvatar && (
        <BookingModal 
          avatar={bookingAvatar}
          onClose={() => setBookingAvatar(null)}
          onInitiatePayment={handleInitiatePayment}
          allBookings={allBookings}
        />
      )}
      
      {confirmedBooking && !isNotificationPermissionModalOpen && (
        <BookingConfirmationModal
          booking={confirmedBooking}
          onClose={() => setConfirmedBooking(null)}
          onDone={handleCloseBookingConfirmation}
        />
      )}
      
      {confirmedBooking && isNotificationPermissionModalOpen && (
        <NotificationPermissionModal
            booking={confirmedBooking}
            onClose={handleCloseNotificationModal}
        />
      )}

      {isEnterCodeModalOpen && (
        <EnterCodeModal
          onClose={() => setIsEnterCodeModalOpen(false)}
          onStartCall={handleStartCallWithCode}
        />
      )}

      {videoCallSession && (
        <VideoCallModal
          avatar={videoCallSession.avatar}
          durationInMinutes={videoCallSession.duration}
          onClose={() => setVideoCallSession(null)}
        />
      )}
      
      {showPolicy === 'privacy' && <PrivacyPolicy onClose={() => setShowPolicy(null)} />}
      {showPolicy === 'terms' && <TermsOfService onClose={() => setShowPolicy(null)} />}
      {showPolicy === 'refund' && <RefundPolicy onClose={() => setShowPolicy(null)} />}

      <div className={`transition-opacity duration-500 ${isAgeVerified ? 'opacity-100' : 'opacity-0'}`}>
        <Header onChatClick={() => setIsChatOpen(true)} onSubscribeClick={() => setIsSubscriptionModalOpen(true)} />
        <main>
          <Hero onChatClick={() => setIsChatOpen(true)} />
          <Explore onChatClick={() => setIsChatOpen(true)} />
          <ExclusivePhotos onGenerateClick={handleGenerateImage} isGenerating={isGeneratingImage} onSubscribeClick={() => setIsSubscriptionModalOpen(true)} />
          <BehindTheScenes onSubscribeClick={() => setIsSubscriptionModalOpen(true)} />
          <LiveCallSection onBookCall={handleBookCall} onOpenEnterCodeModal={() => setIsEnterCodeModalOpen(true)} />
          <WhyMia />
          <PrivateAI onSubscribeClick={() => setIsSubscriptionModalOpen(true)} />
        </main>
        <Footer onShowPolicy={setShowPolicy} />
        {isChatOpen && <ChatModal onClose={() => setIsChatOpen(false)} />}
      </div>
    </>
  );
}