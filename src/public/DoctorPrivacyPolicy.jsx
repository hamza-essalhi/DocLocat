import React from 'react';
import { Link } from 'react-router-dom';

function DoctorPrivacyPolicy() {
  
  return (
    <div className="staff privacy flex">
       <div className='cover w-8/12 max-lg:hidden'></div>
      <div className='w-8/12 form-row p-4 max-lg:w-full'>/
        <h1 className='mt-16 flex items-center'><Link to="/"><img src="/img/logo.png" alt="" /></Link></h1>
        <h1>Doctor Privacy Policy</h1>
        <p>Your privacy is important to us. This Doctor Privacy Policy outlines how ALX Webstack handles and protects your personal information as a doctor using our platform.</p>

        <h3 className='text-xl m-4'>Information We Collect</h3>
        <p>We collect the following types of personal information when you use ALX Webstack as a doctor:</p>
        <ul>
          <li>Contact information (such as name, email address, phone number)</li>
          <li>Professional information (such as medical qualifications, specialty, practice information)</li>
          <li>Communication records with patients and colleagues</li>
        </ul>

        <h3 className='text-xl m-4'>How We Use Your Information</h3>
        <p>We use the collected information for the following purposes:</p>
        <ul>
          <li>Facilitating appointments and consultations with patients</li>
          <li>Managing your professional profile on ALX Webstack</li>
          <li>Communicating with patients and colleagues about appointments and medical inquiries</li>
          <li>Improving our services and platform for doctors</li>
        </ul>

        <h3 className='text-xl m-4'>Information Sharing</h3>
        <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent. However, we may share your information with trusted service providers who assist us in operating our website and providing services to you.</p>

        <h3 className='text-xl m-4'>Security Measures</h3>
        <p>We take appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.</p>

        <h3 className='text-xl m-4'>Retention of Information</h3>
        <p>We will retain your personal information for as long as necessary to fulfill the purposes outlined in this Doctor Privacy Policy, unless a longer retention period is required or permitted by law.</p>

        <h3 className='text-xl m-4'>Changes to this Policy</h3>
        <p>We reserve the right to update or modify this Doctor Privacy Policy at any time. Any changes will be effective immediately upon posting the updated policy on this page.</p>

        <h3 className='text-xl m-4'>Contact Us</h3>
        <p>If you have any questions or concerns about our Doctor Privacy Policy, please contact us at <a href="mailto:doctorprivacy@alxwebstack.com">doctorprivacy@alxwebstack.com</a>.</p>

      </div>
    </div>
  );
}

export default DoctorPrivacyPolicy;
