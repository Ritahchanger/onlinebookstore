import { Link } from "react-router-dom";
import { sectionbNavigation, sectioncNavigation } from "../Data/NavbarData";
import "./Navbar.css";
import ProfileImage from "../../../assets/images/bemi.png"
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
          <div className="profile-logo">
            <a href="#">
              <img src={ProfileImage} alt="" />
            </a>
          </div>

          <div className="search_container">
            <input type="text" placeholder="Search..." />
            <button className="search">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          <div className="section-navigation">
            {sectionbNavigation.map((item, index) => (
              <p className="nav-li" key={index}>
                <Link to={item.path}>{item.menu_name}</Link>
              </p>
            ))}
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
