import React from 'react';

const CleaningSelection = ({ data, updateData, updateMultipleFields, onNext, onPrev }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const cleaningFrequencies = [
    'One-Time',
    'Weekly',
    'Every 2 Weeks',
    'Every 4 Weeks'
  ];

  const cleaningPackages = [
    'Design with Time',
    'Deep Clean',
    'Move In/Move Out'
  ];

  // Calculate estimated price based on selections
  const calculatePrice = () => {
    let basePrice = 75;

    // Ensure minimum pricing when no rooms are selected
    if (data.bedrooms === 0 && data.bathrooms === 0) {
      basePrice = 75; // Minimum base price
    } else {
      if (data.bedrooms === 1) {
        basePrice = 100;
      }
      // Add cost based on home size
      basePrice = basePrice + (data.bedrooms * 25);
      basePrice = basePrice + (data.bathrooms * 15);
    }
    //basePrice = basePrice + (Math.floor(data.squareFootage / 100) * 5);
    
    // Package pricing
    if (data.cleaningPackage === 'Deep Clean') {
      basePrice = basePrice * 1.5;
    } else if (data.cleaningPackage === 'Move In/Move Out') {
      basePrice = basePrice * 2.5;
    }
    
    // Frequency discount
    if (data.cleaningType === 'Weekly') {
      basePrice = basePrice * 0.85;
    } else if (data.cleaningType === 'Every 2 Weeks') {
      basePrice = basePrice * 0.9;
    } else if (data.cleaningType === 'Every 4 Weeks') {
      basePrice = basePrice * 0.95;  
    }
    
    return Math.round(basePrice * 100) / 100;
  };

  // Calculate duration based on cleaning package and home size
  const calculateDuration = () => {
    let baseDuration = 2; // Base duration in hours for regular cleaning
    
    // Adjust base duration based on home size
    const roomCount = data.bedrooms + data.bathrooms;
    if (roomCount <= 3) {
      baseDuration = 2;
    } else if (roomCount <= 5) {
      baseDuration = 3;
    } else {
      baseDuration = 4;
    }
    
    // Package-specific durations
    if (data.cleaningPackage === 'Deep Clean') {
      return '5-6 Hours';
    } else if (data.cleaningPackage === 'Move In/Move Out') {
      return '6-8 Hours';
    } else {
      // Design with Time (regular cleaning)
      return `${baseDuration}-${baseDuration + 1} Hours`;
    }
  };

  React.useEffect(() => {
    const newPrice = calculatePrice();
    const newDuration = calculateDuration();
    updateMultipleFields({
      estimatedPrice: newPrice,
      duration: newDuration
    });
  }, [data.bedrooms, data.bathrooms, data.squareFootage, data.cleaningType, data.cleaningPackage]);

  return (
    <div className="booking-step">
      <h2 className="step-title-main">What Type of Cleaning Would You Like?</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="cleaning-main-container">
          <div className="cleaning-left-section">
            <div className="frequency-section">
              <div className="frequency-options-horizontal">
                {cleaningFrequencies.map((frequency) => (
                  <label key={frequency} className="radio-option-horizontal">
                    <input
                      type="radio"
                      name="cleaningType"
                      value={frequency}
                      checked={data.cleaningType === frequency}
                      onChange={(e) => updateData('cleaningType', e.target.value)}
                    />
                    <span className="radio-label">{frequency}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="package-section">
              <h3>Select a Cleaning Package</h3>
              <div className="package-options-horizontal">
                {cleaningPackages.map((pkg) => (
                  <button
                    key={pkg}
                    type="button"
                    className={`package-btn-horizontal ${data.cleaningPackage === pkg ? 'selected' : ''}`}
                    onClick={() => updateData('cleaningPackage', pkg)}
                  >
                    {pkg}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="price-estimate-right">
            <h3 className="price-title">Estimated Price</h3>
            <div className="price-amount">${data.estimatedPrice}</div>
            <div className="price-duration">Duration: {data.duration}</div>
            <button type="submit" className="schedule-btn">
              Schedule Cleaning
            </button>
          </div>
        </div>

        <div className="btn-group">
          <button type="button" className="btn-secondary" onClick={onPrev}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default CleaningSelection;