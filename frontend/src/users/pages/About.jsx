import "./About.css";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";

import Footer from "../components/Footer/Footer";

import CeoImage from "../../assets/icons/ceo.png";

const About = () => {
  return (
    <>
      <div className="about">
        <LowerNavbar />
        <div className="container">
          <div className="about-content">
            <h1>About Bemi Editors Limited</h1>
            <p>
              Bemi Editors Limited is a publishing company located in Nakuru,
              Kenya. We specialize in editing, publishing, and selling a wide
              range of books including spiritual, academic, and business
              literature.
            </p>
            <h2>Our Mission</h2>
            <p>
              Our mission at Bemi Editors Limited is to inspire, educate, and
              empower individuals through literature. We strive to provide
              high-quality books that enrich the lives of our readers and
              contribute positively to society.
            </p>
            <h2>CEO: Christopher Bedan Chege</h2>
            <p>
              Christopher Bedan Chege is the Chief Executive Officer (CEO) of
              Bemi Editors Limited. With a passion for literature and a
              commitment to excellence, Christopher leads our team in achieving
              our vision of becoming a leading publishing house in the region.
            </p>
            <div className="profileImage">
              <div className="img-wrapper">
                <img src={CeoImage} alt="" />
              </div>
              <div className="ceo_testmony">
                <h2>WHAT CEO HAS TO SAY</h2>
                <p>
                  <sup>"</sup>
                  Christopher Bedan Chege, the esteemed Chief Executive Officer
                  of Bemi Editors Limited, epitomizes visionary leadership and
                  unwavering dedication. Under his stewardship, Bemi Editors has
                  soared to new heights, emerging as a beacon of innovation and
                  excellence in the publishing industry. Christopher's profound
                  passion for literature is matched only by his relentless
                  pursuit of excellence, inspiring all who work alongside him.
                  With a keen eye for talent and an innate ability to nurture
                  creativity, he fosters an environment where ideas flourish and
                  dreams are realized. His strategic vision and steadfast
                  commitment to quality have propelled Bemi Editors to the
                  forefront of the literary landscape, earning the admiration
                  and trust of authors and readers alike. Christopher's
                  transformative leadership is not merely about achieving
                  success; it's about making a meaningful impact, empowering
                  individuals, and shaping a brighter future through the power
                  of words. His legacy is one of inspiration, innovation, and
                  enduring excellence, leaving an indelible mark on the world of
                  publishing and beyond.
                  <sup>"</sup>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
