import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="section">
      <h2>Contact Us</h2>

      <form className="contact-form">
        <input type="text" placeholder="Enter Name" />
        <input type="email" placeholder="Enter Email" />
        <textarea placeholder="Message"></textarea>

        <button>Send Message</button>
      </form>
    </section>
  );
};

export default Contact;