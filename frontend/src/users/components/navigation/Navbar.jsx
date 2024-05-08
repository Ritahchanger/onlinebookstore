import { Link } from "react-router-dom";
import "./Navbar.css"
const Navbar = () => {
  return (
    <nav className="nav">
      <section className="section-a">
        <div className="container">
          <div className="phone-number">
            <span>+254 712 633413</span>
          </div>
          <div className="social-media-links">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </section>
      <section className="section-b">
        <div className="container"></div>
      </section>
      <section className="section-c">
        <div className="container"></div>
      </section>
    </nav>
  );
};

export default Navbar;
