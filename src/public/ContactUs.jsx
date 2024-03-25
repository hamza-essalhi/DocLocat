
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

function ContactUs() {
 
  return (
    <div className="staff contact-us flex">
       <div className='cover w-8/12 max-lg:hidden'></div>
      <div className='w-8/12 form-row p-4 max-lg:w-full'>/
        <h1 className=' mt-16 max-sm:!text-lg'>Contact Us</h1>
        <div className="flex flex-col gap-5 mb-10">
          <div className="flex items-center gap-3">
            <FaEnvelope className="icon" />
            <p className='max-sm:!text-sm'>Email: <a href="mailto:contact@alxwebstack.com"  className='max-sm:!text-sm'>contact@doclocat.com</a></p>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="icon" />
            <p className='max-sm:!text-sm'>Address: 1234 Example Street, City, State, ZIP</p>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="icon" />
            <p className='max-sm:!text-sm'>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
        <div className="contact-form">
          
          <form>
          <h1 className=' mt-16 max-sm:!text-lg'>Send Us a Message</h1>

            <div className="input-group flex items-center my-5">
              <label  className='max-sm:!text-sm' htmlFor="name">Your Name</label>
              <input className='max-sm:!text-sm' type="text" id="name" name="name" placeholder='Make Robert' required />
            </div>
            <div className="input-group flex items-center my-5">
              <label  className='max-sm:!text-sm' htmlFor="email">Your Email</label>
              <input className='max-sm:!text-sm' type="email" id="email" name="email" placeholder='name@example.com' required />
            </div>
            <div className="input-group flex items-start my-5">
              <label  className='max-sm:!text-sm' htmlFor="message">Message</label>
              <textarea className='h-32 max-sm:!text-sm' id="message" name="message"  placeholder='text...' required></textarea>
            </div>
            <div className="input-group flex justify-end items-center my-5">
              <button type="submit" className="btn max-sm:!text-sm">Send Message</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
