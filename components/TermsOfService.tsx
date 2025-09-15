import React from 'react';
import PolicyModal from './common/PolicyModal';

const PolicyText = () => (
  <>
    <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    
    <h3>1. Agreement to Terms</h3>
    <p>By accessing or using our Service, you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.</p>
    
    <h3>2. Eligibility</h3>
    <p>You must be at least 18 years of age to use this Service. By using the Service, you represent and warrant that you are of legal age to form a binding contract.</p>

    <h3>3. Description of Service</h3>
    <p>The Service provides an AI-powered chat experience, exclusive media content, and live video call bookings ("Services") for entertainment purposes only. The AI's responses are generated and fictional; they should not be taken as factual or as professional advice. The Service is not a substitute for real human companionship or professional advice.</p>
    
    <h3>4. User Responsibilities</h3>
    <p>You agree not to use the Service:</p>
    <ul>
      <li>For any illegal or unauthorized purpose.</li>
      <li>To harass, abuse, or harm another person.</li>
      <li>To transmit any content that is obscene, offensive, or otherwise objectionable.</li>
      <li>To solicit personal information from anyone under the age of 18.</li>
    </ul>
    <p>You are solely responsible for your conduct and any data, text, files, information, usernames, images, graphics, photos, profiles, audio and video clips, sounds, musical works, works of authorship, applications, links and other content or materials that you submit, post or display on or via the Service.</p>
    
    <h3>5. Subscriptions and Payments</h3>
    <p>Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. Subscriptions automatically renew unless canceled before the renewal date. You can manage your subscription through your account settings. All payments are non-refundable, as detailed in our Refund Policy.</p>
    
    <h3>6. Intellectual Property</h3>
    <p>The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of LuxeLanding and its licensors. The persona "Mia Taylor" and all associated content are a creative work and our intellectual property.</p>
    
    <h3>7. Termination</h3>
    <p>We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
    
    <h3>8. Disclaimer of Warranties</h3>
    <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We make no warranties, expressed or implied, regarding the operation or availability of the Service, or the information, content, and materials included therein.</p>
    
    <h3>9. Limitation of Liability</h3>
    <p>In no event shall LuxeLanding, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>

    <h3>10. Contact Us</h3>
    <p>If you have any questions about these Terms, please contact us at: <a href="mailto:support@luxelanding.dev">support@luxelanding.dev</a></p>
  </>
);

interface TermsOfServiceProps {
  onClose: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onClose }) => {
  return (
    <PolicyModal title="Terms of Service" onClose={onClose}>
      <PolicyText />
    </PolicyModal>
  );
};

export default TermsOfService;
