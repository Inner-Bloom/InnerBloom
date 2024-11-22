import React from 'react';

const Support = () => {
  return (
    <div style={{ margin: '0 auto', maxWidth: '800px', padding: '20px', lineHeight: '1.6' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5em', color: '#4A4A4A' }}>Support</h1>
        <p style={{ fontSize: '1.2em', color: '#7D7D7D' }}>
          We're here to help you with any issues or questions you may have.
        </p>
      </header>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8em', color: '#4A4A4A', marginBottom: '10px' }}>Frequently Asked Questions</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '15px' }}>
            <strong>How do I track my mood?</strong>
            <p>You can log your mood daily using the "Check-In" feature on the home page.</p>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <strong>Can I edit my entries?</strong>
            <p>Yes, you can go back and edit your daily logs if needed.</p>
          </li>
          <li style={{ marginBottom: '15px' }}>
            <strong>How do I reset my password?</strong>
            <p>Click on "Forgot Password" on the login page and follow the instructions.</p>
          </li>
        </ul>
      </section>
      
    </div>
  );
};

export default Support;
