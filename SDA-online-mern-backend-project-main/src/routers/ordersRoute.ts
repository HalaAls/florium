import express from 'express'

import {
  handleProcessPayment,
  getAllOrdersForAdmin,
  getOrderForUser,
  updateOrderStatus,
  generateBraintreeClientToken,
  handleBrainTreePayment,
} from '../controllers/orderController'
import { isAdmin, isLoggedIn } from '../middlewares/auth'

const router = express.Router()

router.get('/', isLoggedIn, isAdmin, getAllOrdersForAdmin)
router.post('/process-payment', isLoggedIn, handleProcessPayment)
router.get('/:id([0-9a-fA-F]{24})', getOrderForUser)
router.put('/:id([0-9a-fA-F]{24})', isLoggedIn, isAdmin, updateOrderStatus)
// get the braintree client token
router.get('/braintree/token', isLoggedIn, generateBraintreeClientToken)
router.post('/braintree/payment', isLoggedIn, handleBrainTreePayment)

export default router
