import React from 'react';
import Button from './common/Button';

interface SubscriptionPlanCardProps {
  name: string;
  price: string;
  description: string;
  onSubscribe: () => void;
  isFeatured?: boolean;
}

const SubscriptionPlanCard: React.FC<SubscriptionPlanCardProps> = ({ name, price, description, onSubscribe, isFeatured = false }) => {
  const cardClasses = `bg-brand-dark p-8 rounded-xl shadow-lg border ${isFeatured ? 'border-brand-primary' : 'border-brand-primary/20'} flex flex-col items-center transform transition-transform hover:-translate-y-2 relative`;

  return (
    <div className={cardClasses}>
      {isFeatured && (
        <div className="absolute top-0 -translate-y-1/2 px-4 py-1 bg-brand-primary text-brand-dark font-semibold text-sm rounded-full">
          Most Popular
        </div>
      )}
      <h3 className="font-sans text-2xl font-semibold mb-2 text-white">{name}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <span className="font-serif text-5xl font-bold text-brand-primary mb-6">
        {price}
        <span className="text-lg font-sans text-gray-400">/month</span>
      </span>
      <ul className="space-y-3 text-gray-300 mb-8 text-left">
          {['Unlimited AI Chat', 'Access to Private Gallery', 'Priority Support', 'Exclusive Content Drops'].map(item => (
            <li key={item} className="flex items-center">
                <svg className="w-5 h-5 text-brand-secondary mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span>{item}</span>
            </li>
          ))}
      </ul>
      <Button onClick={onSubscribe} variant={isFeatured ? 'primary' : 'outline'} className="w-full mt-auto">
        Subscribe Now
      </Button>
    </div>
  );
};

export default SubscriptionPlanCard;