import React, { useState } from 'react';

const DateTimeSelection = ({ data, updateData, updateMultipleFields, onNext, onPrev }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Dynamic time slots based on cleaning package
  const getTimeSlots = () => {
    if (data.cleaningPackage === 'Deep Clean') {
      return [
        { value: 'early-morning', label: 'Early Morning (7am-1pm)' },
        { value: 'morning', label: 'Morning (8am-2pm)' },
        { value: 'afternoon', label: 'Afternoon (12pm-6pm)' }
      ];
    } else if (data.cleaningPackage === 'Move In/Move Out') {
      return [
        { value: 'early-start', label: 'Early Start (7am-3pm)' },
        { value: 'morning-start', label: 'Morning Start (8am-4pm)' },
        { value: 'midday-start', label: 'Midday Start (10am-6pm)' }
      ];
    } else {
      // Design with Time (regular cleaning) - shorter time slots
      return [
        { value: 'morning', label: 'Morning (8am-11am)' },
        { value: 'midday', label: 'Midday (11am-2pm)' },
        { value: 'afternoon', label: 'Afternoon (2pm-5pm)' }
      ];
    }
  };

  const timeSlots = getTimeSlots();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.selectedDate && data.selectedTime) {
      onNext();
    } else {
      alert('Please select both a date and time slot.');
    }
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateAvailable = (day, month, year) => {
    const date = new Date(year, month, day);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return date >= tomorrow;
  };

  const selectDate = (day) => {
    if (isDateAvailable(day, currentMonth, currentYear)) {
      const selectedDate = new Date(currentYear, currentMonth, day);
      updateData('selectedDate', selectedDate);
    }
  };

  const formatSelectedDate = () => {
    if (data.selectedDate) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return data.selectedDate.toLocaleDateString('en-US', options);
    }
    return '';
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isAvailable = isDateAvailable(day, currentMonth, currentYear);
      const isSelected = data.selectedDate && 
        data.selectedDate.getDate() === day &&
        data.selectedDate.getMonth() === currentMonth &&
        data.selectedDate.getFullYear() === currentYear;

      days.push(
        <div
          key={day}
          className={`calendar-day ${isAvailable ? 'available' : 'unavailable'} ${isSelected ? 'selected' : ''}`}
          onClick={() => selectDate(day)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  return (
    <div className="booking-step">
      <form onSubmit={handleSubmit}>
        <div className="date-time-main-container">
          <div className="calendar-section">
            <h3 className="section-title">Choose Your Day</h3>
            <div className="calendar-header">
              <button 
                type="button" 
                className="nav-btn"
                onClick={() => navigateMonth('prev')}
              >
                &#8249;
              </button>
              
              <div className="month-year">
                <select 
                  value={currentMonth} 
                  onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                  className="month-select"
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>{month}</option>
                  ))}
                </select>
                
                <select 
                  value={currentYear} 
                  onChange={(e) => setCurrentYear(parseInt(e.target.value))}
                  className="year-select"
                >
                  <option value={currentYear}>{currentYear}</option>
                  <option value={currentYear + 1}>{currentYear + 1}</option>
                </select>
              </div>
              
              <button 
                type="button" 
                className="nav-btn"
                onClick={() => navigateMonth('next')}
              >
                &#8250;
              </button>
            </div>

            <div className="calendar-grid">
              <div className="calendar-header-row">
                {daysOfWeek.map(day => (
                  <div key={day} className="calendar-header-day">{day}</div>
                ))}
              </div>
              <div className="calendar-body">
                {renderCalendar()}
              </div>
            </div>
          </div>

          <div className="time-selection">
            <h3 className="section-title">Choose Your Time</h3>
            
            {data.selectedDate ? (
              <>
                <div className="selected-date-summary">{formatSelectedDate()}</div>
                <div className="time-slots">
                  <h4 className="time-subtitle">*Preferred Arrival Window</h4>
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.value}
                      type="button"
                      className={`time-slot ${data.selectedTime === slot.value ? 'selected' : ''}`}
                      onClick={() => updateData('selectedTime', slot.value)}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>

                <div className="time-note">
                  <p>*Your scheduled appointment time may vary from your selection. Please text or call us <strong>(484) 804-4760</strong> if there are specific limitations to your schedule.</p>
                </div>
              </>
            ) : (
              <div className="no-date-selected">
                <p>Please select a date from the calendar to choose your preferred time.</p>
              </div>
            )}
          </div>
        </div>

        <div className="booking-summary-section">
          <h3 className="summary-title">BOOKING SUMMARY</h3>
          <div className="summary-content">
            <div className="summary-service">
              <h4>{data.cleaningPackage}</h4>
              {data.selectedDate && (
                <div className="summary-date">
                  {formatSelectedDate()}
                  {data.selectedTime && (
                    <div className="summary-time">
                      {timeSlots.find(slot => slot.value === data.selectedTime)?.label}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="btn-group">
          <button type="button" className="btn-secondary" onClick={onPrev}>
            Back
          </button>
          <button type="submit" className="btn-primary">
            Continue to Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default DateTimeSelection;