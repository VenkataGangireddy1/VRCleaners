import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import VR from '../../assets/VR.jpeg';
import { FaPhoneAlt, FaConciergeBell } from 'react-icons/fa';

function Navbar() {
  const [showServices, setShowServices] = useState(false);
  const servicesRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setShowServices(false);
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') setShowServices(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // Toggle scrolled state when user scrolls down a bit
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    // initialize state on mount
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleLogoClick(e) {
    // Always scroll to top smoothly. If already on home, just scroll.
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (location.pathname !== '/') {
      // navigate after a short timeout so scroll feels natural on route change
      navigate('/');
    }
  }

  function handleHomeClick(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (location.pathname !== '/') navigate('/');
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <a href="/" className="logo-link" onClick={handleLogoClick}><img src={VR} className="logo" alt="VR Logo" /></a>
      <ul className="navbar-links">
  <li><a href="/" onClick={handleHomeClick}>Home</a></li>
        <li className="dropdown" ref={servicesRef}>
          <button
            className="btn dropbtn"
            aria-haspopup="true"
            aria-expanded={showServices}
            onClick={() => setShowServices(s => !s)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowServices(s => !s);
              }
            }}
          >
            <FaConciergeBell className="icon" /> Services ▼
          </button>
          {showServices && (
            <div className="dropdown-content" role="menu">
              <Link to="/residential" onClick={() => setShowServices(false)}>Residential Cleaning Service</Link>
              <Link to="/commercial" onClick={() => setShowServices(false)}>Commercial Cleaning Service</Link>
              <Link to="/deep-cleaning" onClick={() => setShowServices(false)}>Deep Cleaning Service</Link>
              <Link to="/what-we-do" onClick={() => setShowServices(false)}>What We Do</Link>
            </div>
          )}
        </li>
        <li><Link to="/faqs">FAQ's</Link></li>
        <li><Link to="/about">About</Link></li>
        <li>
          <Link to="/contact" className="btn"><FaPhoneAlt className="icon"/> Contact Us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;



