import React from 'react';
import SubscriptionPlanCard from './SubscriptionPlanCard';

interface SubscriptionModalProps {
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose }) => {

  const handleSubscribeClick = () => {
    // In a real application, this would call a backend endpoint
    // to create a Stripe Checkout session and redirect the user.
    alert('Redirecting to Stripe Checkout...');
    // Example: window.location.href = stripeCheckoutUrl;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fade-in p-4" onClick={onClose}>
      <div className="bg-brand-gray rounded-2xl shadow-2xl w-full max-w-md text-center border border-brand-primary/30 relative p-8" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        <h2 className="font-serif text-4xl font-bold text-brand-primary mb-4">Unlock Full Access</h2>
        <p className="text-lg text-gray-300 mb-10">
          Choose a plan to get unlimited access to my private world. Your journey begins here.
        </p>

        <SubscriptionPlanCard
          name="FlirtChat Subscription"
          price="$19.99"
          description="Monthly Access"
          onSubscribe={handleSubscribeClick}
          isFeatured={true}
        />
      </div>
    </div>
  );
};

export default SubscriptionModal;