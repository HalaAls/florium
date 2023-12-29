import { useFormik } from 'formik'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'

import useUsersState from '../../../hooks/useUsersState'
import { User, clearError, fetchUsers, updateUser } from '../../../redux/slices/userSlice'
import { AppDispatch } from '../../../redux/store'
import UserSidebar from './UserSidebar'
import { baseURL } from '../../../api'

import '/styles/user-dashboard.css'
import { AiOutlineClose } from 'react-icons/ai'
import { FaRegEdit, FaRegSave } from 'react-icons/fa'

const UserInfo = () => {
  const { error, userData } = useUsersState()
  const dispatch: AppDispatch = useDispatch()
  const [isFormOpen, setIsFormOpen] = useState(false)

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
  const { values, handleChange, handleSubmit, errors, handleBlur, touched, setFieldValue } =
    useFormik({
      initialValues: {
        _id: '',
        name: '',
        email: '',
        image: '',
        phone: '',
        address: ''
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .min(2, 'Name must be more than two characters.')
          .matches(/^[A-Za-z ]{2,20}$/, 'Name must contain only letters and spaces')
          .required('Required'),

        address: Yup.string()
          .min(3, 'Address must be more than three characters.')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address (e.g., email@domain.com).')
          .required('Required'),
        image: Yup.mixed().test(
          'isImage',
          'Invalid file type. Only [jpeg, jpg, png, bmp, gif] are allowed.',
          function (value) {
            // Only perform the validation if the user selected an image
            if (value instanceof File) {
              const fileType = value.name.split('.').pop()?.toLowerCase()
              const validImageExtensions = ['jpeg', 'jpg', 'png', 'bmp', 'gif']
              return validImageExtensions.includes(fileType || '')
            }
            return true // Passes validation if no file is selected
          }
        ),
        phone: Yup.string()
          .matches(/^[0-9]{10}$/, 'Invalid phone number. Must be 10 digits.')
          .required('Required')
      }),
      onSubmit: async (values) => {
        const formData = new FormData()
        formData.append('_id', values._id)
        formData.append('name', values.name)
        formData.append('phone', values.phone)
        formData.append('address', values.address)
        formData.append('image', values.image)
        formData.append('email', values.email)
        try {
          const userEmail = userData ? userData.email : ' '
          const updatedUser = formData
          const response = await dispatch(updateUser({ userEmail, updatedUser }))
          setIsFormOpen(false)
          toast.success(response.payload.message)
        } catch (error) {
          console.log(error)
        }
      }
    })

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target
    if (type === 'file') {
      console.log(name)
      const fileInput = event.target as HTMLInputElement
      const file = fileInput.files?.[0]
      setFieldValue(name, file)
    } else {
      setFieldValue(name, value)
    }
  }
  const handleUpdate = (userData: User) => {
    setIsFormOpen(true)
    setFieldValue('_id', userData._id)
    setFieldValue('name', userData.name)
    setFieldValue('image', userData.image)
    setFieldValue('address', userData.address)
    setFieldValue('email', userData.email)
    setFieldValue('phone', userData.phone)
  }

  return (
    <div className="user-information-section">
      <ToastContainer />
      <UserSidebar />
      <div className="user-dashboard-container">
        <div>
          <h2 className="user-dashboard-container__title">Profile</h2>
        </div>
        {isFormOpen && (
          <form action="" onSubmit={handleSubmit} className="user-edit-form">
            <div className="user-form__inner">
              <label htmlFor="nameInput" className="form__label">
                Name:
              </label>
              <span className="validation-error">{touched.name && errors.name}</span>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form__input"
                placeholder="Enter Full Name"
                required
              />
              <label htmlFor="emailInput" className="form__label">
                Email:
              </label>
              <span className="validation-error">{touched.email && errors.email}</span>
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form__input"
                placeholder="Enter Your Email"
                required
              />
              <label htmlFor="phoneInput" className="form__label">
                Phone:
              </label>
              <span className="validation-error">{touched.phone && errors.phone}</span>
              <input
                type="text"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form__input"
                placeholder="Enter Your Phone Number"
                required
              />
              <label htmlFor="imageInput" className="form__label">
                Image:
              </label>
              <span className="validation-error">{touched.image && errors.image}</span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                onBlur={handleBlur}
                className="form__input"
              />
              <label htmlFor="addressInput" className="form__label">
                Address:
              </label>
              <span className="validation-error">{touched.address && errors.address}</span>
              <textarea
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form__input"
                placeholder="Enter Your Address"
                required
              />

              <div className="user-edit__inputs" id="buttons">
                <button type="submit" className="user__dashboard__buttons" id="user__save__button">
                  <FaRegSave />
                </button>
                <button
                  className="user__dashboard__buttons"
                  id="user__close__button"
                  onClick={() => setIsFormOpen(false)}>
                  <AiOutlineClose />
                </button>
              </div>
            </div>
          </form>
        )}

        <div className="user-container">
          <div className="user-card">
            <div className="user-img">
              <img src={`${baseURL}/${userData?.image}`} alt={userData?.name} />
            </div>
            <div className="user__details">
              <h2>Name: {userData?.name}</h2>
              <h3>Email: {userData?.email}</h3>
              <h3>Address: {userData?.address}</h3>
              <h3>Phone: {userData?.phone}</h3>
            </div>
            <div className="user__controls">
              <button
                className="dashboard__buttons"
                id="update__button"
                onClick={() => {
                  handleUpdate(userData)
                }}>
                <FaRegEdit />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
