import React, { useState } from 'react';
import moroccanCities from '../utils/moroccanCities.json';
import categories from '../utils/categories.json';

export default function Header({ onSearch }) {
  const [doctorName, setDoctorName] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    const searchData = {
      name: doctorName,
      city: selectedCity,
      category: selectedCategory,
    };

    onSearch(searchData);
  };

  return (
    <div className='header-content flex flex-col items-center'>
      
      <div className='w-4/6 mt-32 mb-10 max-md:w-5/6'>
        <h1 className='text-xl'>
          Unlocking the healing touch you seek, we are the compass guiding you
          to the finest doctors in your city.
        </h1>
        <h4 className='mt-10 text-sm'>
          Navigating the maze of healthcare options can feel overwhelming,
          especially in moments of urgency. When every second counts, finding
          the perfect doctor is pivotal. Amidst a sea of choices, let us be
          your trusted lighthouse, illuminating the path to precise care
        </h4>
      </div>
      <form onSubmit={handleSearch} className='w-5/6 gap-2 flex my-20 max-lg:flex-col'>
        <div className='input-group gap-4 flex items-center w-full'>
          <input
            type='text'
            placeholder='Doctor Name'
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </div>
        <div className='input-group gap-4 flex items-center w-full'>
          <select
            name='citySelect'
            id='citySelect'
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value=''>Select a city</option>
            {moroccanCities.PopularMoroccanCities.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div className='input-group gap-4 flex items-center w-full'>
          <select
            name='category'
            id='category'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value=''>Select a category</option>
            {categories.categories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className='input-group gap-4 flex items-center w-full'>
          <button type='submit' className='w-full'>Find A Doctor</button>
        </div>
      </form>
    </div>
  );
}
