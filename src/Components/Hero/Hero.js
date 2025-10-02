import React from 'react'
import './Hero.css'
import { useNavigate } from 'react-router-dom'

export const Hero = () => {
  const navigate = useNavigate()
  
  return (
    <div className='hero'>
      <div className='container'>
        <div className='hero-text'>
          <h1>VR Home and Commercial Cleaning Services</h1>
          <p>Your Trusted Partner in Cleaning Services</p>
          <button className='btn' onClick={() => navigate('/quote')}>
            Get a Quote
          </button>
        </div>
      </div>
    </div>
  )
}
