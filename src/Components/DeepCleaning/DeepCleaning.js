import React, { useState, useEffect, useRef } from 'react';
import './DeepCleaning.css';
import img1 from '../../assets/cleaning4.jpeg';
import img25 from '../../assets/cleaning31.jpeg';
import img3 from '../../assets/cleaning29.jpeg';
import Contact from '../Contact/Contact';
import QuoteModal from '../Quote/QuoteModal';

const DeepCleaning = () => {
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: 'What is included in a deep cleaning?', a: 'A deep cleaning includes thorough scrubbing and detailed cleaning of kitchens, bathrooms, baseboards, vents, inside appliances, and other areas that regular cleans often miss.' },
    { q: 'How long does a deep clean take?', a: 'Time depends on the size and condition of the home; most deep cleans take between 3 and 6 hours for an average 2-3 bedroom home.' },
    { q: 'Do I need to provide supplies?', a: 'No - our teams bring professional equipment and cleaning solutions. If you prefer specific products, let us know ahead of time.' },
    { q: 'Do you offer move-in/move-out deep cleans?', a: 'Yes - we provide move-in and move-out cleaning with extra attention to cabinets, ovens, and baseboards.' },
    { q: 'Can I schedule recurring deep cleans?', a: 'Deep cleans are usually scheduled as one-time or occasional services; we offer recurring maintenance packages separately.' },
    { q: 'Are your cleaners insured and background-checked?', a: 'Yes - all team members undergo background checks and are covered by our liability policies.' },
    { q: 'What if I have pets?', a: 'Please secure or inform us about pets so we can ensure a safe and efficient clean.' },
    { q: 'Can you clean after construction?', a: 'Yes - post-construction cleans are available and often include debris removal and intensive dusting.' },
    { q: 'How do I get a quote?', a: 'Use the "Get Instant Price" button to open the quote form, or contact us and we will provide a tailored estimate.' },
    { q: 'What payment methods do you accept?', a: 'We accept credit cards, online payments, and company invoicing for business customers.' }
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
            <h1>PROFESSIONAL DEEP CLEANING SERVICES</h1>
          </div>
        </div>
      </header>

      <section className="deep-intro container-row">
        <div className="deep-intro-copy">
          <h2>GOING ABOVE AND BEYOND STANDARD CLEANING</h2>
          <p>To ensure that your home is free of any grease, dirt or stains that a standard cleaning might not address, you will most likely benefit from the deep cleaning services provided by VR Cleaners. We offer these services to residents of Chester, Montgomery and Delaware Counties who are looking to go the extra mile to have every nook and cranny of their home sparkling clean. From washing your baseboards to cleaning your windows, the team at VR Cleaners does it all!</p>
          <button className="est-btn" onClick={() => setOpen(true)}>Get Instant Price</button>
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
          <h2>OUR DEEP CLEANING SERVICES</h2>
          <p>Deep cleaning goes further than our residential cleaning services to reach the areas that you might not think to clean — thus being the areas that are the dirtiest!</p>
          <ul className="check-list two-col">
            <li>Washing baseboards, doors and other woodwork</li>
            <li>Cleaning small light fixtures</li>
            <li>Polishing granite countertops</li>
            <li>Interior refrigerator cleaning</li>
            <li>Oven cleaning</li>
            <li>Carpet cleaning</li>
            <li>Cleaning kitchen cabinets - interior and exterior</li>
            <li>Window cleaning</li>
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
      <QuoteModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default DeepCleaning;
