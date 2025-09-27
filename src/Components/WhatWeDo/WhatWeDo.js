
import React from 'react';
import './WhatWeDo.css';
import img1 from '../../assets/cleaning2.jpeg';
import img2 from '../../assets/cleaning3.jpeg';
import img3 from '../../assets/Homepic.jpeg';
import Contact from '../Contact/Contact';

export const WhatWeDo = () => {
  return (
    <div className="what-page">
      <header className="what-hero">
        <div>
          <h1>What We Do</h1>
          <p>Comprehensive cleaning solutions for homes and businesses — tailored, reliable and efficient.</p>
        </div>
        <img src={img3} alt="what we do" />
      </header>

      <section className="what-services">
        <h2>Services</h2>
        <div className="what-grid">
          <div className="item"><img src={img1} alt="residential" /><h3>Residential Cleaning</h3><p>Recurring and deep cleans to keep your home comfortable and healthy.</p></div>
          <div className="item"><img src={img2} alt="commercial" /><h3>Commercial Cleaning</h3><p>Custom programs for offices, retail and facilities of all sizes.</p></div>
        </div>
      </section>

      <section className="what-cta">
        <h2>Ready to get started?</h2>
        <p>Contact us for a free quote and we'll tailor a cleaning plan to your needs.</p>
      </section>
      <Contact />
    </div>
  )
}
export default WhatWeDo;

