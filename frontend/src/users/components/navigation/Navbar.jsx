import { Link } from "react-router-dom";
import { sectionbNavigation } from "../Data/NavbarData";
import "./Navbar.css";
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
        <div className="container">
          <div className="profile">
            <i class="fa-solid fa-user"></i>
          </div>
          <div className="search-bar">
            <input type="text" name="" id="" placeholder="Search..." />
          </div>
          <div className="sectionb-navigation">
            {sectionbNavigation.map((item, index) => (
              <p key={index}>
                <a href={item.path}>{item.menu_name}</a>
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="section-c">
        <div className="container"></div>
      </section>
    </nav>
  );
};

export default Navbar;
