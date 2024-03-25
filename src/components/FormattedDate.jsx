import React from 'react';
import { format } from 'date-fns';

export function FormattedDate({ dateString }) {
  // Format the date using `date-fns` library
  const formattedDate = format(new Date(dateString), 'yyyy-MM-dd');

  return <span>{formattedDate}</span>;
}

export function FormattedHour({ dateString }) {
  // Format the date using `date-fns` library
  const formattedHour = format(new Date(dateString), 'HH:mm:ss');

  return <span>{formattedHour}</span>;
}
