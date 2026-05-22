function Contact() {
  return (
    <section id="contact">
      <h1 className="title">Contact Us</h1>

      <div className="card">

        <input type="text" placeholder="Your Name" />
        <br /><br />

        <input type="email" placeholder="Your Email" />
        <br /><br />

        <textarea placeholder="Your Message"></textarea>
        <br /><br />

        <button className="btn">Send Message</button>

      </div>
    </section>
  );
}

export default Contact;