import React from "react";
import "./BodySection.css";
import cleaning8 from "../../assets/cleaning8.jpeg";

export default function BodySection() {
  return (
    <section className="body-section">
      <div className="body-text">
        <h2>Relax — We'll Handle the Cleaning</h2>
        <h3>Reliable, eco-friendly home cleaning across Pennsylvania</h3>
        <p>
          At VR Cleaners, we take the chore out of your day. Our vetted
          professionals arrive on time, use safe, effective products, and
          tailor every clean to your home's needs. From quick weekly refreshes
          to thorough deep cleans before special occasions, we deliver
          consistent, spotless results so you can spend time on what matters
          most.
        </p>
      </div>
      <div className="body-image">
        <img src={cleaning8} alt="Cleaning service" />
      </div>
    </section>
  );
}
