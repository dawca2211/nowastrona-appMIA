import React from 'react';
import PolicyModal from './common/PolicyModal';

const PolicyText = () => (
  <>
    <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    
    <h3>Introduction</h3>
    <p>Welcome to Mia Taylor ("we," "us," or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services (the "Service"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Service.</p>

    <h3>Information We Collect</h3>
    <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
    <ul>
      <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This is primarily limited to information required for payment processing.</li>
      <li><strong>Conversation Data:</strong> All messages, prompts, and content you share during your conversations with our AI are collected to provide and improve the service. These conversations are treated as confidential.</li>
      <li><strong>Usage Data:</strong> We may automatically collect information about your access to and use of the Service, such as your IP address, browser type, operating system, and dates/times of access.</li>
    </ul>

    <h3>How We Use Your Information</h3>
    <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you to:</p>
    <ul>
      <li>Create and manage your account.</li>
      <li>Process your payments and subscriptions.</li>
      <li>Improve the AI's performance and personalize its responses.</li>
      <li>Monitor and analyze usage and trends to improve your experience with the Service.</li>
      <li>Ensure the security of our platform and prevent fraudulent activities.</li>
    </ul>

    <h3>Data Security</h3>
    <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

    <h3>Data Retention</h3>
    <p>We will retain your information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.</p>

    <h3>Third-Party Services</h3>
    <p>We use a third-party payment processor (e.g., Stripe) to handle all payments. We do not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy.</p>
    
    <h3>Your Rights</h3>
    <p>You have the right to request access to the personal data we hold about you, to have any inaccuracies corrected, and to request deletion of your personal data. To make such a request, please contact us.</p>
    
    <h3>Contact Us</h3>
    <p>If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:support@luxelanding.dev">support@luxelanding.dev</a></p>
  </>
);

interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {
  return (
    <PolicyModal title="Privacy Policy" onClose={onClose}>
      <PolicyText />
    </PolicyModal>
  );
};

export default PrivacyPolicy;
