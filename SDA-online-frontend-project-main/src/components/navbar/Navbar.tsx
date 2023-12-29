import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import useCartState from '../../hooks/useCartState'
import useUsersState from '../../hooks/useUsersState'
import { logoutUser } from '../../redux/slices/userSlice'
import CartIcon from '../cart/CartIcon'

import { AiFillCloseCircle } from 'react-icons/ai'
import { GiDandelionFlower } from 'react-icons/gi'
import { TbGridDots } from 'react-icons/tb'
import '/styles/navbar.css'

const Navbar = () => {
  const dispatch = useDispatch()
  const { isLogin, userData } = useUsersState()
  const { cartItems } = useCartState()
  const [activeNavbar, setActiveNavbar] = useState('navbar')

  const openNavbar = () => {
    setActiveNavbar('navbar active__navbar')
  }
  const closeNavbar = () => {
    setActiveNavbar('navbar')
  }

  const handleSignout = () => {
    dispatch(logoutUser())
  }

  return (
    <section className="navbar-section">
      <header className="header flex">
        <div className="logo-div">
          <Link to="/" className="logo">
            <h2>
              <GiDandelionFlower className="icon" />
              Florium
            </h2>
          </Link>
        </div>

        <nav className={activeNavbar}>
          <ul className="navbar-list flex">
            <li className="navbar__item">
              <Link to="/" className="navbar__link">
                Home
              </Link>
            </li>
            <li className="navbar__item">
              <Link to="/products" className="navbar__link">
                Products
              </Link>
            </li>
            {isLogin ? (
              <>
                <li className="navbar__item">
                  <Link
                    to={`/dashboard/${userData && userData.isAdmin ? 'admin' : 'user'}`}
                    className="navbar__link">
                    Dashboard
                  </Link>
                </li>
                <li className="navbar__item">
                  <Link to="/" className="navbar__link" onClick={handleSignout}>
                    Sign-out
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="navbar__item">
                  <Link to="/signin" className="navbar__link">
                    Sign-in
                  </Link>
                </li>
                <li className="navbar__item">
                  <Link to="/signup" className="navbar__link">
                    Sign-up
                  </Link>
                </li>
              </>
            )}
            <li className="navbar__item">
              <Link to="/cart" className="navbar__link">
                <CartIcon items={cartItems.length > 0 ? cartItems.length : 0} />
              </Link>
            </li>

            {/* <button className="btn">
              <Link to="/">Shop Now</Link>
            </button> */}
          </ul>
          <div className="close-navbar" onClick={closeNavbar}>
            <AiFillCloseCircle className="icon" />
          </div>
        </nav>

        <div className="toggle-navbar" onClick={openNavbar}>
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  )
}

export default Navbar
