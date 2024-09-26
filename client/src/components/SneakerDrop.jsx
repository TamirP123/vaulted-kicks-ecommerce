import React, { useState } from 'react';
import '../styles/SneakerDrop.css';

const SneakerDrop = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted email:', email);
    setIsSubmitted(true);
  };

  return (
    <section className="sneaker-drop">
      <div className="sneaker-drop-content">
        <h2>Join the <span className="highlight">SneakerDrop</span></h2>
        <p>Be the first to know about exclusive releases, special offers, and the latest sneaker news!</p>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="sneaker-drop-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        ) : (
          <div className="success-message">
            <p>You're in! Get ready for some awesome sneaker drops.</p>
          </div>
        )}
      </div>
      <div className="sneaker-drop-image">
        <img src="/public/assets/newsletterShoe.png" alt="Exclusive Sneaker Drop" />
      </div>
    </section>
  );
};

export default SneakerDrop;