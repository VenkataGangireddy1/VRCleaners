import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Booking.css';
import ContactInformation from './ContactInformation';
import HomeDetails from './HomeDetails';
import CleaningSelection from './CleaningSelection';
import DateTimeSelection from './DateTimeSelection';
import AddressInfo from './AddressInfo';
import PaymentSummary from './PaymentSummary';

const Booking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    // Contact Information
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    
    // Home Details
    bedrooms: 0,
    bathrooms: 0,
    people: 0,
    pets: 0,
    
    // Cleaning Selection
    cleaningType: 'One-Time',
    cleaningPackage: 'Design with Time',
    
    // Date & Time
    selectedDate: null,
    selectedTime: null,
    
    // Address
    address: '',
    suite: '',
    city: '',
    state: '',
    zipCode: '',
    billingAddressSame: true,
    
    // Billing Address (when different from cleaning address)
    billingAddress: '',
    billingSuite: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    
    // Tip
    tipPercentage: 15,
    
    // Pricing
    estimatedPrice: 204.58,
    duration: '2-3 Hours'
  });

  const updateBookingData = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateMultipleFields = (fields) => {
    setBookingData(prev => ({
      ...prev,
      ...fields
    }));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const handleScheduleNow = () => {
    // Handle final booking submission
    console.log('Booking submitted:', bookingData);
    alert('Your cleaning has been scheduled successfully!');
    navigate('/');
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      <div className="step-progress">
        <div 
          className={`step clickable ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}
          onClick={() => goToStep(1)}
        >
          <div className="step-number">1</div>
          <div className="step-label">
            <span className="step-title">CONTACT</span>
            <span className="step-subtitle">INFORMATION</span>
          </div>
        </div>
        
        <div 
          className={`step clickable ${currentStep >= 2 ? 'active' : ''} ${currentStep > 5 ? 'completed' : ''}`}
          onClick={() => {
            if (currentStep >= 2) {
              goToStep(2);
            }
          }}
        >
          <div className="step-number">2</div>
          <div className="step-label">
            <span className="step-title">SCHEDULE</span>
            <span className="step-subtitle">CLEANING</span>
          </div>
        </div>
        
        <div 
          className={`step clickable ${currentStep >= 6 ? 'active' : ''} ${currentStep > 6 ? 'completed' : ''}`}
          onClick={() => {
            if (currentStep >= 6) {
              goToStep(6);
            }
          }}
        >
          <div className="step-number">3</div>
          <div className="step-label">
            <span className="step-title">REVIEW &</span>
            <span className="step-subtitle">PURCHASE</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ContactInformation
            data={bookingData}
            updateData={updateBookingData}
            updateMultipleFields={updateMultipleFields}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <HomeDetails
            data={bookingData}
            updateData={updateBookingData}
            updateMultipleFields={updateMultipleFields}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <CleaningSelection
            data={bookingData}
            updateData={updateBookingData}
            updateMultipleFields={updateMultipleFields}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <DateTimeSelection
            data={bookingData}
            updateData={updateBookingData}
            updateMultipleFields={updateMultipleFields}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 5:
        return (
          <AddressInfo
            data={bookingData}
            updateData={updateBookingData}
            updateMultipleFields={updateMultipleFields}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 6:
        return (
          <PaymentSummary
            data={bookingData}
            updateData={updateBookingData}
            onSchedule={handleScheduleNow}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="booking-container">
      <div className="booking-header">
        <h1>Let's Get Started</h1>
        <p>Let VR Cleaners do all of the dirty work for you. Focus on everything else you need to get done and schedule a cleaning with us today.</p>
      </div>

      {renderStepIndicator()}
      
      <div className="booking-content">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default Booking;