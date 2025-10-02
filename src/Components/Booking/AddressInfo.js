import React, { useState } from 'react';

const AddressInfo = ({ data, updateData, updateMultipleFields, onNext, onPrev }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!data.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!data.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!data.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!data.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(data.zipCode)) {
      newErrors.zipCode = 'Please enter a valid zip code';
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

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const tipOptions = [
    { value: 10, label: '10%' },
    { value: 15, label: '15%' },
    { value: 20, label: '20%' },
    { value: 0, label: 'Custom' },
    { value: -1, label: 'Maybe Later' }
  ];

  return (
    <div className="booking-step">
      <h2 className="step-title-main">Set Your Home Address</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="address-section">
          <h3 className="section-title">Cleaning Address</h3>
          
          <div className="form-group">
            <label className="form-label">Street Address *</label>
            <input
              type="text"
              className={`form-input ${errors.address ? 'error' : ''}`}
              value={data.address}
              onChange={(e) => updateData('address', e.target.value)}
              placeholder="Enter your street address"
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Suite or Apartment (Optional)</label>
            <input
              type="text"
              className="form-input"
              value={data.suite}
              onChange={(e) => updateData('suite', e.target.value)}
              placeholder="Apt, Suite, Unit, etc."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City *</label>
              <input
                type="text"
                className={`form-input ${errors.city ? 'error' : ''}`}
                value={data.city}
                onChange={(e) => updateData('city', e.target.value)}
                placeholder="Enter city"
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">State *</label>
              <select
                className={`form-select ${errors.state ? 'error' : ''}`}
                value={data.state}
                onChange={(e) => updateData('state', e.target.value)}
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <span className="error-message">{errors.state}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Zip Code *</label>
              <input
                type="text"
                className={`form-input ${errors.zipCode ? 'error' : ''}`}
                value={data.zipCode}
                onChange={(e) => updateData('zipCode', e.target.value)}
                placeholder="12345"
                maxLength="10"
              />
              {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={data.billingAddressSame}
                onChange={(e) => updateData('billingAddressSame', e.target.checked)}
              />
              <span className="checkbox-text">
                Billing address is the same as Cleaning Address
              </span>
            </label>
          </div>
        </div>

        <div className="tip-section">
          <h3 className="section-title">Professional House Cleaners Tip</h3>
          <div className="tip-options">
            {tipOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`tip-btn ${data.tipPercentage === option.value ? 'selected' : ''}`}
                onClick={() => updateData('tipPercentage', option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="terms-section">
          <label className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox-input"
              required
            />
            <span className="checkbox-text">
              Check here to indicate that you have read and agree to the{' '}
              <a href="#" className="terms-link">VR Cleaners Terms and Conditions</a>.
            </span>
          </label>
          
          <p className="consent-text">
            By submitting this form, you consent to receive calls, SMS (text) notifications, and email messages 
            at the contact information provided, related to delivering our services. You may text STOP at any time 
            to opt out of the SMS (text) messages. Message & data rates may apply. Please review our Privacy Policy.
          </p>
        </div>

        <div className="btn-group">
          <button type="button" className="btn-secondary" onClick={onPrev}>
            Back
          </button>
          <button type="submit" className="btn-primary">
            Review & Purchase
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressInfo;