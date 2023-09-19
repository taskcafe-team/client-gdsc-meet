'use client';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

const CurrentTime: React.FC = (props) => {
  const [currentTime, setCurrentTime] = useState(moment());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="text-gray-700 font-roboto text-4xl font-normal dark:text-white transition">
      {currentTime.format('HH:mm ddd, DD MMM')}
    </div>
  );
};

export default CurrentTime;
