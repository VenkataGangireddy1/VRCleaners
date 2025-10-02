import React, { useState, useEffect, useRef } from 'react';
import './DeepCleaning.css';
import img1 from '../../assets/cleaning4.jpeg';
import img25 from '../../assets/cleaning31.jpeg';
import img3 from '../../assets/cleaning29.jpeg';
import Contact from '../Contact/Contact';
import { useNavigate } from 'react-router-dom';

const DeepCleaning = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const faqs = [
    { q: 'What does a deep clean cover?', a: 'Our deep cleaning targets built-up grime and hard-to-reach areas — baseboards, grout, interior appliances, vents, and detailed surface cleaning throughout your home.' },
    { q: 'How long will a deep clean take?', a: 'Typical times vary by home size and condition; most 2–3 bedroom homes complete in 3–6 hours. We provide time estimates during quoting.' },
    { q: 'Do I need to supply anything?', a: 'No — our teams arrive fully equipped. If you have product preferences (eco-friendly or allergy-safe), let us know and we will use those.' },
    { q: 'Can you do move-in or post-construction cleans?', a: 'Yes. We offer move-in/move-out and post-construction cleaning with debris removal, intensive dusting, and detailed surface work.' },
    { q: 'Are cleaners vetted and insured?', a: 'Yes — all team members are background-checked and insured for your peace of mind.' }
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
    <div className="deep-page" ref={pageRef}>
      <header className="deep-hero full-bleed">
        <div className="deep-hero-bg">
          <img src={img1} alt="Deep cleaning" />
          <div className="deep-hero-overlay">
            <h1>Professional Deep Cleaning Services</h1>
            <button className="hero-quote-btn est-btn" onClick={() => navigate('/quote')}>Get Your Free Quote</button>
          </div>
        </div>
      </header>

      <section className="deep-intro container-row">
        <div className="deep-intro-copy">
          <h2>Deep cleaning that reaches what routine visits miss</h2>
          <p>Our deep cleaning service focuses on the hidden and neglected areas in your home — removing grease, grime, and buildup so every surface looks and feels refreshed. Ideal for seasonal refreshes, move-ins/outs, or preparation for special events.</p>
        </div>
        <div className="featured-image-card deep-feature scroll-animate scroll-animate-left">
          <img src={img25} alt="team entering home" className="img-deep-feature" />
        </div>
      </section>

      <section className="deep-details container-row">
        <div className="featured-image-card left-card scroll-animate scroll-animate-right">
          <img src={img3} alt="cleaning" className="img-deep-left" />
        </div>
        <div className="deep-list">
          <h2>What we deep clean</h2>
          <p>Our teams perform intensive cleaning tasks that complement regular cleaning: detailed kitchen and bathroom work, appliance interiors, baseboards, grout, vents, and more to restore your home to a truly clean state.</p>
          <ul className="check-list two-col">
            <li>Baseboards, door frames, and trim</li>
            <li>Light fixtures and vents</li>
            <li>Appliance interiors (oven, fridge)</li>
            <li>Cabinet interiors and exteriors</li>
            <li>Tile & grout deep scrubbing</li>
            <li>Carpet spot treatments and surface cleaning</li>
            <li>Window and glass cleaning</li>
            <li>Post-construction debris removal</li>
          </ul>
        </div>
      </section>

      <section className="deep-faq container-row">
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

export default DeepCleaning;
