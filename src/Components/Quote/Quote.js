import React, { useState, useRef } from 'react'
import './Quote.css'

export default function Quote() {
  const formRef = useRef(null)
  const [status, setStatus] = useState(null)
  const [resultMsg, setResultMsg] = useState('')
  const [phoneValue, setPhoneValue] = useState('')
  const [errors, setErrors] = useState({})
  const [bedrooms, setBedrooms] = useState(0)
  const [bathrooms, setBathrooms] = useState(0)
  const [pets, setPets] = useState(0)
  const [people, setPeople] = useState(0)
  const [cleaningType, setCleaningType] = useState('Regular Cleaning')
  const [frequency, setFrequency] = useState('One-time')

  const WEB3_KEY = (process.env.REACT_APP_WEB3FORMS_ACCESS_KEY || '').trim()

  // Format phone number as user types
  const formatPhoneNumber = (value) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/[^\d]/g, '')
    
    // Apply US phone number formatting
    if (phoneNumber.length === 0) return ''
    if (phoneNumber.length <= 3) return phoneNumber
    if (phoneNumber.length <= 6) return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
  }

  // Handle phone number input change
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value
    const formattedValue = formatPhoneNumber(inputValue)
    setPhoneValue(formattedValue)
  }

  // Get unformatted phone number for validation and submission
  const getUnformattedPhone = (formattedPhone) => {
    return formattedPhone.replace(/[^\d]/g, '')
  }

  const validateForm = (formData) => {
    const validationErrors = {}
    
    // First name validation
    const firstName = formData.get('first_name')?.trim()
    if (!firstName) {
      validationErrors.first_name = 'First name is required.'
    } else if (firstName.length < 2) {
      validationErrors.first_name = 'First name must be at least 2 characters long.'
    }

    // Last name validation
    const lastName = formData.get('last_name')?.trim()
    if (!lastName) {
      validationErrors.last_name = 'Last name is required.'
    } else if (lastName.length < 2) {
      validationErrors.last_name = 'Last name must be at least 2 characters long.'
    }

    // Address validation
    const address = formData.get('address')?.trim()
    if (!address) {
      validationErrors.address = 'Address is required.'
    } else if (address.length < 5) {
      validationErrors.address = 'Please enter a complete address.'
    }

    // City validation
    const city = formData.get('city')?.trim()
    if (!city) {
      validationErrors.city = 'City is required.'
    } else if (city.length < 2) {
      validationErrors.city = 'Please enter a valid city name.'
    }

    // State validation
    const state = formData.get('state')?.trim()
    if (!state) {
      validationErrors.state = 'State is required.'
    } else if (state.length < 2) {
      validationErrors.state = 'Please select a valid state.'
    }

    // Email validation
    const email = formData.get('email')?.trim()
    if (!email) {
      validationErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Please enter a valid email address.'
    }

    // Phone validation (required field)
    const phone = getUnformattedPhone(phoneValue.trim())
    if (!phone) {
      validationErrors.phone = 'Mobile number is required.'
    } else if (phone.length !== 10) {
      validationErrors.phone = 'Please enter a valid 10-digit US mobile number.'
    } else if (!/^\d{10}$/.test(phone)) {
      validationErrors.phone = 'Please enter a valid mobile number with digits only.'
    }

    // Zip code validation (required field)
    const zip = formData.get('zip')?.trim()
    if (!zip) {
      validationErrors.zip = 'Zip code is required. Please enter your zip code.'
    } else if (!/^\d{5}(-\d{4})?$/.test(zip)) {
      validationErrors.zip = 'Please enter a valid zip code (e.g., 12345 or 12345-6789).'
    }

    // Message validation (optional but if provided, should be meaningful)
    const message = formData.get('message')?.trim()
    if (message && message.length > 0 && message.length < 10) {
      validationErrors.message = 'Message must be at least 10 characters long if provided.'
    }

    // Cleaning type validation
    if (!cleaningType) {
      validationErrors.cleaning_type = 'Please select a type of cleaning service.'
    }

    // Frequency validation
    if (!frequency) {
      validationErrors.frequency = 'Please select a cleaning frequency.'
    }

    // Bedrooms validation
    if (bedrooms < 0) {
      validationErrors.bedrooms = 'Number of bedrooms cannot be negative.'
    } else if (bedrooms > 20) {
      validationErrors.bedrooms = 'Please enter a reasonable number of bedrooms (max 20).'
    }

    // Bathrooms validation
    if (bathrooms < 0) {
      validationErrors.bathrooms = 'Number of bathrooms cannot be negative.'
    } else if (bathrooms > 20) {
      validationErrors.bathrooms = 'Please enter a reasonable number of bathrooms (max 20).'
    }

    // People validation
    if (people < 0) {
      validationErrors.people = 'Number of people cannot be negative.'
    } else if (people > 50) {
      validationErrors.people = 'Please enter a reasonable number of people (max 50).'
    }

    // Pets validation
    if (pets < 0) {
      validationErrors.pets = 'Number of pets cannot be negative.'
    } else if (pets > 20) {
      validationErrors.pets = 'Please enter a reasonable number of pets (max 20).'
    }

    // Check if at least one room is specified
    if (bedrooms === 0 && bathrooms === 0) {
      validationErrors.rooms = 'Please specify at least one bedroom or bathroom.'
    }

    return validationErrors
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    
    // Clear previous errors
    setErrors({})
    setStatus(null)
    setResultMsg('')

    // Validate form
    const fd = new FormData(e.target)
    const validationErrors = validateForm(fd)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setStatus('error')
      setResultMsg('Please fix the errors below and try again.')
      // Scroll to first error
      setTimeout(() => {
        const firstError = document.querySelector('.field-error')
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
      return
    }

    setStatus('sending')
    setResultMsg('Sending...')
    
    try {
      if (!WEB3_KEY) {
        setStatus('error')
        setResultMsg('Missing REACT_APP_WEB3FORMS_ACCESS_KEY. Check your .env and restart the dev server.')
        return
      }

      // Format phone number for email submission (US format: +1-XXX-XXX-XXXX)
      if (phoneValue) {
        const unformattedPhone = getUnformattedPhone(phoneValue)
        const formattedForEmail = `+1-${unformattedPhone.slice(0,3)}-${unformattedPhone.slice(3,6)}-${unformattedPhone.slice(6,10)}`
        fd.set('phone', formattedForEmail)
      }
      
      // Add cleaning details to form data
  fd.append('cleaning_type', cleaningType)
  fd.append('frequency', frequency)
  fd.append('bedrooms', bedrooms)
  fd.append('bathrooms', bathrooms)
  fd.append('people', people)
  fd.append('pets', pets)
      
      // Create a detailed email message with all information
      const firstName = fd.get('first_name') || ''
      const lastName = fd.get('last_name') || ''
      const fullName = `${firstName} ${lastName}`.trim()
      const address = fd.get('address') || ''
      const aptNo = fd.get('apt_no') || ''
      const city = fd.get('city') || ''
      const state = fd.get('state') || ''
      const zip = fd.get('zip') || ''
      const email = fd.get('email') || ''
      const phone = fd.get('phone') || ''
      const message = fd.get('message') || ''
      
  const detailedMessage = `
NEW QUOTE REQUEST RECEIVED
==========================

CUSTOMER INFORMATION:
📝 Name: ${fullName}
📧 Email: ${email}
📱 Phone: ${phone}
🏠 Address: ${address}${aptNo ? ' — ' + aptNo : ''}
🏙️ City: ${city}
🏛️ State: ${state}
📮 Zip Code: ${zip}

CLEANING DETAILS:
🧽 Service Type: ${cleaningType}
⏰ Frequency: ${frequency}
🛏️ Bedrooms: ${bedrooms}
🚿 Bathrooms: ${bathrooms}
👥 People: ${people}
🐾 Pets: ${pets}

ADDITIONAL DETAILS:
💬 Customer Message:
${message || 'No additional details provided.'}

==========================
Please contact this customer within 24 hours to provide a detailed quote.
      `.trim()
      
      // Set the formatted message
      fd.set('message', detailedMessage)
      
      fd.append('access_key', WEB3_KEY)
      fd.append('subject', `Quote Request: ${fullName} - ${cleaningType}, ${frequency} (${bedrooms}BR/${bathrooms}BA/${pets}Pets)`)

      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      const data = await res.json()

      if (data.success) {
        setStatus('sent')
        setResultMsg('Quote request submitted successfully! We will contact you soon.')
        e.target.reset()
        setPhoneValue('')
        setErrors({})
        setBedrooms(0)
        setBathrooms(0)
  setPeople(0)
  setPets(0)
        setCleaningType('Regular Cleaning')
        setFrequency('One-time')
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        console.error('Web3forms error', data)
        setStatus('error')
        setResultMsg(data.message || 'Submission failed')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
      setResultMsg(err.message || String(err))
    }
  }

  return (
    <div className="quote-page">
      <div className="quote-hero">
        <div className="container">
          <h1>Get Your Free Quote</h1>
          <p>Tell us about your cleaning needs and we'll provide you with a customized quote</p>
        </div>
      </div>

      <div className="quote-content">
        <div className="container">
          <div className="quote-form-wrapper">
            {/* Status Messages */}
            {status && (
              <div className={`quote-status ${status}`}>
                {status === 'sending' && (
                  <div className="status-message sending">
                    <div className="spinner"></div>
                    <p>{resultMsg}</p>
                  </div>
                )}
                {status === 'error' && (
                  <div className="status-message error">
                    <div className="error-icon">⚠️</div>
                    <p>{resultMsg}</p>
                  </div>
                )}
                {status === 'sent' && (
                  <div className="status-message success">
                    <div className="success-icon">✅</div>
                    <p>{resultMsg}</p>
                  </div>
                )}
              </div>
            )}

            <form ref={formRef} className="quote-form" onSubmit={onSubmit} noValidate>
              {/* Personal Information */}
              <div className="form-section">
                <h3 className="section-heading">
                  <span className="section-icon">👤</span>
                  Personal Information
                </h3>
                
                <div className="form-grid">
                  <div className="input-group">
                    <label className="input-label">First Name *</label>
                    <input 
                      name="first_name" 
                      placeholder="Enter your first name" 
                      className={errors.first_name ? 'error' : ''}
                    />
                    {errors.first_name && <div className="field-error">{errors.first_name}</div>}
                  </div>
                  
                  <div className="input-group">
                    <label className="input-label">Last Name *</label>
                    <input 
                      name="last_name" 
                      placeholder="Enter your last name" 
                      className={errors.last_name ? 'error' : ''}
                    />
                    {errors.last_name && <div className="field-error">{errors.last_name}</div>}
                  </div>
                </div>

                <div className="form-grid">
                  <div className="input-group">
                    <label className="input-label">Mobile Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="(555) 123-4567"
                      value={phoneValue}
                      onChange={handlePhoneChange}
                      className={errors.phone ? 'error' : ''}
                      maxLength={14}
                    />
                    {errors.phone && <div className="field-error">{errors.phone}</div>}
                  </div>
                  
                  <div className="input-group">
                    <label className="input-label">Email Address *</label>
                    <input 
                      name="email" 
                      type="email" 
                      placeholder="Enter your email address" 
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <div className="field-error">{errors.email}</div>}
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Apt / Suite (optional)</label>
                  <input
                    name="apt_no"
                    placeholder="Apt, Suite, or Unit (e.g., Apt 4B)"
                    className={errors.apt_no ? 'error' : ''}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Street Address *</label>
                  <input 
                    name="address" 
                    placeholder="Enter your complete address" 
                    className={errors.address ? 'error' : ''}
                  />
                  {errors.address && <div className="field-error">{errors.address}</div>}
                </div>

                <div className="form-grid">
                  <div className="input-group">
                    <label className="input-label">City *</label>
                    <input 
                      name="city" 
                      placeholder="Enter your city" 
                      className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <div className="field-error">{errors.city}</div>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">State *</label>
                    <select
                      name="state"
                      className={`state-select ${errors.state ? 'error' : ''}`}
                    >
                      <option value="">Select state</option>
                      <option value="Alabama">Alabama</option>
                      <option value="Alaska">Alaska</option>
                      <option value="Arizona">Arizona</option>
                      <option value="Arkansas">Arkansas</option>
                      <option value="California">California</option>
                      <option value="Colorado">Colorado</option>
                      <option value="Connecticut">Connecticut</option>
                      <option value="Delaware">Delaware</option>
                      <option value="District of Columbia">District of Columbia</option>
                      <option value="Florida">Florida</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Hawaii">Hawaii</option>
                      <option value="Idaho">Idaho</option>
                      <option value="Illinois">Illinois</option>
                      <option value="Indiana">Indiana</option>
                      <option value="Iowa">Iowa</option>
                      <option value="Kansas">Kansas</option>
                      <option value="Kentucky">Kentucky</option>
                      <option value="Louisiana">Louisiana</option>
                      <option value="Maine">Maine</option>
                      <option value="Maryland">Maryland</option>
                      <option value="Massachusetts">Massachusetts</option>
                      <option value="Michigan">Michigan</option>
                      <option value="Minnesota">Minnesota</option>
                      <option value="Mississippi">Mississippi</option>
                      <option value="Missouri">Missouri</option>
                      <option value="Montana">Montana</option>
                      <option value="Nebraska">Nebraska</option>
                      <option value="Nevada">Nevada</option>
                      <option value="New Hampshire">New Hampshire</option>
                      <option value="New Jersey">New Jersey</option>
                      <option value="New Mexico">New Mexico</option>
                      <option value="New York">New York</option>
                      <option value="North Carolina">North Carolina</option>
                      <option value="North Dakota">North Dakota</option>
                      <option value="Ohio">Ohio</option>
                      <option value="Oklahoma">Oklahoma</option>
                      <option value="Oregon">Oregon</option>
                      <option value="Pennsylvania">Pennsylvania</option>
                      <option value="Rhode Island">Rhode Island</option>
                      <option value="South Carolina">South Carolina</option>
                      <option value="South Dakota">South Dakota</option>
                      <option value="Tennessee">Tennessee</option>
                      <option value="Texas">Texas</option>
                      <option value="Utah">Utah</option>
                      <option value="Vermont">Vermont</option>
                      <option value="Virginia">Virginia</option>
                      <option value="Washington">Washington</option>
                      <option value="West Virginia">West Virginia</option>
                      <option value="Wisconsin">Wisconsin</option>
                      <option value="Wyoming">Wyoming</option>
                    </select>
                    {errors.state && <div className="field-error">{errors.state}</div>}
                  </div>

                  <div className="input-group">
                    <label className="input-label">Zip Code *</label>
                    <input 
                      name="zip" 
                      placeholder="Enter zip code" 
                      className={errors.zip ? 'error' : ''}
                    />
                    {errors.zip && <div className="field-error">{errors.zip}</div>}
                  </div>
                </div>
              </div>

              {/* Cleaning Details */}
              <div className="form-section">
                <h3 className="section-heading">
                  <span className="section-icon">🧽</span>
                  Cleaning Details
                </h3>
                
                <div className="input-group">
                  <label className="input-label">Type of Cleaning *</label>
                  <div className="cleaning-type-grid">
                    {[
                      { value: 'Regular Cleaning', label: 'Regular Cleaning', description: 'Weekly, bi-weekly, or monthly cleaning' },
                      { value: 'Deep Cleaning', label: 'Deep Cleaning', description: 'Thorough cleaning for all areas' },
                      { value: 'Move In/Move Out', label: 'Move In/Out', description: 'Complete cleaning for moving' }
                    ].map((type) => (
                      <label key={type.value} className="cleaning-option">
                        <input
                          type="radio"
                          name="cleaning_type"
                          value={type.value}
                          checked={cleaningType === type.value}
                          onChange={(e) => setCleaningType(e.target.value)}
                        />
                        <div className="option-content">
                          <span className="option-title">{type.label}</span>
                          <span className="option-description">{type.description}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.cleaning_type && <div className="field-error">{errors.cleaning_type}</div>}
                </div>

                <div className="input-group">
                  <label className="input-label">Cleaning Frequency *</label>
                  <div className="cleaning-type-grid">
                    {[
                      { value: 'One-time', label: 'One-time', description: 'Single cleaning service' },
                      { value: 'Weekly', label: 'Weekly', description: 'Every week cleaning' },
                      { value: 'Bi-weekly', label: 'Bi-weekly', description: 'Every 2 weeks cleaning' },
                      { value: 'Monthly', label: 'Monthly', description: 'Once a month cleaning' }
                    ].map((freq) => (
                      <label key={freq.value} className="cleaning-option">
                        <input
                          type="radio"
                          name="frequency"
                          value={freq.value}
                          checked={frequency === freq.value}
                          onChange={(e) => setFrequency(e.target.value)}
                        />
                        <div className="option-content">
                          <span className="option-title">{freq.label}</span>
                          <span className="option-description">{freq.description}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.frequency && <div className="field-error">{errors.frequency}</div>}
                </div>

                <div className="home-details">
                  <div className="counter-group">
                    <label className="input-label">Number of Bedrooms</label>
                    <div className="counter">
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setBedrooms(Math.max(0, bedrooms - 1))}
                        disabled={bedrooms === 0}
                      >
                        -
                      </button>
                      <span className="counter-value">{bedrooms}</span>
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setBedrooms(bedrooms + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="counter-group">
                    <label className="input-label">Number of Bathrooms</label>
                    <div className="counter">
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setBathrooms(Math.max(0, bathrooms - 1))}
                        disabled={bathrooms === 0}
                      >
                        -
                      </button>
                      <span className="counter-value">{bathrooms}</span>
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setBathrooms(bathrooms + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="counter-group">
                    <label className="input-label">Number of People</label>
                    <div className="counter">
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setPeople(Math.max(0, people - 1))}
                        disabled={people === 0}
                      >
                        -
                      </button>
                      <span className="counter-value">{people}</span>
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setPeople(people + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="counter-group">
                    <label className="input-label">Number of Pets</label>
                    <div className="counter">
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setPets(Math.max(0, pets - 1))}
                        disabled={pets === 0}
                      >
                        -
                      </button>
                      <span className="counter-value">{pets}</span>
                      <button
                        type="button"
                        className="counter-btn"
                        onClick={() => setPets(pets + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Error messages for bedrooms, bathrooms, pets, and rooms */}
                {errors.bedrooms && <div className="field-error">{errors.bedrooms}</div>}
                {errors.bathrooms && <div className="field-error">{errors.bathrooms}</div>}
                {errors.people && <div className="field-error">{errors.people}</div>}
                {errors.pets && <div className="field-error">{errors.pets}</div>}
                {errors.rooms && <div className="field-error">{errors.rooms}</div>}

                <div className="input-group">
                  <label className="input-label">Additional Details (Optional)</label>
                  <textarea 
                    name="message" 
                    placeholder="Tell us about any specific cleaning requirements, preferred timing, or other details (optional)..." 
                    rows={5} 
                    className={errors.message ? 'error' : ''}
                  />
                  {errors.message && <div className="field-error">{errors.message}</div>}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Submitting...' : 'Submit Quote Request'}
                </button>
                <p className="form-note">* Required fields</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}