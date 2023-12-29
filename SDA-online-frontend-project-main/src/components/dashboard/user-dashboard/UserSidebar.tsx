import { Link } from 'react-router-dom'

import { AiFillProfile, AiTwotoneShopping } from 'react-icons/ai'
import '/styles/user-dashboard.css'

const UserSidebar = () => {
  return (
    <aside className="user-sidebar section">
      <ul className="user-sidebar__list">
        <li className="user-sidebar__list-item">
          <Link to="/dashboard/user/information" className="user-sidebar__link">
            <AiFillProfile /> Profile
          </Link>
        </li>
        <li className="user-sidebar__list-item">
          <Link to="/dashboard/user/orders" className="user-sidebar__link">
            <AiTwotoneShopping /> Orders
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default UserSidebar
