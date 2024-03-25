import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

function CustomCalendar({ initialDate }) {
  const [date, setDate] = useState(new Date(initialDate));

  const onChange = (newDate) => {
    setDate(newDate);
   
  };

  return (
    <div>
      <Calendar
        onChange={onChange}
        value={date}
        prev2Label={<FaAngleDoubleLeft/>}
        prevLabel={<FaChevronLeft />}
        next2Label={<FaAngleDoubleRight />}
        nextLabel={<FaChevronRight />}
      />
    </div>
  );
}

export default CustomCalendar;