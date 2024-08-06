// src/components/ContactForm.js
import React from 'react';
import './ContactForm.css';

const ContactForm = () => {
    return (
        <div className="contact-form">
            <h2>Contact Us</h2>
            <form action="https://web3forms.com/s/your-form-id" method="POST">
                <input type="hidden" name="access_key" value="your-access-key" />
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
                <textarea name="message" placeholder="Your Message" required></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ContactForm;
