import React, { useState, useEffect, useRef } from 'react'
import './QuoteModal.css'

export default function QuoteModal({ open, onClose }) {
  const formRef = useRef(null)
  const [status, setStatus] = useState(null)
  const [resultMsg, setResultMsg] = useState('')
  const [phoneValue, setPhoneValue] = useState('')
  const [errors, setErrors] = useState({})

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

  useEffect(() => {
    if (!open) {
      setStatus(null)
      setResultMsg('')
      setPhoneValue('')
      setErrors({})
    }
  }, [open])

  const validateForm = (formData) => {
    const validationErrors = {}
    
    // Name validation
    const name = formData.get('name')?.trim()
    if (!name) {
      validationErrors.name = 'Name is required. Please enter your full name.'
    } else if (name.length < 2) {
      validationErrors.name = 'Name must be at least 2 characters long.'
    }

    // Email validation
    const email = formData.get('email')?.trim()
    if (!email) {
      validationErrors.email = 'Email is required. Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Please enter a valid email address.'
    }

    // Phone validation (required field)
    const phone = getUnformattedPhone(phoneValue.trim())
    if (!phone) {
      validationErrors.phone = 'Mobile number is required. Please enter your mobile number.'
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

    // Message validation
    const message = formData.get('message')?.trim()
    if (!message) {
      validationErrors.message = 'Message is required. Please tell us about the job.'
    } else if (message.length < 10) {
      validationErrors.message = 'Message must be at least 10 characters long.'
    }

    return validationErrors
  }

  if (!open) return null

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
      fd.append('access_key', WEB3_KEY)
      fd.append('subject', 'Quote request from website')

      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: fd })
      const data = await res.json()

      if (data.success) {
        setStatus('sent')
        setResultMsg('Form Submitted Successfully')
        e.target.reset()
        setPhoneValue('')
        setErrors({})
        setTimeout(() => {
          setStatus(null)
          setResultMsg('')
          onClose()
        }, 1400)
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
    <div className="quote-overlay" role="dialog" aria-modal="true" aria-label="Get a quote">
      <div className="quote-modal">
        <button className="quote-close" onClick={onClose} aria-label="Close">×</button>
        <h2>Get a Quote</h2>

        <form ref={formRef} className="quote-form" onSubmit={onSubmit} noValidate>
          <div className="row">
            <input 
              name="name" 
              placeholder="Full name" 
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className="row">
            <div className="input-group">
              <input 
                name="email" 
                type="email" 
                placeholder="Email" 
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <div className="field-error">{errors.email}</div>}
            </div>
            <div className="input-group">
              <input
                type="tel"
                name="phone"
                placeholder="Mobile number (e.g., (123) 456-7890)"
                value={phoneValue}
                onChange={handlePhoneChange}
                className={errors.phone ? 'error' : ''}
                maxLength={14}
              />
              {errors.phone && <div className="field-error">{errors.phone}</div>}
            </div>
          </div>

          <div className="row">
            <input 
              name="zip" 
              placeholder="Zip code" 
              className={errors.zip ? 'error' : ''}
            />
            {errors.zip && <div className="field-error">{errors.zip}</div>}
          </div>

          <div className="row">
            <textarea 
              name="message" 
              placeholder="Tell us about the job" 
              rows={5} 
              className={errors.message ? 'error' : ''}
            />
            {errors.message && <div className="field-error">{errors.message}</div>}
          </div>

          <div className="row actions">
            <button type="submit" className="btn">Submit</button>
            <button type="button" className="btn" onClick={onClose}>Cancel</button>
          </div>
        </form>

        <div className="quote-status">
          {status === 'sending' && <p>{resultMsg}</p>}
          {status === 'error' && <p className="error">There was an error sending: {resultMsg}</p>}
          {status === 'sent' && <p className="success">{resultMsg}</p>}
        </div>
      </div>
    </div>
  )
}
