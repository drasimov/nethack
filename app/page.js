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
      <p>Welcome to the <span className="serifBold big"><span className="cWhite">2nd Annual</span> <span className="cGreen">BIBS·C Network Hackathon</span></span>.</p>
      <hr/>
      <p className="cBlue">We are all about <span className="serifBold">understanding</span> and <span className="serifBold">applying</span> technology. In a Hackathon, you are given limited time to draw on your skills and produce an original product. Your product may be focused on anything from programming to hardware to art - so long as it answers the competition's prompts.</p>
      <p className="cYellow">The 2025 Competition is starting soon! Register <a className="serifBold link" href="https://forms.office.com/r/MW52EW7LSU">here</a>.</p>
      <center className="console">
        <Countdown key={0} targetDate={countdownDates[0]} label="Registration Closes"/>
        <Countdown key={1} targetDate={countdownDates[1]} label="Prompts Release"/>
        <Countdown key={2} targetDate={countdownDates[2]} label="Submission Closes"/>
      </center>
    </div>
  );
};

export default Home;