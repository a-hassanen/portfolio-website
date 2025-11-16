import React from "react";
import "../styles/AboutMe.css";

const AboutMe = ({ aboutme }) => {
  return (
    <section className="about-section">
      <h2 className="about-title">About Me</h2>
      <p className="about-text">{aboutme.description}</p>
    </section>
  );
};

export default AboutMe;