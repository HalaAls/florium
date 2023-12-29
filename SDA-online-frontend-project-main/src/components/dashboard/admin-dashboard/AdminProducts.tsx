import { useFormik } from 'formik'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as Yup from 'yup'

import { AiFillDelete, AiOutlineClose } from 'react-icons/ai'
import { BiMessageSquareAdd } from 'react-icons/bi'
import { FaRegEdit, FaRegSave } from 'react-icons/fa'

import { baseURL } from '../../../api'
import useCategoriesState from '../../../hooks/useCategoriesState'
import useProductsState from '../../../hooks/useProductsState'
import { clearError, fetchCategories } from '../../../redux/slices/categorySlice'
import {
  Product,
  createProduct,
  deleteProduct,
  fetchProducts,
  searchProduct,
  updateProduct
} from '../../../redux/slices/productSlice'
import { AppDispatch } from '../../../redux/store'
import SearchInput from '../../filter/SearchInput'
import AdminSidebar from './AdminSidebar'

import '/styles/admin-dashboard.css'

const AdminProducts = () => {
  const dispatch: AppDispatch = useDispatch()
  const { products, error, isSuccess, searchTerm } = useProductsState()
  const { categories } = useCategoriesState()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchCategories())
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    if (isSuccess) {
      dispatch(fetchProducts({}))
    }
  }, [dispatch, isSuccess])

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

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    handleBlur,
    touched,
    setFieldValue,
    setValues
  } = useFormik({
    initialValues: {
      slug: '',
      name: '',
      description: '',
      size: '',
      image: '',
      category: categories.length > 0 ? categories[0]._id : '', // the first category will be the default value
      variant: '',
      price: 0,
      quantity: 0
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Product name must be at least three characters.')
        .max(200, 'Product name must be less than 200 characters')
        .matches(
          /^[A-Za-z0-9\s]{3,200}$/,
          'Product name must contain only letters, numbers, and spaces'
        )
        .required('Required'),
      description: Yup.string()
        .min(3, 'Description must be more than three characters.')
        .required('Required'),
      price: Yup.number()
        .typeError('Price must be a valid number.')
        .positive('Price must be a positive number.')
        .required('Required'),
      quantity: Yup.number()
        .typeError('Quantity must be a valid number.')
        .positive('Quantity must be a positive number.')
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
      size: Yup.string()
        .matches(
          /^([^\s]+,\s*)*[^\s]+$/,
          'Sizes must be comma-separated without spaces, e.g., S,M,L'
        )
        .required('Required'),
      variant: Yup.string()
        .matches(
          /^([^\s]+,\s*)*[^\s]+$/,
          'Variants must be comma-separated without spaces, e.g., 10gb,20gb'
        )
        .required('Required')
    }),
    onSubmit: async (values) => {
      const formData = new FormData()
      const sizeArray = values.size.split(',').map((size) => size.trim())
      const variantArray = values.variant.split(',').map((variant) => variant.trim())
      formData.append('name', values.name)
      formData.append('description', values.description)
      formData.append('price', values.price.toString())
      formData.append('quantity', values.quantity.toString())
      formData.append('category', values.category)
      formData.append('image', values.image)
      sizeArray.forEach((size) => {
        formData.append('size', size)
      })
      variantArray.forEach((variant) => {
        formData.append('variant', variant)
      })
      try {
        if (!isEdit) {
          const response = await dispatch(createProduct(formData))
          toast.success(response.payload.message)
        } else {
          const response = await dispatch(
            updateProduct({ slug: values.slug, updatedProduct: formData })
          )
          toast.success(response.payload.message)
        }
        // setIsFormOpen(false)
        // setIsEdit(false)
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

  const handleUpdate = (product: Product) => {
    setIsFormOpen(true)
    setIsEdit(true)
    setFieldValue('slug', product.slug)
    setFieldValue('name', product.name)
    setFieldValue('description', product.description)
    setFieldValue('image', product.image)
    setFieldValue('category', product.category._id)
    setFieldValue('price', product.price)
    setFieldValue('quantity', product.quantity)
    setFieldValue('size', product.size ? product.size.join(', ') : '')
    setFieldValue('variant', product.variant ? product.variant.join(', ') : '')
  }
  const handelDelete = async (slug: string) => {
    try {
      const response = await dispatch(deleteProduct(slug))
      toast.success(response.payload.message)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCancleButton = () => {
    setIsFormOpen(false)
    setValues({
      slug: '',
      name: '',
      image: '',
      description: '',
      category: '',
      variant: '',
      size: '',
      price: 0,
      quantity: 0
    })
    setIsEdit(false)
  }

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const eventValue = event.target.value
    dispatch(searchProduct(eventValue))
  }

  const searchedProducts = searchTerm
    ? products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : products

  return (
    <div className="section">
      <ToastContainer />

      <AdminSidebar />
      <div className="products-container">
        <div className="products__filters">
          <div className="new__product">
            <h2>Products</h2>
            <button
              className="dashboard__buttons"
              id="add__button"
              onClick={() => setIsFormOpen(!isFormOpen)}>
              <BiMessageSquareAdd />
            </button>
          </div>
          {/* <SearchInput searchTerm={searchTerm} handleSearch={handleSearch} /> */}
        </div>

        {isFormOpen && (
          <form onSubmit={handleSubmit} className="product__form">
            <div className="form__inner">
              <div className="input__group">
                <label htmlFor="image" className="form__label">
                  Image:
                </label>
                <span className="validation-error">{touched.image && errors.image}</span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  onBlur={handleBlur}
                  className="product__input"
                />
                {imagePreview && (
                  <div>
                    <img src={imagePreview} alt="Image Preview" />
                  </div>
                )}
              </div>

              <div className="input__group">
                <label htmlFor="name">Name</label>
                <span className="validation-error">{touched.name && errors.name}</span>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="product__input"
                />
              </div>
              <div className="input__group">
                <label htmlFor="description">Description</label>
                <span className="validation-error">
                  {touched.description && errors.description}
                </span>
                <input
                  type="text"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="product__input"
                />
              </div>
              <div className="input__group">
                <label htmlFor="quantity">Quantity</label>
                <span className="validation-error">{touched.quantity && errors.quantity}</span>
                <input
                  type="text"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="product__input"
                />
              </div>
              <div className="input__group">
                <label htmlFor="size">Sizes</label>
                <span className="validation-error">{touched.size && errors.size}</span>
                <input
                  type="text"
                  name="size"
                  value={values.size}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="product__input"
                />
              </div>
              <div className="input__group">
                <label htmlFor="category">Categories</label>
                <span className="validation-error">{touched.category && errors.category}</span>
                <select
                  name="category"
                  id="cateory"
                  onChange={handleChange}
                  value={values.category}>
                  {categories.map((category) => {
                    return (
                      <option value={category._id} key={category._id}>
                        {category.name}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className="input__group">
                <label htmlFor="variant">Variants</label>
                <span className="validation-error">{touched.variant && errors.variant}</span>
                <input
                  type="text"
                  name="variant"
                  value={values.variant}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="product__input"
                />
              </div>
              <div className="input__group">
                <label htmlFor="price">Price</label>
                <span className="validation-error">{touched.price && errors.price}</span>
                <input
                  type="text"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="product__input"
                />
              </div>
              <div className="input__group" id="buttons">
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
            </div>
          </form>
        )}
        <div className="product-container">
          <table>
            <thead>
              <tr>
                <td>Image</td>
                <td>Name</td>
                <td>Description</td>
                <td>Sizes</td>
                <td>Categories</td>
                <td>Variants</td>
                <td>Price</td>
                <td>Edit/Delete</td>
              </tr>
            </thead>
          </table>

          {searchedProducts.length > 0 &&
            searchedProducts.map((product) => {
              return (
                <div className="product-card" key={product._id}>
                  <div className="product__img">
                    {product.image && (
                      <img src={`${baseURL}/${product.image}`} alt={product.name} />
                    )}
                  </div>
                  <div className="product__details">
                    <table>
                      <tbody>
                        <tr>
                          <td>{product.name.length > 0 ? product.name : '-'}</td>
                          <td>{product.description.length > 0 ? product.description : '-'}</td>
                          <td>
                            {product.size && product.size.length > 0
                              ? product.size.join(', ')
                              : '-'}
                          </td>
                          <td>{product.category?._id ? product.category.name : '-'}</td>
                          <td>
                            {product.variant && product.variant.length > 0
                              ? product.variant.join(', ')
                              : '-'}
                          </td>
                          <td>${product.price > 0 ? product.price : 0}</td>
                          <td>
                            <div className="products__controls">
                              <button
                                id="delete__button"
                                className="dashboard__buttons"
                                onClick={() => {
                                  handelDelete(product.slug)
                                }}>
                                <AiFillDelete />
                              </button>
                              <button
                                className="dashboard__buttons"
                                id="update__button"
                                onClick={() => {
                                  handleUpdate(product)
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

export default AdminProducts
