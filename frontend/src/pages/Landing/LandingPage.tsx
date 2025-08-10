import { 
  Shield, 
  FileText, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  CreditCard
} from 'lucide-react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    {
      icon: <FileText className="feature-icon" />,
      title: "Easy Application Process",
      description: "Apply for passport and visa services with our streamlined digital process"
    },
    {
      icon: <Clock className="feature-icon" />,
      title: "Fast Processing",
      description: "Normal processing in 15 days, Tatkal service available in just 3 days"
    },
    {
      icon: <Shield className="feature-icon" />,
      title: "Secure & Reliable",
      description: "Your personal information is protected with enterprise-grade security"
    }
  ];

  const services = [
    {
      title: "New Passport",
      description: "Apply for your first passport",
      price: "₹2,500 (Normal) / ₹5,000 (Tatkal)",
      features: ["30 or 60 pages booklet", "15 days processing", "Valid for 10 years"]
    },
    {
      title: "Passport Renewal",
      description: "Renew your expired passport",
      price: "₹1,500 (Normal) / ₹3,000 (Tatkal)",
      features: ["Quick renewal process", "Same day application", "Extended validity"]
    },
    {
      title: "Visa Services",
      description: "Apply for international visa",
      price: "Validity based on occupation",
      features: ["Student: 2 years", "Private Employee: 3 years", "Government: 4 years"]
    }
  ];

  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Shield className="logo-icon" />
              <span className="logo-text">Passport Portal</span>
            </div>
            <button className="cta-button" onClick={() => {navigate('/login')}}>
              Get Started
            </button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Passport & Visa Management System
              </h1>
              <p className="hero-subtitle">
                Delivering passport and visa services to citizens in a timely, 
                accessible and reliable manner. Apply online, track your application, 
                and get your documents hassle-free.
              </p>
              <div className="hero-buttons">
                <button className="primary-button" onClick={() => {navigate('/login')}}>
                  Apply Now <ArrowRight size={20} />
                </button>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-card">
                <Shield size={80} className="hero-card-icon" />
                <h3>Secure Digital Platform</h3>
                <p>Government authorized portal for all passport and visa services</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Our Platform?</h2>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                {feature.icon}
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Services</h2>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-header">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
                <div className="service-price">
                  <CreditCard size={20} />
                  <span>{service.price}</span>
                </div>
                <ul className="service-features">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="service-feature">
                      <CheckCircle size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="service-button" onClick={() => {navigate('/login')}}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="process">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Simple Application Process</h2>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Register Account</h3>
                <p>Create your account with basic information and get your unique customer ID</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Fill Application</h3>
                <p>Complete the application form with required documents and information</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Track & Receive</h3>
                <p>Track your application status and receive your passport/visa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Started?</h2>
            <p className="cta-subtitle">
              Join thousands of satisfied customers who trust our platform for their passport and visa needs
            </p>
            <button className="cta-button-large" onClick={() => {navigate('/login')}}>
              Start Your Application <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;