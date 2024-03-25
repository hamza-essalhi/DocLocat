
import { Link } from 'react-router-dom';

function AboutUs() {

  return (
    <div className="staff about-us flex">
      <div className='cover w-8/12 max-lg:hidden'></div>
      <div className='w-8/12 form-row p-4 max-lg:w-full'>/
        <h1 className='mt-16 flex items-center'><Link to="/"><img src="/img/logo.png" alt="" /></Link></h1>
        <p>Welcome to DocLocat, your trusted companion in finding the right healthcare professional for your needs. Our platform is designed to simplify the process of locating and scheduling appointments with top-tier doctors, ensuring you receive the care you deserve when you need it most.</p>

        <div className="mission-section">
          <h3 className='text-xl m-4'>Our Mission</h3>
          <p>At DocLocat, our mission is to empower patients by providing a seamless and intuitive experience for discovering healthcare providers. We believe that everyone should have access to quality medical care, and we strive to bridge the gap between patients and doctors through innovative technology.</p>
        </div>

        <div className="how-we-help">
          <h3 className='text-xl m-4'>How We Help</h3>
          <ul>
            <li><strong>Find the Perfect Doctor:</strong> Whether you're looking for a primary care physician, a specialist, or a healthcare facility, DocLocat makes it easy to discover the right match based on your preferences.</li>
            <li><strong>Book Appointments with Ease:</strong> Say goodbye to long waiting times on hold. With DocLocat, you can schedule appointments directly through our platform, saving you time and hassle.</li>
            <li><strong>Personalized Recommendations:</strong> Our smart algorithm learns from your search history and preferences to provide personalized recommendations, ensuring you find the best healthcare options tailored to your needs.</li>
          </ul>
        </div>

        <div className="meet-the-team">
          <h3 className='text-xl m-4'>Meet Our Team</h3>

        </div>


        <p>Thank you for choosing DocLocat for your healthcare needs. We're committed to helping you find the right doctor, right here, right now.</p>
      </div>
    </div>
  );
}

export default AboutUs;
