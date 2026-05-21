function Contact() {
  return (
    <section className="section">
      <h2>Contact Us</h2>

      <form className="contact-form">
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email Address" />
        <textarea placeholder="Message"></textarea>

        <button>Send Message</button>
      </form>
    </section>
  );
}

export default Contact;