import React from 'react'
import Arrow from '../../assets/Arrow.jpeg'
import './Hero.css'
import { useState } from 'react'
import QuoteModal from '../Quote/QuoteModal'

export const Hero = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className='hero'>
      <div className='container'>
        <div className='hero-text'>
          <h1>VR Cleaners</h1>
          <p>Your Trusted Partner in Cleaning Services</p>
          <button className='btn' onClick={() => setOpen(true)}>
            Get a Quote <img src={Arrow} alt="arrow" />
          </button>
        </div>
      </div>
      <QuoteModal open={open} onClose={() => setOpen(false)} />
    </div>
  )
}
