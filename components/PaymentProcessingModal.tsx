import React from 'react';

const PaymentProcessingModal: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center animate-fade-in p-4">
      <div className="bg-brand-gray rounded-lg shadow-2xl p-8 max-w-md text-center border border-brand-primary/30">
        <h2 className="font-serif text-3xl font-bold text-brand-primary mb-4">Processing Payment</h2>
        <div className="flex justify-center items-center my-8">
            <svg className="animate-spin h-16 w-16 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
        <p className="text-lg text-brand-light mb-2">
            Connecting to Stripe...
        </p>
        <p className="text-md text-gray-400">
            Please wait while we securely process your payment. Do not close this window or refresh the page.
        </p>
      </div>
    </div>
  );
};

export default PaymentProcessingModal;