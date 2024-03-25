import React  from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  
  return (
    <div className="staff privacy flex">
       <div className='cover w-8/12 max-lg:hidden'></div>
      <div className='w-8/12 form-row p-4 max-lg:w-full '>/
        <h1 className='mt-16 flex items-center'><Link to="/"><img src="/img/logo.png" alt="" /></Link></h1>
        <h1>Privacy Policy</h1>
        <p>Your privacy is important to us. This Privacy Policy outlines how DocLocat ("us", "we", or "our") collects, uses, and protects your personal information when you use our website and services.</p>

        <h3 className='text-xl m-4'>Information We Collect</h3>
        <p>We collect the following types of personal information when you use DocLocat:</p>
        <ul>
          <li>Contact information (such as name, email address, phone number)</li>
          <li>Demographic information (such as age, gender, location)</li>
          <li>Usage data (such as pages visited, interactions with the website)</li>
          <li>Device information (such as browser type, IP address, device identifiers)</li>
        </ul>

        <h3 className='text-xl m-4'>How We Use Your Information</h3>
        <p>We use the collected information for the following purposes:</p>
        <ul>
          <li>Providing and improving our website and services</li>
          <li>Personalizing your experience on DocLocat</li>
          <li>Communicating with you about updates, promotions, and news</li>
          <li>Analyzing website usage and trends</li>
          <li>Responding to your inquiries and requests</li>
        </ul>

        <h3 className='text-xl m-4'>Information Sharing</h3>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent. However, we may share your information with trusted service providers who assist us in operating our website and providing services to you.</p>

        <h3 className='text-xl m-4'>Security Measures</h3>
        <p>We take appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure.</p>

        <h3 className='text-xl m-4'>Cookies</h3>
        <p>DocLocat uses cookies to enhance your browsing experience. You can choose to disable cookies in your browser settings, but this may affect the functionality of the website.</p>

        <h3 className='text-xl m-4'>Changes to this Policy</h3>
        <p>We reserve the right to update or modify this Privacy Policy at any time. Any changes will be effective immediately upon posting the updated policy on this page.</p>

        <h3 className='text-xl m-4'>Contact Us</h3>
        <p>If you have any questions or concerns about our Privacy Policy, please contact us at <a href="mailto:privacy@doclocat.com">privacy@doclocat.com</a>.</p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
