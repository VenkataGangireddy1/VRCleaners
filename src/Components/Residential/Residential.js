import React, { useState, useEffect, useRef } from 'react';
import './Residential.css';
import Contact from '../Contact/Contact';
import imgHero from '../../assets/cleaning27.jpeg';
import img2 from '../../assets/cleaning33.jpeg';
import imgGrid from '../../assets/cleaning16.jpeg';
import { useNavigate } from 'react-router-dom';

export const Residential = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const areas = [
    'Downingtown, PA',
    'Exton, PA',
    'Malvern, PA',
    'Paoli, PA',
    'Thorndale, PA',
    'Chester Springs, PA',
    'West Chester, PA',
    'Wayne, PA',
    'And the surrounding area!'
  ];

  const faqs = [
    { q: 'What is residential cleaning services?', a: 'Residential cleaning services are professional cleaning visits designed for private homes, condos and apartments. They usually include dusting, vacuuming, sweeping, mopping, kitchen and bathroom cleaning, trash removal and light surface sanitization. Services are customized to your home and schedule.' },
    { q: 'What is the difference between routine cleaning and deep cleaning?', a: 'Routine cleaning focuses on regular upkeep—vacuuming, dusting, surface cleaning, wiping counters, and bathroom refreshes. Deep cleaning is more thorough and includes tasks like scrubbing grout, washing baseboards, cleaning inside appliances and cabinets, and removing built-up grime from hard-to-reach areas.' },
    { q: 'How often should I schedule residential cleaning?', a: 'There is no one-size-fits-all answer. Many customers choose weekly or biweekly service for busy households, monthly for light upkeep, or a one-time deep clean. We help you pick a cadence that fits your lifestyle and budget.' },
    { q: 'Do I need to provide cleaning supplies or equipment?', a: 'No — our teams arrive equipped with professional-grade vacuums, mops, cleaners and microfibers. If you have specific product preferences (eco-friendly, fragrance-free), let us know and we will accommodate when possible.' },
    { q: 'What happens if something is damaged during cleaning?', a: 'Although incidents are rare, VR Cleaners maintains liability coverage. Report any accidental damage and we will document and resolve the issue promptly. We train our teams to treat your home and belongings carefully.' }
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
    <div className="residential-page" ref={pageRef}>
      <header className="res-hero full-bleed">
        <div className="res-hero-image full-bleed">
          <img src={imgHero} alt="Residential cleaning" />
          <div className="res-hero-overlay">
            <h1>Residential Cleaning Services</h1>
            <button className="hero-quote-btn est-btn" onClick={() => navigate('/quote')}>Get Your Free Quote</button>
          </div>
        </div>
      </header>

      <section className="res-intro container-row">
        <div className="res-copy">
          <h2>Professional home cleaning — reliable, trusted, and eco-friendly</h2>
          <p>Let VR Cleaners take cleaning off your to-do list. We provide dependable residential cleaning services tailored to your schedule — weekly, bi-weekly, monthly, or one-time deep cleans — so you can spend more time on what matters.</p>
          <p>Our teams arrive with professional-grade equipment and eco-friendly products, delivering consistent results and a healthier home. Choose a plan that fits your lifestyle and budget, and we'll handle the rest.</p>
        </div>
        <div className="featured-image-card res-feature scroll-animate scroll-animate-left">
          <img src={img2} alt="residential team" />
        </div>
      </section>

      <section className="res-two container-row">
        <div className="featured-image-card left-card left-shifted scroll-animate scroll-animate-right">
          <img src={imgGrid} alt="cleaning equipment" />
        </div>
        <div className="res-details">
          <h2>WHAT DO YOU NEED HELP CLEANING?</h2>
          <p>Is your entryway met with dust, clutter, or lingering messes? Busy lives make it hard to stay on top of cleaning — and even the most organized households need a hand. Let VR Cleaners take care of the routine chores so you can relax and enjoy your home.</p>
          <p>We offer flexible scheduling for routine upkeep, one-time deep cleans, and event preparation. Our vetted teams use professional, eco-friendly products to clean kitchens, bathrooms, floors, and more — delivering a healthier, fresher living space. We proudly serve:</p>
          <div className="res-areas-list">
            <h3>Areas We Serve</h3>
            <ul className="check-list two-col">
              {areas.map(a => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="res-faq container-row">
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
};

export default Residential;
