import { useFormik } from 'formik'
import { ChangeEvent, useEffect, useState } from 'react'
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'
import { BiMessageSquareAdd } from 'react-icons/bi'
import { FaRegEdit, FaRegSave } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'

import useCategoriesState from '../../../hooks/useCategoriesState'
import {
  clearError,
  createCategory,
  deleteCategory,
  fetchCategories,
  searchCategory,
  updateCategory
} from '../../../redux/slices/categorySlice'
import { AppDispatch } from '../../../redux/store'
import AdminSidebar from './AdminSidebar'

import '/styles/admin-dashboard.css'

const AdminCategories = () => {
  const dispatch: AppDispatch = useDispatch()
  const { categories, error, searchTerm } = useCategoriesState()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

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
        slug: ''
      },
      validationSchema: Yup.object({
        name: Yup.string()
          .min(3, 'Category name must be at least three characters.')
          .max(200, 'Category name must be less than 200 characters')
          .matches(/^[A-Za-z\s]{3,200}$/, 'Category name must contain only letters and spaces')
          .required('Required')
      }),
      onSubmit: async (values) => {
        try {
          if (isEdit) {
            const updatedCategory = { slug: values.slug, name: values.name }
            dispatch(updateCategory(updatedCategory))
            setIsFormOpen(!isFormOpen)
            setIsEdit(!isEdit)
          } else {
            const newCategory = values.name
            console.log('cat is here in dashboard:', newCategory)
            dispatch(createCategory(newCategory))
            setIsFormOpen(false)
          }
          setFieldValue('name', '')
        } catch (error) {
          console.log(error)
        }
      }
    })

  const handleCancleButton = () => {
    setIsFormOpen(!isFormOpen)
    setFieldValue('name', '')
    setIsEdit(!isEdit)
  }

  const handleUpdate = (slug: string, name: string) => {
    setIsFormOpen(!isFormOpen)
    setIsEdit(!isEdit)
    setFieldValue('name', name)
    setFieldValue('slug', slug)
  }

  const handelDelete = async (slug: string) => {
    try {
      dispatch(deleteCategory(slug))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value
    dispatch(searchCategory(eventValue))
  }

  const searchedCategories = searchTerm
    ? categories.filter((category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories

  return (
    <div className="section">
      <ToastContainer />
      <AdminSidebar />
      <div className="category-container">
        <div className="products__filters">
          <div className="new__product">
            <h2>Categories</h2>
            <button
              className="dashboard__buttons"
              id="add__button"
              onClick={() => setIsFormOpen(!isFormOpen)}>
              <BiMessageSquareAdd />
            </button>
          </div>
          {/* <SearchøInput searchTerm={searchTerm} handleSearch={handleSearch} /> */}
        </div>

        {isFormOpen && (
          <form onSubmit={handleSubmit} className="product__form">
            <div className="form__inner">
              <div className="input__group">
                <label htmlFor="categoryInput">Category Name</label>
                <span className="validation-error">{touched.name && errors.name}</span>

                <input
                  type="text"
                  name="name"
                  value={values.name}
                  placeholder="Enter Category Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="product__input"
                />
              </div>
              <button type="submit" className="dashboard__buttons" id="save__button">
                <FaRegSave />
              </button>
              <button
                className="dashboard__buttons"
                id="close__button"
                onClick={handleCancleButton}>
                <AiOutlineClose />
              </button>
            </div>
          </form>
        )}

        <div className="product-container">
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Edit/Delete</td>
              </tr>
            </thead>
          </table>
          {searchedCategories.length > 0 &&
            searchedCategories.map((category) => {
              return (
                <div className="product-card" key={category._id}>
                  <div className="product__details">
                    <table>
                      <tbody key={category._id}>
                        <tr key={category._id}>
                          <td>{category._id}</td>
                          <td>{category.name}</td>
                          <td>
                            <div className="products__controls">
                              <button
                                id="delete__button"
                                className="dashboard__buttons"
                                onClick={() => {
                                  handelDelete(category.slug)
                                }}>
                                <AiFillDelete />
                              </button>
                              <button
                                className="dashboard__buttons"
                                id="update__button"
                                onClick={() => {
                                  handleUpdate(category.slug, category.name)
                                }}>
                                <FaRegEdit />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default AdminCategories
