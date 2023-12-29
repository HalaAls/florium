import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'

import useUsersState from '../../hooks/useUsersState'
import { clearError, resetPassword } from '../../redux/slices/userSlice'
import { AppDispatch } from '../../redux/store'

import '/styles/reset-password.css'

const ResetPassword = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useParams()
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
      password: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/,
        'Password must have at least 8 characters, including 1 letter, 1 capital letter, and 1 symbol.'
      )
    }),
    onSubmit: async (values) => {
      try {
        const password = values.password
        const response = await dispatch(resetPassword({ password, token }))
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
    <div className="section">
      <ToastContainer />
      <div className="reset-password-section">
        <form onSubmit={handleSubmit} className="reset-password-form">
          <h2 className="reset-password-header">Reset Password</h2>
          <span className="reset-password-form__validation-error">
            {touched.password && errors.password}
          </span>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="reset-password-form__input"
            placeholder="Enter Your Password"
            required
          />
          <button type="submit" className="reset-password-form__button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword
