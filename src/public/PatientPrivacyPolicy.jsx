import React from 'react';
import { Link } from 'react-router-dom';

function PatientPrivacyPolicy() {

  return (
    <div className="staff privacy flex">
       <div className='cover w-8/12 max-lg:hidden'></div>
      <div className='w-8/12 form-row p-4 max-lg:w-full'>/
        <h1 className='mt-16 flex items-center'><Link to="/"><img src="/img/logo.png" alt="" /></Link></h1>

        <h1>Patient Privacy Policy</h1>
        <p>Your privacy is important to us. This Patient Privacy Policy outlines how DocLocat handles and protects your personal information when you use our platform.</p>

        <h3 className='text-xl m-4'>Information We Collect</h3>
        <p>We collect the following types of personal information when you use DocLocat:</p>
        <ul>
          <li>Contact information (such as name, email address, phone number)</li>
          <li>Demographic information (such as age, gender, location)</li>
          <li>Health-related information (only if provided voluntarily)</li>
        </ul>

        <h3 className='text-xl m-4'>How We Use Your Information</h3>
        <p>We use the collected information for the following purposes:</p>
        <ul>
          <li>Providing and improving our services</li>
          <li>Communicating with you about your appointments and updates</li>
          <li>Personalizing your experience on DocLocat</li>
          <li>Responding to your inquiries and requests</li>
          <li>Complying with legal and regulatory requirements</li>
        </ul>

        <h3 className='text-xl m-4'>Information Sharing</h3>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent. However, we may share your information with trusted service providers who assist us in operating our website and providing services to you.</p>

        <h3 className='text-xl m-4'>Security Measures</h3>
        <p>We take appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.</p>

        <h3 className='text-xl m-4'>Changes to this Policy</h3>
        <p>We reserve the right to update or modify this Patient Privacy Policy at any time. Any changes will be effective immediately upon posting the updated policy on this page.</p>

        <h3 className='text-xl m-4'>Contact Us</h3>
        <p>If you have any questions or concerns about our Patient Privacy Policy, please contact us at <a href="mailto:privacy@doclocat.com">privacy@doclocat.com</a>.</p>

      </div>
    </div>
  );
}

export default PatientPrivacyPolicy;
