import React, { useState, useEffect, useRef } from 'react';
import './Reviews.css';

const sampleReviews = [
  { id: 1, author: 'Samantha R.', rating: 5, text: 'Excellent service — my home looks spotless!' },
  { id: 2, author: 'Michael B.', rating: 5, text: 'Punctual, professional, and thorough. Highly recommend.' },
  { id: 3, author: 'Priya K.', rating: 4, text: 'Great experience. Small follow-up about a corner but otherwise perfect.' },
];

export default function Reviews({ initialQuery = 'House of Biryani Malvern PA', autoplay = false, interval = 5000 }) {
  const [reviews, setReviews] = useState(sampleReviews);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/reviews?q=${encodeURIComponent(initialQuery)}`);
        const data = await res.json();

        if (data.reviews && data.reviews.length) {
          setReviews(data.reviews);
        } else {
          setError('No reviews found, showing sample reviews.');
          setReviews(sampleReviews);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load reviews, showing sample reviews.');
        setReviews(sampleReviews);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [initialQuery]);

  const scrollLeft = () => {
    const c = containerRef.current;
    if (!c) return;
    const step = cardRef.current?.clientWidth || c.clientWidth / 3;
    if (c.scrollLeft - step <= 0) {
      c.scrollTo({ left: c.scrollWidth, behavior: 'smooth' });
    } else {
      c.scrollBy({ left: -step, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    const c = containerRef.current;
    if (!c) return;
    const step = cardRef.current?.clientWidth || c.clientWidth / 3;
    const maxScroll = c.scrollWidth - c.clientWidth;
    if (c.scrollLeft + step >= maxScroll) {
      c.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      c.scrollBy({ left: step, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(scrollRight, interval);
    return () => clearInterval(id);
  }, [autoplay, interval]);

  return (
    <section className="reviews-row container">
      <div className="reviews-row-inner">
        <button className="nav prev" onClick={scrollLeft} aria-label="Scroll left">◀</button>
        <div style={{flex:1}}>
          {loading && <div className="review-card">Loading reviews…</div>}
          {error && <div style={{marginBottom:'.75rem', color:'#b33'}}>{error}</div>}
          <div className="reviews-track" ref={containerRef} aria-live="polite">
            {reviews.map((r, i) => (
              <article key={r.id || i} className="review-card" ref={i === 0 ? cardRef : null}>
                <div className="stars">{'★'.repeat(r.rating)}</div>
                <p className="text">{r.text}</p>
                <p className="author">— {r.author}</p>
              </article>
            ))}
          </div>
        </div>
        <button className="nav next" onClick={scrollRight} aria-label="Scroll right">▶</button>
      </div>
    </section>
  );
}



