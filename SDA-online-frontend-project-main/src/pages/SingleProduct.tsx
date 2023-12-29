import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { baseURL } from '../api'
import useCartState from '../hooks/useCartState'
import useProductsState from '../hooks/useProductsState'
import { addToCart } from '../redux/slices/cartSlice'
import { getSingleProduct } from '../redux/slices/productSlice'
import { AppDispatch } from '../redux/store'

import { AiFillShopping } from 'react-icons/ai'
import { LiaReplyAllSolid } from 'react-icons/lia'
import '/styles/single-product.css'

const SingleProduct = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedVariant, setSelectedVariant] = useState('')
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const [quantityErrorMessage, setQuantityErrorMessage] = useState<string | null>(null)
  const { cartItems } = useCartState()

  const { slug } = useParams()
  const { singleProduct } = useProductsState()

  useEffect(() => {
    dispatch(getSingleProduct(String(slug)))
  }, [slug])

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
  }
  const handleVariantSelect = (variant: string) => {
    setSelectedVariant(variant)
  }

  const incrementQuantity = () => {
    if (singleProduct && selectedQuantity < singleProduct.quantity) {
      setSelectedQuantity((prevQuantity) => prevQuantity + 1)
    } else {
      setQuantityErrorMessage('Cannot add more than available quantity.')
    }
  }

  const decrementQuantity = () => {
    setSelectedQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
    setQuantityErrorMessage(null)
  }

  const handleAddToCart = () => {
    if (selectedSize && selectedVariant && selectedQuantity > 0) {
      // to check if the product is already in the cart
      const isProductInCart = cartItems.some(
        (item) =>
          item._id === singleProduct?._id &&
          item.size.includes(selectedSize) &&
          item.variant.includes(selectedVariant)
      )
      if (isProductInCart) {
        setQuantityErrorMessage('Product is already in the cart.')
      } else {
        // if not in the cart then add it
        dispatch(
          addToCart({
            ...singleProduct,
            size: selectedSize,
            variant: selectedVariant,
            quantity: selectedQuantity
          })
        )
        setQuantityErrorMessage(null)
      }
    } else {
      setQuantityErrorMessage('Please select size, variant, and quantity before adding to cart.')
    }
  }
  return (
    <section className="">
      <div className="container">
        {singleProduct && (
          <div className="row">
            <div className="left-column">
              <img src={`${baseURL}/${singleProduct.image}`} alt={singleProduct.name} />
            </div>

            <div className="right-column">
              <div className="product-description">
                <span>{singleProduct.category.name}</span>
                <h1 className="product__name">{singleProduct.name}</h1>
                <p>{singleProduct.description}</p>
              </div>

              <div className="product-details">
                <div className="details">
                  {singleProduct.size.length > 0 && (
                    <div className="choose">
                      <span>Size</span>
                      {singleProduct.size.map((size, index) => (
                        <button
                          key={index}
                          onClick={() => handleSizeSelect(size)}
                          className={selectedSize === size ? 'selected' : ''}>
                          {size}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="details">
                  {singleProduct.variant.length > 0 && (
                    <div className="choose">
                      <span>Variant</span>
                      {singleProduct.variant.map((variant, index) => (
                        <button
                          key={index}
                          onClick={() => handleVariantSelect(variant)}
                          className={selectedVariant === variant ? 'selected' : ''}>
                          {variant}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="details">
                  <div className="choose">
                    <span>Quantity: </span>
                    <button onClick={decrementQuantity}>-</button>
                    <span>{selectedQuantity}</span>
                    <button onClick={incrementQuantity}>+</button>
                    {quantityErrorMessage && (
                      <p className="error-message">{quantityErrorMessage}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="product-price">
                <span>{singleProduct.price}$</span>
                <button
                  onClick={() => {
                    handleAddToCart()
                  }}>
                  Add to Cart
                  <AiFillShopping className="icon" />
                </button>
                <button
                  onClick={() => {
                    navigate('/')
                  }}>
                  <LiaReplyAllSolid className="icon" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default SingleProduct
