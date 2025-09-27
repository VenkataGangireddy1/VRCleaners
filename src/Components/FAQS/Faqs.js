import React, { useState } from 'react';
import './Faqs.css';
import Contact from '../Contact/Contact';

const faqsData = [
  {
    question: 'How do I book a cleaning?',
    answer:
      'You can book online using our contact form or call us directly. Tell us the service you need, preferred date/time, and any special instructions. We\'ll confirm availability and send a booking summary.',
  },
  {
    question: 'What areas do you serve?',
    answer:
      'We serve residential and commercial customers within our local service area. If you\'re unsure whether we cover your address, contact us with your ZIP/postal code and we\'ll confirm.',
  },
  {
    question: 'How are your prices calculated?',
    answer:
      'Pricing is based on the size of the property, the service type (regular, deep, or commercial), and any add-ons. We provide estimates over the phone or via email and can offer a firm quote after a short on-site assessment when required.',
  },
  {
    question: 'What is the difference between regular and deep cleaning?',
    answer:
      'Regular cleanings keep living and working spaces maintained (dusting, vacuuming, bathrooms, kitchens). Deep cleaning is more intensive — it targets built-up grime, detailed areas (behind appliances, baseboards), and requires more time and specialized supplies.',
  },
  {
    question: 'Do I need to provide cleaning supplies?',
    answer:
      'We bring professional-grade equipment and eco-friendly cleaning supplies by default. If you prefer we use your products, let us know during booking.',
  },
  {
    question: 'What if I am not satisfied with the cleaning?',
    answer:
      'Customer satisfaction is important to us. If something was missed, contact us within 48 hours and we\'ll address the issue promptly — often scheduling a return visit at no extra charge.',
  },
  {
    question: 'How do you handle keys and access?',
    answer:
      'We can work with the access method you prefer: meet-and-greet, a lockbox, or a code. For recurring services we can discuss a secure, documented procedure.',
  },
  {
    question: 'Are your cleaners background-checked and insured?',
    answer:
      'Yes. Our team members are screened and trained. We carry liability insurance to protect your property while our crew works on site.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept major credit/debit cards and electronic payments. Payment is usually collected after the service unless other arrangements are made.',
  },
  {
    question: 'Can I reschedule or cancel a booking?',
    answer:
      'Yes — please provide as much notice as possible. Cancellation policies may vary for large or specially scheduled jobs; we will outline any fees at booking.',
  },
];

function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <main className="faqs-page">
      <div className="container">
        <h1>Frequently Asked Questions</h1>
        <p className="intro">
          Here are answers to the questions we hear most often. If you can’t find what you’re looking for, please
          contact us and we’ll be happy to help.
        </p>
        <section className="faqs-list" aria-label="Frequently Asked Questions">
          {faqsData.map((f, i) => (
            <div className="faq-item" key={i}>
              <button
                className={`faq-question ${openIndex === i ? 'open' : ''}`}
                aria-expanded={openIndex === i}
                aria-controls={`faq-panel-${i}`}
                onClick={() => toggle(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggle(i);
                  }
                }}
              >
                <span>{f.question}</span>
                <span className="chev" aria-hidden>{openIndex === i ? '−' : '+'}</span>
              </button>
              <div
                id={`faq-panel-${i}`}
                className={`faq-answer ${openIndex === i ? 'open' : ''}`}
                role="region"
                aria-hidden={openIndex !== i}
              >
                <p>{f.answer}</p>
              </div>
            </div>
          ))}
        </section>
        <Contact />
      </div>
    </main>
  );
}

export default Faqs;