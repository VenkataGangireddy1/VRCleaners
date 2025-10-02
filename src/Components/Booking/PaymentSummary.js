import React from 'react';

const PaymentSummary = ({ data, updateData, onSchedule, onPrev }) => {
  const formatSelectedDate = () => {
    if (data.selectedDate) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return data.selectedDate.toLocaleDateString('en-US', options);
    }
    return '';
  };

  const getTimeSlotLabel = () => {
    const timeSlots = {
      // Regular cleaning slots
      'morning': 'Morning (8am - 11am)',
      'midday': 'Midday (11am - 2pm)',
      'afternoon': 'Afternoon (2pm - 5pm)',
      // Deep cleaning slots (5-6 hours)
      'early-morning': 'Early Morning (7am - 1pm)',
      // Move in/out slots (6-8 hours)
      'early-start': 'Early Start (7am - 3pm)',
      'morning-start': 'Morning Start (8am - 4pm)',
      'midday-start': 'Midday Start (10am - 6pm)'
    };
    return timeSlots[data.selectedTime] || '';
  };

  const calculateTip = () => {
    if (data.tipPercentage > 0) {
      return (data.estimatedPrice * data.tipPercentage / 100).toFixed(2);
    }
    return 0;
  };

  const calculateTotal = () => {
    const tip = parseFloat(calculateTip());
    return (data.estimatedPrice + tip).toFixed(2);
  };

  return (
    <div className="booking-step">
      <div className="payment-container">
        <div className="booking-summary-final">
          <h2 className="summary-title">BOOKING SUMMARY</h2>
          
          <div className="summary-details">
            <div className="service-details">
              <h3 className="service-name">{data.cleaningPackage}</h3>
              <div className="service-info">
                <p>{data.squareFootage} sq. ft.</p>
                <p>{data.bedrooms} bedrooms</p>
                <p>{data.bathrooms} bathrooms</p>
                <p>{data.people} people</p>
                <p>{data.pets} pets</p>
              </div>
            </div>

            <div className="appointment-details">
              <h4 className="appointment-date">{formatSelectedDate()}</h4>
              <p className="appointment-time">{getTimeSlotLabel()}</p>
            </div>

            <div className="address-details">
              <p>{data.address}</p>
              {data.suite && <p>{data.suite}</p>}
              <p>{data.city}, {data.state} {data.zipCode}</p>
            </div>
          </div>

          <div className="pricing-breakdown">
            <h3 className="pricing-title">Estimated Price</h3>
            <div className="price-line">
              <span>Service Cost</span>
              <span>${data.estimatedPrice}</span>
            </div>
            {data.tipPercentage > 0 && (
              <div className="price-line">
                <span>Tip ({data.tipPercentage}%)</span>
                <span>${calculateTip()}</span>
              </div>
            )}
            <div className="price-line total">
              <span><strong>Total</strong></span>
              <span><strong>${calculateTotal()}</strong></span>
            </div>
            <p className="duration-text">Duration: {data.duration}</p>
          </div>
        </div>

        <div className="payment-section">
          <h3 className="payment-title">Payment Information</h3>
          
          <div className="payment-form">
            <div className="form-group">
              <label className="form-label">Card Number</label>
              <input
                type="text"
                className="form-input"
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Expiry Date</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="MM/YY"
                  maxLength="5"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">CVV</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="123"
                  maxLength="4"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Cardholder Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Conditional Billing Address Section */}
          {!data.billingAddressSame && (
            <div className="billing-address-section">
              <h3 className="billing-title">Billing Address</h3>
              
              <div className="billing-form">
                <div className="form-group">
                  <label className="form-label">Street Address *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.billingAddress || ''}
                    onChange={(e) => updateData('billingAddress', e.target.value)}
                    placeholder="Enter billing address"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Suite or Apartment (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.billingSuite || ''}
                    onChange={(e) => updateData('billingSuite', e.target.value)}
                    placeholder="Apt, Suite, Unit, etc."
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={data.billingCity || ''}
                      onChange={(e) => updateData('billingCity', e.target.value)}
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <select
                      className="form-select"
                      value={data.billingState || ''}
                      onChange={(e) => updateData('billingState', e.target.value)}
                    >
                      <option value="">Select State</option>
                      {['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
                        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
                        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
                        'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
                        'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'].map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Zip Code *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={data.billingZipCode || ''}
                      onChange={(e) => updateData('billingZipCode', e.target.value)}
                      placeholder="12345"
                      maxLength="10"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="payment-note">
            <p>
              <strong>Note:</strong> Your card will be charged ${calculateTotal()} upon booking confirmation. 
              You will receive a confirmation email with all the details.
            </p>
          </div>
        </div>
      </div>

      <div className="final-actions">
        <div className="btn-group">
          <button type="button" className="btn-secondary" onClick={onPrev}>
            Back
          </button>
          <button 
            type="button" 
            className="btn-primary schedule-btn"
            onClick={onSchedule}
          >
            SCHEDULE NOW
          </button>
        </div>
      </div>

      <div className="tagline">
        <h2 className="tagline-text">Let Life Shine</h2>
      </div>
    </div>
  );
};

export default PaymentSummary;