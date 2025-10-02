import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import VR from '../../assets/VR.jpeg';
import { FaConciergeBell, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [showServices, setShowServices] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  // Keep top contact bar visible on some service pages even when scrolled
  const keepTopBarRoutes = ['/residential', '/commercial', '/deep-cleaning'];
  const showTopBarEvenWhenScrolled = keepTopBarRoutes.includes(location.pathname);

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

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setShowServices(false);
  }

  return (
  <div className={`navbar-container ${scrolled ? 'scrolled' : ''} ${showTopBarEvenWhenScrolled ? 'force-topbar' : ''}`}>
      {/* Top Contact Bar */}
      <div className="top-contact-bar">
        <div className="top-contact-content">
          <div className="contact-info">
            <span className="call-text">Call for a Free Estimate!</span>
            <a href="tel:+15551234567" className="phone-number">(123) 456-7890</a>
          </div>
          <Link to="/booking" className="book-btn">BOOK YOUR CLEANING</Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="/" className="logo-link" onClick={handleLogoClick}>
          <div className="logo-container">
            <img src={VR} className="logo" alt="VR Logo" />
            <span className="logo-tagline">Your Trusted Partner in Cleaning Services</span>
          </div>
        </a>
        
        {/* Contact info when scrolled */}
        {scrolled && (
          <div className="navbar-contact-info">
            <span className="navbar-call-text">Call for a Free Estimate!</span>
            <a href="tel:+12345678901" className="navbar-phone">(123) 456-7890</a>
            <Link to="/booking" className="navbar-book-btn">BOOK YOUR CLEANING</Link>
          </div>
        )}
        
        {/* Mobile Hamburger Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li><a href="/" onClick={(e) => { handleHomeClick(e); closeMobileMenu(); }}>Home</a></li>
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
                <Link to="/residential" onClick={() => { setShowServices(false); closeMobileMenu(); }}>Residential Cleaning Service</Link>
                <Link to="/commercial" onClick={() => { setShowServices(false); closeMobileMenu(); }}>Commercial Cleaning Service</Link>
                <Link to="/deep-cleaning" onClick={() => { setShowServices(false); closeMobileMenu(); }}>Deep Cleaning Service</Link>
                <Link to="/what-we-do" onClick={() => { setShowServices(false); closeMobileMenu(); }}>What We Do</Link>
              </div>
            )}
          </li>
          <li><Link to="/faqs" onClick={closeMobileMenu}>FAQ's</Link></li>
          <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;



