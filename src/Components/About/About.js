import React from 'react';
import './About.css';
import Contact from '../Contact/Contact';
import img1 from '../../assets/cleaning1.jpeg';
import img2 from '../../assets/cleaning3.jpeg';
import img3 from '../../assets/Homepic.jpeg';
import img4 from '../../assets/cleaning4.jpeg';
import img5 from '../../assets/cleaning8.jpeg';
import img6 from '../../assets/cleaning16.jpeg';
import img7 from '../../assets/cleaning18.jpeg';

const posts = [
  {
    title: 'Preparing Your Home for a Professional Cleaning',
    excerpt:
      'Little prep goes a long way. Learn how to make the most of your cleaning visit — from clearing surfaces to prioritizing problem areas so our team can focus on deep cleaning.',
    img: img1,
  },
  {
    title: 'Deep Cleaning vs. Regular Maintenance: What to Choose',
    excerpt:
      'We explain the differences, when a deep clean is recommended, and tips to keep your space fresh between professional visits.',
    img: img2,
  },
  {
    title: 'Eco-Friendly Cleaning: Our Approach & Products',
    excerpt:
      'We use professional-grade but eco-conscious products. Read about what we bring, why it matters, and how customers can opt for fully green cleanings.',
    img: img3,
  },
  {
    title: 'Professional Office Cleaning Services',
    excerpt:
      'Transform your workplace with our comprehensive office cleaning solutions. We maintain professional environments that promote productivity and create lasting impressions for your clients.',
    img: img4,
  },
  {
    title: 'Kitchen Deep Cleaning Specialists',
    excerpt:
      'Our kitchen cleaning experts tackle grease, grime, and food residue with precision. From appliances to countertops, we ensure your kitchen meets the highest hygiene standards.',
    img: img5,
  },
  {
    title: 'Bathroom Sanitization & Restoration',
    excerpt:
      'Experience spotless bathrooms with our thorough sanitization process. We eliminate bacteria, mold, and soap scum while restoring the shine to all surfaces.',
    img: img6,
  },
  {
    title: 'Move-In/Move-Out Cleaning Excellence',
    excerpt:
      'Starting fresh or leaving clean? Our comprehensive move cleaning service ensures every corner is spotless, making transitions smooth for homeowners and tenants.',
    img: img7,
  },
];

function About() {
  return (
    <main className="about-page">
      <div className="container">
        <header className="about-header">
          <h1>Blog & News</h1>
          <p className="lead">Tips, VR Cleaners updates, and advice for keeping your home and business in top condition.</p>
        </header>

        <section className="blog-grid">
          {posts.map((p, i) => (
            <article className="post-card" key={i}>
              <div className="post-media">
                <img src={p.img} alt={p.title} />
              </div>
              <div className="post-body">
                <h2 className="post-title">{p.title}</h2>
                <p className="post-excerpt">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </section>
        <Contact />
      </div>
    </main>
  );
}

export default About;