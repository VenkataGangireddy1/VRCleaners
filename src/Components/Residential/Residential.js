import React, { useState, useEffect, useRef } from 'react';
import './Residential.css';
import Contact from '../Contact/Contact';
import imgHero from '../../assets/cleaning27.jpeg';
import img2 from '../../assets/cleaning33.jpeg';
import imgGrid from '../../assets/cleaning16.jpeg';
import QuoteModal from '../Quote/QuoteModal';

export const Residential = () => {
  const [open, setOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

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
            <h1>RESIDENTIAL CLEANING SERVICES</h1>
          </div>
        </div>
      </header>

      <section className="res-intro container-row">
        <div className="res-copy">
          <h2>PROFESSIONAL HOME CLEANING TO MAKE LIFE EASIER</h2>
          <p>Your home is your sanctuary. When daily responsibilities demand your attention elsewhere, keeping your living space spotless becomes an overwhelming burden. VR Cleaners understands the challenges families face in maintaining a truly clean home environment.</p>
          <p>Our residential cleaning teams combine years of experience with attention to detail that sets us apart. From weekly maintenance to deep seasonal cleaning, we adapt our services to fit your unique needs and schedule. With professional-grade equipment and eco-friendly products, we deliver consistently exceptional results that give you peace of mind and more time to focus on what matters most.</p>
          <button className="est-btn" onClick={() => setOpen(true)}>Get Instant Price</button>
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
          <p>When you step through your entryway and look around, are you bombarded with dust and clutter? Even the tidiest people can struggle with home maintenance that gets in the way of enjoying life and focusing on more important matters. Don't let vacuuming and sweeping become an obstacle to your comfort at home.</p>
          <p>Whether it's weekly upkeep, monthly deep cleaning, or preparing for special occasions, VR Cleaners provides flexible scheduling and personalized service plans. Our trained professionals handle everything from kitchen sanitization to bathroom deep cleaning, ensuring every corner of your home sparkles. Call VR Cleaners for residential cleaning services in:</p>
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
      <QuoteModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Residential;
