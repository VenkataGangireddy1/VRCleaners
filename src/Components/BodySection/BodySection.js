import React from "react";
import "./BodySection.css";
import cleaning8 from "../../assets/cleaning8.jpeg";

export default function BodySection() {
  return (
    <section className="body-section">
      <div className="body-text">
        <h2>We Clean Your Home So You Don’t Have To!</h2>
        <h3>
          VR Cleaners for Your House Cleaning Needs in
          Pennsylvania
        </h3>
        <p>
          Does this scenario sound familiar? You’ve been driving for over an
          hour in heavy traffic on your route back from work. When you pull into
          the driveway, all you can think about is dropping your bags at the
          door, begrudgingly climbing two sets of stairs, and collapsing in a
          pile of soft blankets to drift off into sleep for the rest of the
          evening. But when you open the door, all you see is a mess that should
          probably be cleaned tonight.
        </p>
      </div>
      <div className="body-image">
        <img src={cleaning8} alt="Cleaning service" />
      </div>
    </section>
  );
}
