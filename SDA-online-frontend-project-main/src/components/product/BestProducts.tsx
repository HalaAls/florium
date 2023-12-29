import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../../redux/store'

import { baseURL } from '../../api'
import useProductsState from '../../hooks/useProductsState'
import { addToCart } from '../../redux/slices/cartSlice'
import { Product } from '../../redux/slices/productSlice'

import { LiaShoppingBasketSolid } from 'react-icons/lia'
import '/styles/all-products.css'

import useCartState from '../../hooks/useCartState'

const BestProducts = () => {
  const dispatch: AppDispatch = useDispatch()
  const { products, error } = useProductsState()
  const { cartItems } = useCartState()

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
    }
  }

  const bestSeller = products
    .slice()
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 3)

  return (
    <main className="main">
      <section className="product-section ">
        <div className="section-title">
          <h3 className="title">Best Seller</h3>
        </div>

        <div className="section-content grid">
          {bestSeller.length > 0 &&
            bestSeller.map((product) => {
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
      </section>
    </main>
  )
}

export default BestProducts
