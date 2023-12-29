import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AdminProtectedRoute from './AdminProtectedRoute'
import ProfileProtectedRoute from './ProfileProtectedRoute'

import AdminCategories from '../components/dashboard/admin-dashboard/AdminCategories'
import AdminOrders from '../components/dashboard/admin-dashboard/AdminOrders'
import AdminProducts from '../components/dashboard/admin-dashboard/AdminProducts'
import AdminUsers from '../components/dashboard/admin-dashboard/AdminUsers'
import UserInfo from '../components/dashboard/user-dashboard/UserInfo'
import UserOrders from '../components/dashboard/user-dashboard/UserOrders'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import AllProducts from '../components/product/AllProducts'
import ActivateAccount from '../components/registeration/ActivateAccount'
import ForgetPassword from '../components/registeration/ForgetPassword'
import ResetPassword from '../components/registeration/ResetPassword'
import Signin from '../components/registeration/Signin'
import Signup from '../components/registeration/Signup'
import AdminDashboard from '../pages/AdminDashboard'
import Cart from '../pages/Cart'
import Error from '../pages/Error'
import Home from '../pages/Home'
import SingleProduct from '../pages/SingleProduct'
import UserProfile from '../pages/UserDashboard'

const Routing = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={<Signin pathName="/" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/users/activate/:token" element={<ActivateAccount />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/users/forget-password/:token" element={<ResetPassword />} />

        <Route path="/dashboard" element={<ProfileProtectedRoute />}>
          <Route path="user" element={<UserProfile />} />
          <Route path="user/information" element={<UserInfo />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        <Route path="/dashboard" element={<AdminProtectedRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/categories" element={<AdminCategories />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default Routing
