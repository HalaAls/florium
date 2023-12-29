import { ChangeEvent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AiFillDelete, AiTwotoneLock, AiTwotoneUnlock } from 'react-icons/ai'

import { baseURL } from '../../../api'
import useUsersState from '../../../hooks/useUsersState'
import {
  banUser,
  clearError,
  deleteUser,
  fetchUsers,
  grantRole,
  searchUser,
  unbanUser
} from '../../../redux/slices/userSlice'
import { AppDispatch } from '../../../redux/store'
import SearchInput from '../../filter/SearchInput'
import AdminSidebar from './AdminSidebar'

import '/styles/admin-dashboard.css'

const AdminUsers = () => {
  const dispatch: AppDispatch = useDispatch()
  const { users, searchTerm, error, userData } = useUsersState()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      const toastId = toast.error(error, {
        onClose: () => {
          dispatch(clearError())
        }
      })
      setTimeout(() => {
        toast.dismiss(toastId)
      }, 2000)
    }
  }, [error])

  const handelDelete = async (email: string) => {
    try {
      const response = await dispatch(deleteUser(email))
      toast.success(response.payload.message)
    } catch (error) {
      console.log(error)
    }
  }

  const handelBanUnban = async (email: string, isBanned: boolean) => {
    try {
      const response = isBanned ? await dispatch(unbanUser(email)) : await dispatch(banUser(email))
      toast.success(response.payload.message)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGrantRole = async (email: string, isAdmin: boolean) => {
    try {
      if (email === userData?.email) {
        toast.error('you can not grant role to yourself')
        return
      }
      const response = await dispatch(grantRole({ email: email, isAdmin: isAdmin }))
      toast.success(response.payload.message)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value
    dispatch(searchUser(eventValue))
  }

  const searchedUsers = searchTerm
    ? users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : users

  return (
    <div className="admin-section">
      <ToastContainer />
      <AdminSidebar />
      <div className="products-container">
        <div className="products__filters">
          <div className="new__product">
            <h2>Users</h2>
          </div>
          <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} />
        </div>

        <div className="product-container">
          <table>
            <thead>
              <tr>
                <td>Full Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Edit/Delete</td>
              </tr>
            </thead>
          </table>
          {searchedUsers.length > 0 &&
            searchedUsers.map((user) => {
              if (user.email !== userData?.email) {
                return (
                  <div className="product-card" key={user._id}>
                    <div className="product__details">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <img
                                src={`${baseURL}/${user.image}`}
                                alt={`${baseURL}/${user.image}`}
                              />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? 'Admin' : 'User'}</td>

                            <td>
                              <div className="products__controls">
                                <button
                                  id="delete__button"
                                  className="dashboard__buttons"
                                  onClick={() => {
                                    handelDelete(user.email)
                                  }}>
                                  <AiFillDelete className="icon" />
                                </button>
                                <button
                                  id="delete__button"
                                  className="dashboard__buttons"
                                  onClick={() => {
                                    handelBanUnban(user.email, user.isBanned)
                                  }}>
                                  {user.isBanned ? (
                                    <AiTwotoneLock className="icon" />
                                  ) : (
                                    <AiTwotoneUnlock className="icon" />
                                  )}
                                </button>
                                <button
                                  className="dashboard__buttons"
                                  onClick={() => {
                                    handleGrantRole(user.email, user.isAdmin)
                                  }}>
                                  {user.isAdmin ? 'admin' : 'user'}
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              }
            })}
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
