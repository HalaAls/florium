import { useFormik } from 'formik'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'

import useUsersState from '../../hooks/useUsersState'
import { clearError, loginUser } from '../../redux/slices/userSlice'
import { AppDispatch } from '../../redux/store'

import '/styles/signin.css'

const Signin = ({ pathName }: { pathName: string }) => {
  //step1: get all the users from the store
  const { userData, error } = useUsersState()
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userData) {
      // set timeout so the toast can display the success msg before navigate to this path
      setTimeout(() => {
        navigate(pathName ? pathName : `/dashboard/${userData?.isAdmin ? 'admin' : 'user'}`)
      }, 2000)
    }
  }, [userData, navigate, pathName])

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
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address (e.g., email@domain.com).')
        .required('Required'),
      password: Yup.string().matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W).{8,}$/,
        'Password must have at least 8 characters, including 1 letter, 1 capital letter, and 1 symbol.'
      )
    }),
    onSubmit: async (values) => {
      try {
        const loginDate = {
          email: values.email,
          password: values.password
        }
        const response = await dispatch(loginUser(loginDate))
        toast.success(response.payload.message)
      } catch (error) {
        console.log(error)
      }
    }
  })

  return (
    <div className="section">
      <ToastContainer />
      <div className="form-section">
        <h2 className="signin__header">Hi, Welcome Back!</h2>
        <form onSubmit={handleSubmit} className="signin__form">
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
          <button type="submit" className="signin-form__button">
            Signin
          </button>
          <Link to="/forget-password">Forget Password?</Link>
        </form>
      </div>
    </div>
  )
}

export default Signin
