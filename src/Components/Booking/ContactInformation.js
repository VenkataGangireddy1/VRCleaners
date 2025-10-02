import React, { useState } from 'react';

const ContactInformation = ({ data, updateData, updateMultipleFields, onNext }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!data.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!data.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(data.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    updateData('phone', formattedPhone);
  };

  return (
    <div className="booking-step">
      <h2 className="step-title-main">Contact Information</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name *</label>
            <input
              type="text"
              className={`form-input ${errors.firstName ? 'error' : ''}`}
              value={data.firstName}
              onChange={(e) => updateData('firstName', e.target.value)}
              placeholder="Enter your first name"
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              className={`form-input ${errors.lastName ? 'error' : ''}`}
              value={data.lastName}
              onChange={(e) => updateData('lastName', e.target.value)}
              placeholder="Enter your last name"
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number *</label>
          <input
            type="tel"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            value={data.phone}
            onChange={handlePhoneChange}
            placeholder="(123) 456-7890"
            maxLength="14"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input
            type="email"
            className={`form-input ${errors.email ? 'error' : ''}`}
            value={data.email}
            onChange={(e) => updateData('email', e.target.value)}
            placeholder="Enter your email address"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox-input"
            />
            <span className="checkbox-text">
              I agree to receive periodic promotional and marketing SMS (text) messages from VR Cleaners. 
              You can reply STOP to opt out at any time or text HELP for assistance. Message & data rates may apply. 
              Messaging frequency may vary. Please review our Privacy Policy.
            </span>
          </label>
        </div>

        <div className="btn-group">
          <button type="submit" className="btn-primary">
            Continue to Schedule
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactInformation;