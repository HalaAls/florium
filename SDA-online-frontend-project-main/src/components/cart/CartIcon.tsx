import { FaShoppingCart } from 'react-icons/fa'

const CartIcon = ({ items }: { items: number }) => {
  return (
    <>
      <FaShoppingCart />
      <span>{items}</span>
    </>
  )
}

export default CartIcon
