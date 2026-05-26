function Contact() {
  return (
    <section className="section">
      <h2>Contact Us</h2>

      <form className="contact-form">

        <input type="text" placeholder="Enter Name" />

        <input type="email" placeholder="Enter Email" />

        <textarea placeholder="Enter Message"></textarea>

        <button className="btn">Send Message</button>

      </form>
    </section>
  )
}

export default Contact