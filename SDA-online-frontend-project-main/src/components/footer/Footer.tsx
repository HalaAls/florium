import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import Aos from 'aos'
import 'aos/dist/aos.css'
import '/styles/footer.css'

import {
  FaChevronRight,
  FaFacebookSquare,
  FaHeart,
  FaInstagramSquare,
  FaSnapchatSquare,
  FaTwitterSquare
} from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { GiDandelionFlower } from 'react-icons/gi'

const Footer = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  })

  return (
    <footer className="footer">
      <section className="footer-section">
        <div className="img-div">
          <video src="/src/styles/assets/videos/florium.mp4" autoPlay muted loop></video>
        </div>

        <div className="section-content container">
          <div className="contact-div flex">
            <div className="text">
              <h2 data-aos="fade-up">Subscribe to Our Newsletter</h2>
            </div>

            <div className="input-div flex">
              <input
                type="text"
                className="input"
                placeholder="Enter Your Email"
                data-aos="fade-up"
              />
              <button className="btn flex" type="submit" data-aos="fade-up">
                Subscribe <FiSend className="icon" />
              </button>
            </div>
          </div>

          <div className="footer-card flex" data-aos="fade-up">
            <div className="footer-intro flex">
              <div className="logo-div" data-aos="fade-up">
                <Link to="/" className="logo flex">
                  <GiDandelionFlower className="icon" />
                  Florium
                </Link>
              </div>

              <div className="footer-paragraph" data-aos="fade-up">
                Welcome to Florium, your destination for exquisite flowers and unique bouquets. Let
                us be part of your special moments, adding a touch of nature`s beauty to your
                celebrations.
              </div>

              <div className="footer-socials flex" data-aos="fade-up">
                <FaInstagramSquare className="icon" />
                <FaFacebookSquare className="icon" />
                <FaSnapchatSquare className="icon" />
                <FaTwitterSquare className="icon" />
              </div>
            </div>

            <div className="footer-links grid">
              <div className="link-group" data-aos="fade-up">
                <span className="group-title">EXPLORE</span>
                <li className="footer-list flex">
                  <FaChevronRight className="icon" /> Products
                </li>
                <li className="footer-list flex">
                  <FaChevronRight className="icon" /> Services
                </li>
                <li className="footer-list flex">
                  <FaChevronRight className="icon" /> Blog
                </li>
              </div>

              <div className="link-group" data-aos="fade-up">
                <span className="group-title">ABOUT US</span>
                <li className="footer-list flex">
                  <FaChevronRight className="icon" /> Our Story
                </li>
                <li className="footer-list flex">
                  <FaChevronRight className="icon" /> Team
                </li>
                <li className="footer-list flex">
                  <FaChevronRight className="icon" /> Careers
                </li>
              </div>

              <div className="link-group" data-aos="fade-up">
                <span className="group-title">CUSTOMER CARE</span>
                <li className="footer-list flex">
                  <FaChevronRight className="icon" /> Contact Us
                </li>
                <li className="footer-list flex">
                  <FaChevronRight className="icon" /> FAQ
                </li>
                <li className="footer-list flex">
                  <FaChevronRight className="icon" /> Shipping
                </li>
              </div>
            </div>

            <div className="footer-div flex">
              <small>
                Crafted with <FaHeart className="icon" /> by @Hala.Alsuwyt
              </small>
              <small>&copy; 2023 Florium. All Rights Reserved.</small>
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
