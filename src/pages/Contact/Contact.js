import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    userType: 'farmer'
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: null
  });

  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to your API
    console.log('Form submitted:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus({
        submitted: true,
        error: null
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        userType: 'farmer'
      });
    }, 1000);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I get started as a farmer?",
      answer: "Getting started is simple! Register on our platform, complete your farmer profile with photos and farm details, and create your first listing. Our team provides onboarding support and training to help you succeed."
    },
    {
      question: "What are the platform fees?",
      answer: "We charge 2.5% on primary marketplace transactions (farmer to buyer) and 1% on secondary market trades. Microloan interest rates range from 3-10% annually based on your trust score. These fees are significantly lower than traditional agricultural middlemen."
    },
    {
      question: "How long does it take to receive payment?",
      answer: "For DFRT (ready produce), payment is released immediately upon verified delivery. For DFFT (futures), buyers pay upfront and funds are held in escrow, released automatically when delivery is confirmed."
    },
    {
      question: "What happens if my crop fails?",
      answer: "If a verified crop failure occurs (confirmed by our AI oracle), buyers are automatically refunded from the community liquidity pool, and farmers receive emergency support to help recover."
    },
    {
      question: "Do I need a smartphone to use the platform?",
      answer: "While a smartphone provides the best experience, we also support feature phones through SMS and USSD codes. Our support team can help you access the platform using available technology."
    },
    {
      question: "How is my trust score calculated?",
      answer: "Your trust score is based on successful deliveries (40%), quality ratings (25%), loan repayment history (20%), and community contributions (15%). Higher scores unlock better opportunities and lower loan rates."
    },
    {
      question: "Can I sell internationally?",
      answer: "Yes! Our platform connects you with buyers worldwide. We handle international logistics and compliance, making global trade accessible to small holder farmers."
    },
    {
      question: "What support do you provide for new farmers?",
      answer: "We offer comprehensive onboarding, video tutorials, local-language support, and a cooperative guarantor program for new farmers. Our mentor network connects you with experienced farmers for guidance."
    }
  ];

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-hero__title">Get in Touch</h1>
          <p className="contact-hero__subtitle">
            We're here to help farmers and buyers connect, grow, and succeed
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="contact-main section">
        <div className="container">
          <div className="contact-main__grid">
            {/* Contact Form */}
            <div className="contact-form-wrapper">
              <h2 className="contact-section__title">Send Us a Message</h2>
              <p className="contact-section__description">
                Have a question or need support? Fill out the form below and 
                we'll get back to you within 24 hours.
              </p>

              {formStatus.submitted && (
                <div className="alert alert--success">
                  <strong>Message sent successfully!</strong> We'll respond to 
                  your inquiry within 24 hours.
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name <span className="form-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address <span className="form-required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 700 000 000"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="userType" className="form-label">
                    I am a <span className="form-required">*</span>
                  </label>
                  <select
                    id="userType"
                    name="userType"
                    className="form-select"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                  >
                    <option value="farmer">Farmer</option>
                    <option value="buyer">Buyer</option>
                    <option value="partner">Potential Partner</option>
                    <option value="investor">Investor</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject <span className="form-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-input"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is your inquiry about?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message <span className="form-required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button type="submit" className="btn btn--primary btn--large btn--full">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="contact-info">
              <div className="contact-info-card card">
                <h3 className="contact-info-card__title">Contact Information</h3>
                
                <div className="contact-info-item">
                  <div className="contact-info-item__icon">📧</div>
                  <div className="contact-info-item__content">
                    <h4 className="contact-info-item__label">Email</h4>
                    <a href="mailto:support@agrichain.com" className="contact-info-item__value">
                      support@agrichain.com
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-item__icon">📞</div>
                  <div className="contact-info-item__content">
                    <h4 className="contact-info-item__label">Phone</h4>
                    <a href="tel:+254700000000" className="contact-info-item__value">
                      +254 700 000 000
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-item__icon">💬</div>
                  <div className="contact-info-item__content">
                    <h4 className="contact-info-item__label">WhatsApp</h4>
                    <a href="https://wa.me/254700000000" className="contact-info-item__value" target="_blank" rel="noopener noreferrer">
                      +254 700 000 000
                    </a>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-item__icon">📍</div>
                  <div className="contact-info-item__content">
                    <h4 className="contact-info-item__label">Headquarters</h4>
                    <p className="contact-info-item__value">
                      Innovation Plaza, 3rd Floor<br />
                      Nairobi, Kenya
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-hours card">
                <h3 className="contact-hours__title">Support Hours</h3>
                <div className="contact-hours__list">
                  <div className="contact-hours__item">
                    <span className="contact-hours__day">Monday - Friday</span>
                    <span className="contact-hours__time">8:00 AM - 6:00 PM EAT</span>
                  </div>
                  <div className="contact-hours__item">
                    <span className="contact-hours__day">Saturday</span>
                    <span className="contact-hours__time">9:00 AM - 2:00 PM EAT</span>
                  </div>
                  <div className="contact-hours__item">
                    <span className="contact-hours__day">Sunday</span>
                    <span className="contact-hours__time">Closed</span>
                  </div>
                </div>
                <p className="contact-hours__note">
                  For urgent issues outside business hours, please email us and 
                  we'll respond as soon as possible.
                </p>
              </div>

              <div className="contact-social card">
                <h3 className="contact-social__title">Follow Us</h3>
                <div className="contact-social__links">
                  <a href="#" className="contact-social__link" aria-label="Facebook">
                    <span>📘</span>
                  </a>
                  <a href="#" className="contact-social__link" aria-label="Twitter">
                    <span>🐦</span>
                  </a>
                  <a href="#" className="contact-social__link" aria-label="LinkedIn">
                    <span>💼</span>
                  </a>
                  <a href="#" className="contact-social__link" aria-label="Instagram">
                    <span>📷</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="office-locations section section--lg">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Our Offices</h2>
            <p className="section__description">
              Visit us at any of our locations across East Africa
            </p>
          </div>

          <div className="offices-grid">
            <div className="office-card card">
              <h3 className="office-card__title">Nairobi, Kenya</h3>
              <p className="office-card__address">
                Innovation Plaza, 3rd Floor<br />
                Upper Hill, Nairobi<br />
                Kenya
              </p>
              <p className="office-card__phone">+254 700 000 000</p>
              <p className="office-card__email">nairobi@agrichain.com</p>
            </div>

            <div className="office-card card">
              <h3 className="office-card__title">Kampala, Uganda</h3>
              <p className="office-card__address">
                Uganda House, 5th Floor<br />
                Kampala Road<br />
                Uganda
              </p>
              <p className="office-card__phone">+256 700 000 000</p>
              <p className="office-card__email">kampala@agrichain.com</p>
            </div>

            <div className="office-card card">
              <h3 className="office-card__title">Dar es Salaam, Tanzania</h3>
              <p className="office-card__address">
                PSCC Building, 2nd Floor<br />
                Samora Avenue<br />
                Tanzania
              </p>
              <p className="office-card__phone">+255 700 000 000</p>
              <p className="office-card__email">daressalaam@agrichain.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Resources */}
      <section className="support-resources section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Need Help?</h2>
            <p className="section__description">
              Multiple ways to get the support you need
            </p>
          </div>

          <div className="resources-grid">
            <div className="resource-card card">
              <div className="resource-card__icon">📚</div>
              <h3 className="resource-card__title">Help Center</h3>
              <p className="resource-card__text">
                Browse our comprehensive guides, tutorials, and documentation.
              </p>
              <a href="#" className="btn btn--secondary btn--small">
                Visit Help Center
              </a>
            </div>

            <div className="resource-card card">
              <div className="resource-card__icon">🎥</div>
              <h3 className="resource-card__title">Video Tutorials</h3>
              <p className="resource-card__text">
                Watch step-by-step video guides in multiple languages.
              </p>
              <a href="#" className="btn btn--secondary btn--small">
                Watch Tutorials
              </a>
            </div>

            <div className="resource-card card">
              <div className="resource-card__icon">👥</div>
              <h3 className="resource-card__title">Community Forum</h3>
              <p className="resource-card__text">
                Connect with other farmers and buyers, share tips and experiences.
              </p>
              <a href="#" className="btn btn--secondary btn--small">
                Join Community
              </a>
            </div>

            <div className="resource-card card">
              <div className="resource-card__icon">💬</div>
              <h3 className="resource-card__title">Live Chat</h3>
              <p className="resource-card__text">
                Chat with our support team in real-time during business hours.
              </p>
              <a href="#" className="btn btn--secondary btn--small">
                Start Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="contact-faq section section--lg">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">Frequently Asked Questions</h2>
            <p className="section__description">
              Quick answers to common questions
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item card ${activeFaq === index ? 'faq-item--active' : ''}`}>
                <button
                  className="faq-item__question"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={activeFaq === index}
                >
                  <span>{faq.question}</span>
                  <span className="faq-item__icon">{activeFaq === index ? '−' : '+'}</span>
                </button>
                {activeFaq === index && (
                  <div className="faq-item__answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="faq-cta">
            <p className="faq-cta__text">
              Still have questions? We're here to help!
            </p>
            <a href="#contact-form" className="btn btn--primary">
              Contact Support
            </a>
          </div>
        </div>
      </section>

      {/* Partnership Inquiry */}
      <section className="partnership-inquiry section">
        <div className="container">
          <div className="partnership-inquiry__content">
            <h2 className="partnership-inquiry__title">
              Interested in Partnering With Us?
            </h2>
            <p className="partnership-inquiry__text">
              We're always looking for strategic partnerships with cooperatives, 
              financial institutions, logistics providers, and technology companies 
              that share our mission.
            </p>
            <a href="mailto:partnerships@agrichain.com" className="btn btn--primary btn--large">
              partnerships@agrichain.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;