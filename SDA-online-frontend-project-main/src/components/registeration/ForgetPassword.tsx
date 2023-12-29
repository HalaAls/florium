import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'

import useUsersState from '../../hooks/useUsersState'
import { clearError, forgetPassword } from '../../redux/slices/userSlice'
import { AppDispatch } from '../../redux/store'

import '/styles/forget-password.css'

const ForgetPassword = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { error } = useUsersState()

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

  const { values, handleChange, handleSubmit, errors, handleBlur, touched } = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address (e.g., email@domain.com).')
        .required('Required')
    }),
    onSubmit: async (values) => {
      try {
        const email = values.email
        const response = await dispatch(forgetPassword(email))
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

  return (
    <div className="forget-password section">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="forget-password-form">
        <h2 className="forget-password-header">Forget Password</h2>
        <span className="forget-password-form__validation-error">
          {touched.email && errors.email}
        </span>
        <input
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="forget-password-form__input"
          placeholder="Enter Your Email"
          required
        />
        <button type="submit" className="forget-password-form__button">
          Send Reset Email
        </button>
      </form>
    </div>
  )
}

export default ForgetPassword
