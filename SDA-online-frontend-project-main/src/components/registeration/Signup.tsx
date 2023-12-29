import { useFormik } from 'formik'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'

import useUsersState from '../../hooks/useUsersState'
import { clearError, registerUser } from '../../redux/slices/userSlice'
import { AppDispatch } from '../../redux/store'

import '/styles/signup.css'

const Signup = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useUsersState()
  const [imagePreview, setImagePreview] = useState<string | null>(null)

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
        name: '',
        email: '',
        password: '',
        image: '',
        phone: '',
        address: ''
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .min(2, 'Name must be more than two characters.')
          .matches(/^[A-Za-z]{2,20}$/, 'Name must contain only letters')
          .required('Required'),
        address: Yup.string()
          .min(3, 'Address must be more than three characters.')
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address (e.g., email@domain.com).')
          .required('Required'),
        password: Yup.string().matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/,
          'Password must have at least 8 characters, including 1 letter, 1 capital letter, and 1 symbol.'
        ),
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
        formData.append('name', values.name)
        formData.append('email', values.email)
        formData.append('phone', values.phone)
        formData.append('address', values.address)
        formData.append('image', values.image)
        formData.append('password', values.password)
        try {
          const response = await dispatch(registerUser(formData))
          console.log('sign up res:', response.payload.message)
          toast.success(response.payload.message, {
            autoClose: 2000,
            onClose: () => {
              navigate('/signin')
            }
          })
        } catch (error) {
          console.log(error)
        }
      }
    })

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target
    if (type === 'file') {
      const fileInput = event.target as HTMLInputElement
      const file = fileInput.files?.[0]

      // Set the image preview URL
      if (file) {
        const previewURL = URL.createObjectURL(file)
        setImagePreview(previewURL)
      } else {
        setImagePreview(null)
      }

      setFieldValue(name, file)
    } else {
      setFieldValue(name, value)
    }
  }

  return (
    <div className="signin-section">
      <ToastContainer />
      <div className="form-section">
        <h2 className="signin__header">Wlcome!</h2>
        <form onSubmit={handleSubmit} className="signin__form">
          <div className="form__columns">
            <div className="column">
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
                placeholder="Enter Full Name "
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
                placeholder="Enter Your Email "
                required
              />
            </div>
            <div className="column">
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
              <label htmlFor="passwordInput" className="form__label">
                Password:
              </label>
              <span className="validation-error">{touched.password && errors.password}</span>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form__input"
                placeholder="Enter Your Password "
                required
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
                placeholder="Enter Your Address "
                required
              />
            </div>
            <div className="column">
              <div className="img-preview">
                {imagePreview && (
                  <div>
                    <img src={imagePreview} alt="Image Preview" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button type="submit" className="signin-form__button">
            Signup
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
