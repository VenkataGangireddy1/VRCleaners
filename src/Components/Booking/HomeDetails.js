import React from 'react';

const HomeDetails = ({ data, updateData, updateMultipleFields, onNext, onPrev }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const incrementValue = (field) => {
    updateData(field, data[field] + 1);
  };

  const decrementValue = (field) => {
    if (data[field] > 0) {
      updateData(field, data[field] - 1);
    }
  };



  return (
    <div className="booking-step">
      <div className="home-info-section">
        <h2 className="home-info-title">Tell Us About Your Home</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="home-info-grid">
            <div className="home-info-item">
              <label className="home-info-label">Bedrooms</label>
              <div className="home-counter-group">
                <button 
                  type="button" 
                  className="home-counter-btn"
                  onClick={() => decrementValue('bedrooms')}
                >
                  -
                </button>
                <input
                  type="number"
                  className="home-counter-input"
                  value={data.bedrooms}
                  onChange={(e) => updateData('bedrooms', parseInt(e.target.value) || 0)}
                  min="0"
                  max="10"
                />
                <button 
                  type="button" 
                  className="home-counter-btn"
                  onClick={() => incrementValue('bedrooms')}
                >
                  +
                </button>
              </div>
            </div>

            <div className="home-info-item">
              <label className="home-info-label">Bathrooms</label>
              <div className="home-counter-group">
                <button 
                  type="button" 
                  className="home-counter-btn"
                  onClick={() => decrementValue('bathrooms')}
                >
                  -
                </button>
                <input
                  type="number"
                  className="home-counter-input"
                  value={data.bathrooms}
                  onChange={(e) => updateData('bathrooms', parseInt(e.target.value) || 0)}
                  min="0"
                  max="10"
                />
                <button 
                  type="button" 
                  className="home-counter-btn"
                  onClick={() => incrementValue('bathrooms')}
                >
                  +
                </button>
              </div>
            </div>

            <div className="home-info-item">
              <label className="home-info-label">People</label>
              <div className="home-counter-group">
                <button 
                  type="button" 
                  className="home-counter-btn"
                  onClick={() => decrementValue('people')}
                >
                  -
                </button>
                <input
                  type="number"
                  className="home-counter-input"
                  value={data.people}
                  onChange={(e) => updateData('people', parseInt(e.target.value) || 0)}
                  min="0"
                  max="20"
                />
                <button 
                  type="button" 
                  className="home-counter-btn"
                  onClick={() => incrementValue('people')}
                >
                  +
                </button>
              </div>
            </div>

            <div className="home-info-item">
              <label className="home-info-label">Pets</label>
              <div className="home-counter-group">
                <button 
                  type="button" 
                  className="home-counter-btn"
                  onClick={() => decrementValue('pets')}
                >
                  -
                </button>
                <input
                  type="number"
                  className="home-counter-input"
                  value={data.pets}
                  onChange={(e) => updateData('pets', parseInt(e.target.value) || 0)}
                  min="0"
                  max="10"
                />
                <button 
                  type="button" 
                  className="home-counter-btn"
                  onClick={() => incrementValue('pets')}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="btn-group">
            <button type="button" className="btn-secondary" onClick={onPrev}>
              Back
            </button>
            <button type="submit" className="btn-primary">
              Continue to Cleaning Options
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeDetails;