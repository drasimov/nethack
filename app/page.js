// pages/index.js
import React from 'react';
import Countdown from '@/components/Countdown';

const Home = () => {
  const countdownDates = [
    '2025-02-16T15:59:59Z', 
    '2025-02-17T08:59:59Z', 
    '2025-02-23T23:59:59Z',
  ];

  return (
    <div>
      <center>
        <Countdown key={0} targetDate={countdownDates[0]} label="Registration Closes"/>
        <Countdown key={1} targetDate={countdownDates[1]} label="Prompts Release"/>
        <Countdown key={2} targetDate={countdownDates[2]} label="Submissions Close"/>
      </center>
    </div>
  );
};

export default Home;