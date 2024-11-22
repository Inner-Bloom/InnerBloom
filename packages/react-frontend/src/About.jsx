import React from 'react';

const About = () => {
  return (
    <div style={{ margin: '0 auto', maxWidth: '800px', padding: '20px', lineHeight: '1.6' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5em' }}>About Inner Bloom</h1>
        <p style={{ fontSize: '1.2em' }}>
          Your personal mental health and wellness tracker
        </p>
      </header>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8em', marginBottom: '10px' }}>What is Inner Bloom?</h2>
        <p>
          Inner Bloom is a wellness tracker designed to help you understand and improve your mental health and daily habits. 
          Whether you're looking to manage your emotions, improve your sleep patterns, or monitor your overall well-being, Inner Bloom is here to support you.
        </p>
      </section>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8em', marginBottom: '10px' }}>Key Features</h2>
        <ul style={{ listStyleType: 'circle', marginLeft: '20px', marginTop: '15px' }}>
          <li>Track your mood, thoughts, and feelings</li>
          <li>Monitor your sleeping habits with detailed insights</li>
          <li>Log daily activities and their impact on your mental health</li>
          <li>Gain awareness of patterns in your emotional and physical health</li>
        </ul>
      </section>
      
      <section>
        <h2 style={{ fontSize: '1.8em', marginBottom: '10px' }}>Why Choose Inner Bloom?</h2>
        <p>
          Inner Bloom stands out by focusing on both mental health and sleeping habits, allowing users to connect the dots 
          between their lifestyle choices and their emotional well-being. With an easy-to-use interface, it's perfect for anyone 
          looking to prioritize their mental health in a structured and meaningful way.
        </p>
      </section>
    </div>
  );
};

export default About;
