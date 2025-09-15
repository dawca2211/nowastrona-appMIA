import React from 'react';
import PolicyModal from './common/PolicyModal';

const PolicyText = () => (
  <>
    <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

    <h3>Our Policy</h3>
    <p>Due to the digital nature of our services, all purchases made on the Mia Taylor platform are final and non-refundable. This applies to all subscription fees, payments for live video call sessions, and any other one-time purchases.</p>
    <p>When you make a purchase, you are granted immediate access to the content or service. Because of this immediate access and the digital format, we cannot offer refunds, exchanges, or cancellations once a purchase is made.</p>

    <h3>Subscription Cancellations</h3>
    <p>You can cancel your subscription at any time to prevent future charges. To do so, please follow the cancellation procedure in your account settings. Upon cancellation, your access to subscription-based services will continue until the end of your current billing period. No partial or pro-rated refunds will be issued for the remaining portion of the billing period.</p>
    
    <h3>Exceptional Circumstances</h3>
    <p>We may consider refunds on a case-by-case basis only in situations involving verified technical errors or failures on our part that prevent you from accessing the service you purchased. Such decisions are at our sole discretion. To be considered, you must report the issue to our support team within 48 hours of the transaction.</p>
    
    <h3>Billing Issues</h3>
    <p>If you have any questions about your billing or believe there has been an error, please contact our support team immediately. We are committed to resolving any discrepancies promptly.</p>
    
    <h3>Contact Us</h3>
    <p>For any questions regarding this Refund Policy, please contact us at: <a href="mailto:support@luxelanding.dev">support@luxelanding.dev</a></p>
  </>
);

interface RefundPolicyProps {
  onClose: () => void;
}

const RefundPolicy: React.FC<RefundPolicyProps> = ({ onClose }) => {
  return (
    <PolicyModal title="Refund Policy" onClose={onClose}>
      <PolicyText />
    </PolicyModal>
  );
};

export default RefundPolicy;
