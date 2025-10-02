import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './Components/NavBar/Navbar';
import ChatBox from './Components/ChatBox/ChatBox';
import { Hero } from './Components/Hero/Hero';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import { Benifits } from './Components/Benifits/Benifits';
import Title from './Components/Title/Title';
import Contact from './Components/Contact/Contact';
import Reviews from './Components/Reviews/Reviews';
import BodySection from './Components/BodySection/BodySection';
import Residential from './Components/Residential/Residential';
import Commercial from './Components/Commercial/Commercial';
import DeepCleaning from './Components/DeepCleaning/DeepCleaning';
import WhatWeDo from './Components/WhatWeDo/WhatWeDo';
import About from './Components/About/About';
import Faqs from './Components/FAQS/Faqs';
import Booking from './Components/Booking/Booking';
import Quote from './Components/Quote/Quote';

function Home() {
  return (
    <>
      <Hero />
      <Title />
      <Benifits />
      <BodySection />
      <Reviews />
      <Contact />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/residential" element={<Residential />} />
        <Route path="/commercial" element={<Commercial />} />
        <Route path="/deep-cleaning" element={<DeepCleaning />} />
        <Route path="/what-we-do" element={<WhatWeDo />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/quote" element={<Quote />} />
      </Routes>
      <ChatBox />
    </Router>
  );
}
