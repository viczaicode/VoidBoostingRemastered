function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <span className="about-badge">About Us</span>
          <h1>Reliable boosting, fair communication, real people</h1>
          <p>
            We built this platform to make premium game services transparent,
            safe and easy to use. Our focus is quality delivery, clear updates,
            and respectful customer support from start to finish.
          </p>
        </div>
      </section>

      <section className="about-values">
        <div className="container about-grid">
          <article className="about-card">
            <i className="fa-solid fa-shield-halved"></i>
            <h3>Security First</h3>
            <p>
              Account safety and privacy are core priorities. Every order is
              handled with strict operational standards and careful process flow.
            </p>
          </article>

          <article className="about-card">
            <i className="fa-solid fa-comments"></i>
            <h3>Clear Communication</h3>
            <p>
              We keep clients informed with predictable updates, realistic timing,
              and honest status tracking throughout each order.
            </p>
          </article>

          <article className="about-card">
            <i className="fa-solid fa-trophy"></i>
            <h3>Result-Oriented Team</h3>
            <p>
              Our boosters and managers work together in a structured workflow
              to deliver high-quality outcomes consistently.
            </p>
          </article>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="about-story-card">
            <h2>Our mission</h2>
            <p>
              Our mission is simple: offer a premium, trustworthy boosting
              experience where customers always know what is happening with their
              order. We continuously improve our systems, panel workflow and user
              experience so every interaction feels professional.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;

