import React, { useState, useRef, useEffect } from 'react';
import './ChatBox.css';
import { FaComments, FaTimes, FaPaperPlane, FaPhone, FaUser, FaEnvelope } from 'react-icons/fa';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 Welcome to VR Cleaners! ✨\n\nI'm your virtual assistant and I'm here to help you with:\n\n💰 Pricing information\n🧽 Service details\n📅 Booking assistance\n🌿 Eco-friendly options\n🛡️ Insurance & safety info\n🎉 Current promotions\n\nWhat can I help you with today? Feel free to ask any question or click one of the quick options below! 😊",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // FAQ responses with more comprehensive coverage
  const faqResponses = {
    'pricing': "💰 Our pricing varies by service:\n\n🏠 Standard House Cleaning: $80-120\n🧹 Deep Cleaning: $150-250\n🏢 Commercial: Custom quotes\n🪟 Window Cleaning: $8-15 per window\n\nPrices depend on home size, condition, and frequency. Would you like a free personalized quote?",
    
    'services': "🧽 **Our Cleaning Services:**\n\n🏠 **Residential:** Regular house cleaning, move-in/out\n🏢 **Commercial:** Offices, retail, medical facilities\n🧹 **Deep Cleaning:** Spring cleaning, post-construction\n🪟 **Window Cleaning:** Interior & exterior\n💺 **Carpet & Upholstery:** Steam cleaning, stain removal\n🦠 **Disinfection:** COVID-19 sanitization\n🔧 **Post-Construction:** Builder's cleanup\n\nWhich service interests you most?",
    
    'booking': "📅 **Easy Booking Options:**\n\n🌐 Online: Book instantly on our website\n📱 Phone: Call (555) 123-4567\n💬 Chat: I can help you schedule now!\n\n⏰ **Hours:** Monday-Saturday 8AM-6PM\n🚨 **Emergency:** 24/7 for urgent needs\n\nWould you like to schedule a cleaning today?",
    
    'areas': "📍 **Service Areas:**\n\nWe proudly serve:\n🏙️ Downtown Metro Area\n🏘️ All surrounding suburbs\n🌆 Within 25-mile radius\n\nSpecific areas include: Northside, Southside, Eastridge, Westfield, Maple Heights, Oak Valley, and more!\n\nJust tell me your zip code and I'll confirm we service your area! 📮",
    
    'frequency': "🗓️ **Cleaning Frequency Options:**\n\n✨ **One-time:** Perfect for special occasions\n📅 **Weekly:** Ultimate cleanliness (15% discount!)\n🔄 **Bi-weekly:** Most popular choice (10% discount!)\n📆 **Monthly:** Budget-friendly maintenance\n🏠 **Seasonal:** Deep cleans 4x/year\n\nMost customers love bi-weekly for the perfect balance of cleanliness and value! What works for your schedule?",
    
    'supplies': "🧴 **Cleaning Supplies & Equipment:**\n\n✅ We bring everything needed!\n🌿 100% eco-friendly, non-toxic products\n🧽 Professional-grade equipment\n🧹 HEPA vacuum cleaners\n🧴 Green-certified cleaning solutions\n\n**Prefer your own products?** No problem! We can use your supplies at no extra charge.\n\n**Allergies or sensitivities?** Just let us know - we have hypoallergenic options! 🌱",
    
    'insurance': "🛡️ **Fully Protected & Certified:**\n\n✅ Licensed & Bonded\n🏥 $2M Liability Insurance\n👮 Background-checked cleaners\n🎓 Professionally trained staff\n🔒 Trusted in 1000+ homes\n⭐ A+ BBB Rating\n\nYour home and belongings are completely protected! We're also COVID-19 safety certified. 🦠✅",
    
    'time': "⏰ **Cleaning Time Estimates:**\n\n🏠 **Standard Home (1500-2000 sq ft):** 2-3 hours\n🏡 **Large Home (2000-3000 sq ft):** 3-4 hours\n🏘️ **Extra Large (3000+ sq ft):** 4-6 hours\n🧹 **Deep Cleaning:** Add 1-2 hours\n🏢 **Commercial:** Varies by square footage\n\nFirst cleaning typically takes 25% longer. We'll give you an exact estimate when you book! ⏱️",
    
    'satisfaction': "🌟 **100% Satisfaction Guarantee:**\n\n✅ Not happy? We'll return within 24 hours FREE\n💯 Quality guarantee on every service\n⭐ Thousands of 5-star reviews\n🎯 We don't just clean - we care!\n📞 Direct line to management\n🔄 Consistent quality with every visit\n\nYour happiness is our #1 priority! If we miss anything, just call and we'll make it right immediately! 🚀",
    
    'staff': "👥 **Our Amazing Team:**\n\n✅ All employees (no subcontractors)\n🎓 Professionally trained & certified\n👮 Background checked & bonded\n📱 Uniformed with photo ID\n🚗 Insured company vehicles\n🗣️ English-speaking teams\n⭐ 5-star rated cleaners\n\nOur team averages 3+ years experience. Same team every visit when possible! 👍",
    
    'payment': "💳 **Flexible Payment Options:**\n\n💳 All major credit cards\n🏦 Bank transfer/ACH\n📱 Mobile payments (Apple Pay, Google Pay)\n💰 Cash accepted\n📊 Auto-pay available (5% discount!)\n🧾 Transparent pricing - no hidden fees\n\nPayment due after service completion. We'll email your receipt! 📧",
    
    'emergency': "🚨 **Emergency & Same-Day Service:**\n\n⚡ Same-day available (when possible)\n🚨 24/7 emergency response\n🏠 Move-out cleaning (short notice OK)\n🎉 Last-minute party cleanup\n💼 Office emergency cleaning\n\nUrgent need? Call (555) 123-4567 and we'll do our best to accommodate! 📞",
    
    'covid': "🦠 **COVID-19 Safety Protocols:**\n\n😷 Masked & vaccinated staff\n🧴 Hospital-grade disinfectants\n🧤 Gloves changed between rooms\n📏 Social distancing maintained\n🌡️ Daily health screenings\n🧽 EPA-approved sanitizers\n✅ CDC guideline compliance\n\nYour safety is our priority! We follow all health department recommendations. 🛡️",
    
    'eco': "🌱 **Eco-Friendly & Green Cleaning:**\n\n🌿 100% biodegradable products\n♻️ Environmentally safe formulas\n🐕 Pet & child safe\n🌍 Sustainable practices\n🧴 Refillable product systems\n📦 Minimal packaging waste\n\nGood for your family AND the planet! 🌎💚",
    
    'contact': "📞 I'd be happy to connect you with our team! Let me collect your information and someone will reach out within 2 hours with personalized assistance.",
    
    'discount': "💰 **Current Promotions & Discounts:**\n\n🎉 First-time customers: 20% OFF!\n📅 Weekly service: 15% discount\n🔄 Bi-weekly service: 10% discount\n👥 Refer a friend: $25 credit each\n👴 Senior citizens: 10% discount\n🎖️ Military & veterans: 15% discount\n🏢 Commercial accounts: Custom pricing\n\nMention this chat for an additional 5% OFF! 💸",
    
    'reviews': "⭐ **What Our Customers Say:**\n\n'Best cleaning service ever! Thorough and reliable.' - Sarah M. ⭐⭐⭐⭐⭐\n\n'My house sparkles after every visit!' - John D. ⭐⭐⭐⭐⭐\n\n'Professional, punctual, and perfect results.' - Lisa K. ⭐⭐⭐⭐⭐\n\n📊 **Our Stats:**\n• 4.9/5 star average rating\n• 1000+ satisfied customers\n• 98% customer retention rate\n\nSee more reviews on Google, Yelp, and Facebook! 📱"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBestResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Pricing related
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('how much') || 
        lowerMessage.includes('rate') || lowerMessage.includes('charge') || lowerMessage.includes('expensive') ||
        lowerMessage.includes('cheap') || lowerMessage.includes('budget') || lowerMessage.includes('affordable')) {
      return faqResponses.pricing;
    }
    
    // Services offered
    if (lowerMessage.includes('service') || lowerMessage.includes('what do you') || lowerMessage.includes('cleaning types') ||
        lowerMessage.includes('what can you') || lowerMessage.includes('do you clean') || lowerMessage.includes('types of cleaning')) {
      return faqResponses.services;
    }
    
    // Booking and scheduling
    if (lowerMessage.includes('book') || lowerMessage.includes('schedule') || lowerMessage.includes('appointment') ||
        lowerMessage.includes('reserve') || lowerMessage.includes('when can') || lowerMessage.includes('availability') ||
        lowerMessage.includes('how to book') || lowerMessage.includes('set up')) {
      return faqResponses.booking;
    }
    
    // Service areas
    if (lowerMessage.includes('area') || lowerMessage.includes('location') || lowerMessage.includes('where do you') ||
        lowerMessage.includes('zip code') || lowerMessage.includes('serve') || lowerMessage.includes('come to') ||
        lowerMessage.includes('service area') || lowerMessage.includes('do you work in')) {
      return faqResponses.areas;
    }
    
    // Frequency and scheduling
    if (lowerMessage.includes('how often') || lowerMessage.includes('frequency') || lowerMessage.includes('weekly') ||
        lowerMessage.includes('monthly') || lowerMessage.includes('bi-weekly') || lowerMessage.includes('regular') ||
        lowerMessage.includes('recurring') || lowerMessage.includes('schedule')) {
      return faqResponses.frequency;
    }
    
    // Supplies and equipment
    if (lowerMessage.includes('supplies') || lowerMessage.includes('products') || lowerMessage.includes('bring') ||
        lowerMessage.includes('equipment') || lowerMessage.includes('chemicals') || lowerMessage.includes('eco') ||
        lowerMessage.includes('green') || lowerMessage.includes('safe') || lowerMessage.includes('toxic')) {
      return faqResponses.supplies;
    }
    
    // Insurance and trust
    if (lowerMessage.includes('insurance') || lowerMessage.includes('licensed') || lowerMessage.includes('bonded') ||
        lowerMessage.includes('background') || lowerMessage.includes('trust') || lowerMessage.includes('safe') ||
        lowerMessage.includes('reliable') || lowerMessage.includes('certified')) {
      return faqResponses.insurance;
    }
    
    // Time and duration
    if (lowerMessage.includes('how long') || lowerMessage.includes('time') || lowerMessage.includes('duration') ||
        lowerMessage.includes('hours') || lowerMessage.includes('quick') || lowerMessage.includes('fast')) {
      return faqResponses.time;
    }
    
    // Satisfaction and quality
    if (lowerMessage.includes('guarantee') || lowerMessage.includes('satisfaction') || lowerMessage.includes('quality') ||
        lowerMessage.includes('good job') || lowerMessage.includes('unhappy') || lowerMessage.includes('complaint') ||
        lowerMessage.includes('not satisfied')) {
      return faqResponses.satisfaction;
    }
    
    // Staff related
    if (lowerMessage.includes('staff') || lowerMessage.includes('team') || lowerMessage.includes('cleaner') ||
        lowerMessage.includes('employee') || lowerMessage.includes('who will') || lowerMessage.includes('workers') ||
        lowerMessage.includes('same people') || lowerMessage.includes('trained')) {
      return faqResponses.staff;
    }
    
    // Payment related
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('credit card') ||
        lowerMessage.includes('cash') || lowerMessage.includes('billing') || lowerMessage.includes('invoice') ||
        lowerMessage.includes('money') || lowerMessage.includes('fees')) {
      return faqResponses.payment;
    }
    
    // Emergency services
    if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('same day') ||
        lowerMessage.includes('asap') || lowerMessage.includes('immediate') || lowerMessage.includes('rush') ||
        lowerMessage.includes('today') || lowerMessage.includes('right now')) {
      return faqResponses.emergency;
    }
    
    // COVID safety
    if (lowerMessage.includes('covid') || lowerMessage.includes('coronavirus') || lowerMessage.includes('mask') ||
        lowerMessage.includes('sanitize') || lowerMessage.includes('disinfect') || lowerMessage.includes('safe') ||
        lowerMessage.includes('pandemic') || lowerMessage.includes('virus')) {
      return faqResponses.covid;
    }
    
    // Eco-friendly
    if (lowerMessage.includes('eco') || lowerMessage.includes('green') || lowerMessage.includes('environment') ||
        lowerMessage.includes('natural') || lowerMessage.includes('organic') || lowerMessage.includes('chemical-free') ||
        lowerMessage.includes('pet safe') || lowerMessage.includes('child safe')) {
      return faqResponses.eco;
    }
    
    // Discounts and promotions
    if (lowerMessage.includes('discount') || lowerMessage.includes('deal') || lowerMessage.includes('promotion') ||
        lowerMessage.includes('coupon') || lowerMessage.includes('special') || lowerMessage.includes('offer') ||
        lowerMessage.includes('save') || lowerMessage.includes('cheaper')) {
      return faqResponses.discount;
    }
    
    // Reviews and testimonials
    if (lowerMessage.includes('review') || lowerMessage.includes('rating') || lowerMessage.includes('testimonial') ||
        lowerMessage.includes('feedback') || lowerMessage.includes('customer') || lowerMessage.includes('experience') ||
        lowerMessage.includes('reputation') || lowerMessage.includes('google')) {
      return faqResponses.reviews;
    }
    
    // Contact and callback requests
    if (lowerMessage.includes('call') || lowerMessage.includes('contact') || lowerMessage.includes('speak') || 
        lowerMessage.includes('talk') || lowerMessage.includes('representative') || lowerMessage.includes('human') ||
        lowerMessage.includes('person') || lowerMessage.includes('agent')) {
      return faqResponses.contact;
    }
    
    // Greetings and general responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') ||
        lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon')) {
      return "Hello! 👋 Welcome to VR Cleaners! I'm here to help you with any questions about our cleaning services. What would you like to know? I can help with pricing, booking, services, or anything else!";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! 😊 I'm here anytime you need help. Is there anything else about our cleaning services I can assist you with today?";
    }
    
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return "Thank you for chatting with VR Cleaners! 👋 Remember, we're just a call away at (555) 123-4567 for any cleaning needs. Have a wonderful day! ✨";
    }
    
    // Default response for unmatched queries
    return "That's a great question! 🤔 I'd love to connect you with our expert team who can give you detailed information about our cleaning services. Would you like me to have someone call you back with specific answers to your questions?";
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = findBestResponse(inputMessage);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Check if we should show contact form
      if (botResponse === faqResponses.contact || inputMessage.toLowerCase().includes('call') || inputMessage.toLowerCase().includes('contact')) {
        setTimeout(() => setShowContactForm(true), 1000);
      }
    }, 1500);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    
    const contactMessage = {
      id: Date.now(),
      text: `Perfect! Thank you ${userInfo.name}! 🎉\n\n✅ **Your information has been received:**\n📱 Phone: ${userInfo.phone}\n📧 Email: ${userInfo.email}\n\n🕐 **What happens next:**\n• Our team will contact you within 2 business hours\n• We'll discuss your specific cleaning needs\n• Get a personalized quote\n• Schedule your cleaning at your convenience\n\n📞 **Need immediate help?** Call us now at (555) 123-4567\n\nIs there anything else I can help you with while you wait? 😊`,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, contactMessage]);
    setShowContactForm(false);
    setUserInfo({ name: '', phone: '', email: '' });
    
    // Add a follow-up message after a delay
    setTimeout(() => {
      const followUpMessage = {
        id: Date.now() + 2,
        text: "💡 **Pro Tip:** While you wait for our call, feel free to ask me about:\n\n🎉 Current promotions and discounts\n📋 Preparation tips for your first cleaning\n⭐ What makes VR Cleaners special\n🗓️ Best times to schedule regular cleanings\n\nI'm here to help! 🤝",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, followUpMessage]);
    }, 3000);
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+15551234567';
  };

  const quickQuestions = [
    "💰 What are your cleaning prices?",
    "🧽 What services do you offer?",
    "📅 How do I book a cleaning?",
    "🌿 Do you use eco-friendly products?",
    "⏰ How long does cleaning take?",
    "🛡️ Are you insured and bonded?",
    "🎯 What areas do you serve?",
    "💳 What payment methods do you accept?",
    "🎉 Do you have any current discounts?",
    "🚨 Do you offer same-day service?"
  ];

  const handleQuickQuestion = (question) => {
    // Remove emoji and clean up the question text
    const cleanQuestion = question.replace(/[^\w\s?]/g, '').trim();
    setInputMessage(cleanQuestion);
    
    // Immediately add user message
    const userMessage = {
      id: Date.now(),
      text: cleanQuestion,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Generate bot response
    setTimeout(() => {
      const botResponse = findBestResponse(cleanQuestion);
      const botMessage = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // Check if we should show contact form
      if (botResponse === faqResponses.contact) {
        setTimeout(() => setShowContactForm(true), 1000);
      }
    }, 1000);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div 
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaComments />}
        {!isOpen && <span className="chat-badge">💬</span>}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-info">
              <h4>VR Cleaners Support</h4>
              <span className="online-status">🟢 Online</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              <FaTimes />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot typing">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="quick-questions">
              <p>Quick questions:</p>
              {quickQuestions.map((question, index) => (
                <button 
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="quick-question-btn"
                >
                  {question}
                </button>
              ))}
            </div>
          )}

          {/* Contact Form */}
          {showContactForm && (
            <div className="contact-form-overlay">
              <form onSubmit={handleContactSubmit} className="contact-form">
                <h4>Let's get your information</h4>
                <div className="form-group">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="submit-btn">Submit</button>
                  <button type="button" onClick={() => setShowContactForm(false)} className="cancel-btn">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* Chat Input */}
          <div className="chat-input-area">
            <div className="chat-actions">
              <button onClick={handleCallNow} className="call-btn">
                <FaPhone /> Call Now
              </button>
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button onClick={handleSendMessage} className="send-btn">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;