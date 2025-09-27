import React from 'react'
import './Benifits.css'
import cleaning1 from '../../assets/cleaning1.jpeg'
import cleaning18 from '../../assets/cleaning18.jpeg'
import cleaning24 from '../../assets/cleaning24.jpeg'

export const Benifits = () => {
  return (
    <div className="benifits-wrapper">
      <div className="benifits">
        <div className="cleaning">
          <img src={cleaning1} alt="Cleaning Service 1" />
        </div>
        <div className="cleaning">
          <img src={cleaning18} alt="Cleaning Service 2" />
        </div>
        <div className="cleaning">
          <img src={cleaning24} alt="Cleaning Service 3" />
        </div>
      </div>
    </div>
  )
}

