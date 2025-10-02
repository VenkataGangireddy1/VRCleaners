import React, { useState, useEffect, useRef } from 'react';
import './Commercial.css';
import Contact from '../Contact/Contact';
import img1 from '../../assets/cleaning4.jpeg';
import img2 from '../../assets/cleaning32.jpeg';
import img3 from '../../assets/cleaning30.jpeg';
import { useNavigate } from 'react-router-dom';

export default function Commercial() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const faqs = [
    { q: 'What commercial cleaning services do you provide?', a: 'We provide tailored janitorial programs including daily or nightly cleaning, routine maintenance, deep cleans, carpet and hard-floor care, window washing, and post-construction cleaning for offices and commercial facilities.' },
    { q: 'How do you schedule work to avoid disrupting business?', a: 'We coordinate with your team to schedule before-hours, after-hours, or low-traffic windows and provide clear scopes so cleaning is efficient and unobtrusive.' },
    { q: 'Do you offer green or hospital-grade disinfecting?', a: 'Yes — we use professional-grade products and can provide eco-friendly or EPA-registered disinfectants depending on your facility requirements.' },
    { q: 'Can you handle multiple locations or large facilities?', a: 'Absolutely. VR Cleaners supports multi-site contracts, scalable staffing, and consistent quality control across large footprints.' },
    { q: 'How do I get a custom quote?', a: 'Request a free quote and site assessment — we’ll deliver a tailored scope, schedule, and cost estimate based on your needs.' }
  ];

  const toggleIndex = (i) => setOpenIndex(openIndex === i ? null : i);

  const pageRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const nodes = pageRef.current.querySelectorAll('.scroll-animate');
    if (!nodes || nodes.length === 0) return;

    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

    nodes.forEach(n => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="commercial-page" ref={pageRef}>
      <header className="com-hero full-bleed">
        <div className="com-hero-bg">
          <img src={img1} alt="Commercial cleaning" />
          <div className="com-hero-overlay">
            <h1>Commercial Cleaning Services</h1>
            <button className="hero-quote-btn est-btn" onClick={() => navigate('/quote')}>Get Your Free Quote</button>
          </div>
        </div>
      </header>

      <section className="com-intro container-row">
        <div className="com-copy">
          <h2>Cleaner workplaces. Healthier teams. Better first impressions.</h2>
          <p>Keep your facility professional and safe with VR Cleaners. We deliver reliable janitorial services and customizable programs, so your business can focus on operations while we maintain a clean, welcoming environment for employees and customers.</p>
        </div>
        <div className="featured-image-card com-feature scroll-animate scroll-animate-left">
          <img src={img2} alt="commercial team" />
        </div>
      </section>

      <section className="com-two container-row">
        <div className="featured-image-card left-card scroll-animate scroll-animate-right">
          <img src={img3} alt="equipment" />
        </div>
        <div className="com-details">
          <h2>Professional janitorial & facility services</h2>
          <p>From daily maintenance to targeted deep cleans, our teams work around your schedule to keep lobbies, workspaces, restrooms, and break rooms healthy and presentable. We tailor scopes to industry needs — office, retail, medical, or industrial.</p>
          <ul className="check-list two-col">
            <li><strong>Office Areas:</strong> Dusting, surface disinfection, and trash removal</li>
            <li><strong>Break Rooms & Cafes:</strong> Sanitizing high-touch areas and floor care</li>
            <li><strong>Restrooms:</strong> Comprehensive cleaning and disinfection</li>
            <li><strong>Interior Windows & Glass:</strong> Lobby and storefront attention</li>
            <li><strong>Waste & Recycling:</strong> Responsible collection and eco-friendly disposal</li>
          </ul>
        </div>
      </section>

      <section className="com-faq container-row">
        <div className="faq-wrap">
          <h2>FREQUENTLY ASKED QUESTIONS</h2>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item ${openIndex === i ? 'open' : ''}`}>
                <button
                  className="faq-question"
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-${i}`}
                  onClick={() => toggleIndex(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleIndex(i); } }}
                >
                  <span>{f.q}</span>
                  <span className={`chev ${openIndex === i ? 'rot' : ''}`} aria-hidden>▾</span>
                </button>
                <div id={`faq-${i}`} className={`faq-answer ${openIndex === i ? 'open' : ''}`} role="region" aria-hidden={openIndex === i ? 'false' : 'true'}>
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}