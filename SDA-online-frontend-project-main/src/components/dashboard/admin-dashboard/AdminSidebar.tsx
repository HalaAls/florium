import { Link } from 'react-router-dom'

import { BiSolidCategoryAlt } from 'react-icons/bi'
import { BsFillBoxSeamFill } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'
import { AiTwotoneShopping } from 'react-icons/ai'
import '/styles/admin-dashboard.css'

const AdminSidebar = () => {
  const toggleSidebar = () => {
    const sidebar = document.querySelector('.admin-sidebar')
    sidebar?.classList.toggle('open')
  }
  return (
    <div className="section">
      <button className="admin-sidebar-toggle" onClick={toggleSidebar}>
        Options
      </button>
      <div className="admin-sidebar section">
        <ul className="sidebar__list">
          <li className="sidebar__list__items">
            <Link to="/dashboard/admin/products">
              <BsFillBoxSeamFill /> Products
            </Link>
          </li>
          <li className="sidebar__list__items">
            <Link to="/dashboard/admin/categories">
              <BiSolidCategoryAlt /> Categories
            </Link>
          </li>
          <li className="sidebar__list__items">
            <Link to="/dashboard/admin/users">
              <FaUsers /> Users
            </Link>
          </li>
          <li className="sidebar__list__items">
            <Link to="/dashboard/admin/orders">
              <AiTwotoneShopping /> Orders
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AdminSidebar
