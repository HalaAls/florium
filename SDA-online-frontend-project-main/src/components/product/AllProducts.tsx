import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { baseURL } from '../../api'
import SearchInput from '../../components/filter/SearchInput'
import SortProducts from '../../components/filter/SortProducts'
import useCartState from '../../hooks/useCartState'
import useCategoriesState from '../../hooks/useCategoriesState'
import useProductsState from '../../hooks/useProductsState'
import { prices } from '../../prices'
import { addToCart } from '../../redux/slices/cartSlice'
import { Product, fetchProducts } from '../../redux/slices/productSlice'
import { AppDispatch } from '../../redux/store'

import { LiaShoppingBasketSolid } from 'react-icons/lia'
import '/styles/all-products.css'

const AllProducts = () => {
  const dispatch: AppDispatch = useDispatch()
  const { products, error, searchTerm, pagination, sort } = useProductsState()
  const { categories } = useCategoriesState()
  const { cartItems } = useCartState()

  const [checkedCategories, setCheckedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(3)

  const fetchData = async () => {
    await dispatch(
      fetchProducts({
        page: currentPage,
        limit: itemsPerPage,
        category: checkedCategories,
        priceRange: priceRange,
        sort: sort,
        searchTerm: searchTerm
      })
    )
    // await dispatch(fetchCategories())
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, itemsPerPage, checkedCategories, priceRange, sort, searchTerm])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // const handleAddToCart = (product: Product) => {
  //   dispatch(addToCart(product))
  // }
  // const handleAddToCart = (product: Product) => {
  //   dispatch(
  //     addToCart({
  //       ...product,
  //       size: product.size.length > 0 && product.size[0],
  //       variant: product.variant.length > 0 && product.variant[0],
  //       quantity: 1
  //     })
  //   )
  // }

  const handleAddToCart = (product: Product) => {
    // to check if the product is already in the cart
    const isProductInCart = cartItems.some((item) => item._id === product?._id)
    if (isProductInCart) {
      console.log('Product is already in the cart.')
    } else {
      // if not in the cart then add it
      dispatch(
        addToCart({
          ...product,
          size: product.size.length > 0 && product.size[0],
          variant: product.variant.length > 0 && product.variant[0],
          quantity: 1
        })
      )
      // setQuantityErrorMessage(null)
    }
  }

  const handleCheckedCategories = (category: string) => {
    if (checkedCategories.includes(category)) {
      const filterdCheckedCategories = checkedCategories.filter(
        (categoryName) => categoryName !== category
      )
      setCheckedCategories(filterdCheckedCategories)
    } else {
      setCheckedCategories((prevCategory) => {
        const newCheckedCategories = [...prevCategory, category]
        return newCheckedCategories
      })
    }
  }

  const handleSelectedPrice = (priceId: number) => {
    const selectedPrice = prices.find((price) => price.id === priceId)
    if (selectedPrice) {
      const selectedPriceRange = selectedPrice.range
      setPriceRange(selectedPriceRange)
    }
  }

  const handlePriceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSelectedPrice(parseInt(event.target.value, 10))
  }

  const buttonElements = []
  for (let i = 2; i <= pagination.totalPages - 1; i++) {
    buttonElements.push(
      <button
        onClick={() => {
          handlePageChange(i)
        }}
        className={currentPage === i ? 'active' : ''}>
        {i}
      </button>
    )
  }
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1)
  }

  return (
    <main className="main">
      <section className="product-section">
        <div className="section-title">
          <h3 className="title">Products</h3>
        </div>
        <div className="section-filter grid">
          <div className="search">
            <label htmlFor="product">Search For Product:</label>
            <div className="filter flex">
              <SearchInput />
            </div>
          </div>

          <div className="sort">
            <label htmlFor="">Sort By:</label>
            <div className="filter flex">
              <SortProducts />
            </div>
          </div>

          <div className="price">
            <div className="filter-price-list">
              <label htmlFor="price" className="filter__value">
                Price:
              </label>
              <div className="filter flex">
                <select
                  id="price"
                  name="price"
                  className="filter-price"
                  onChange={handlePriceChange}>
                  {prices.length > 0 &&
                    prices.map((price) => (
                      <option key={price.id} value={price.id}>
                        {price.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="filter-by-category">
            <label className="filter__label">Category:</label>
            <div className="filter-category-list filter ">
              <div className="dropdown">
                <button className="dropbtn">Select Categories</button>
                <div className="dropdown-content">
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <label
                        key={category._id}
                        htmlFor={`category-${category._id}`}
                        className="filter__value">
                        <input
                          type="checkbox"
                          id={`category-${category._id}`}
                          value={category.name}
                          name="category"
                          className="filter__input"
                          onChange={() => {
                            handleCheckedCategories(category._id)
                          }}
                        />
                        {category.name}
                      </label>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-content grid">
          {products.length > 0 &&
            products.map((product) => {
              return (
                <div className="single-product" key={product._id}>
                  <Link to={`../product/${product.slug}`} className="product-link">
                    <div className="img-div">
                      <img src={`${baseURL}/${product.image}`} alt={product.name} />
                    </div>
                    <div className="card-info">
                      <h4 className="product-title">{product.name}</h4>
                    </div>
                  </Link>
                  <div className="card-controller flex">
                    <h5 className="price">${product.price}</h5>
                    <button
                      className="btn flex"
                      onClick={() => {
                        handleAddToCart(product)
                      }}>
                      Buy <LiaShoppingBasketSolid className="icon" />
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            previous
          </button>
          {buttonElements}
          <button onClick={handleNextPage} disabled={currentPage === pagination.totalPages}>
            next
          </button>
        </div>
      </section>
    </main>
  )
}

export default AllProducts
