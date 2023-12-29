import { GiDandelionFlower } from 'react-icons/gi'
import '/styles/header.css'

const Header = () => {
  return (
    <section className="header-section">
      <header className="hero-header">
        <div className="overlay"></div>
        <video src="/src/styles/assets/videos/florium.mp4" autoPlay muted loop></video>
        <div className="header-content container">
          <div className="content-div">
            <h1 className="main-title">
              <GiDandelionFlower />
              Florium
            </h1>
            <div>
              <span className="second-title">
                Creating Unique Bouquets For Your Special Moments
              </span>
            </div>
            <div>
              <span className="sub-title">New Blooms Await</span>
            </div>
            <button className="call-to-action btn">Expolre the Blossoms</button>
          </div>
        </div>
      </header>
    </section>
  )
}

export default Header
