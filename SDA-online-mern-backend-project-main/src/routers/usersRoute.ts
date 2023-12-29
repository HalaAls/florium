import { Router } from 'express'

import {
  activateUser,
  banUser,
  createUser,
  deleteSingUser,
  forgetPassword,
  getAllUsers,
  getSingleUser,
  grantRole,
  processRegisterUser,
  resetPassword,
  unBanUser,
  updateUser,
} from '../controllers/userController'
import { isAdmin, isLoggedIn, isLoggedOut } from '../middlewares/auth'
import { uploadImageUser } from '../middlewares/uploadFile'
import { userValidator } from '../validator/userValidator'

const router = Router()

//comment them now for testing purpeses and uncomment them later when you finish xoxo
router.patch('/grant-role', isLoggedIn, isAdmin, grantRole)

router.post(
  '/process-register',
  uploadImageUser.single('image'),
  userValidator,
  isLoggedOut,
  processRegisterUser
)
router.post('/activate', activateUser)
router.post('/', uploadImageUser.single('image'), userValidator, isLoggedIn, isAdmin, createUser)
router.post('/forget-password', isLoggedOut, forgetPassword)
router.put('/reset-password', isLoggedOut, resetPassword)
router.get('/', isLoggedIn, getAllUsers)
router.get('/:email', isLoggedIn, isAdmin, getSingleUser)

router.delete('/:email', isLoggedIn, isAdmin, deleteSingUser)
router.put('/:email', uploadImageUser.single('image'), userValidator, updateUser)
router.put('/ban/:email', isLoggedIn, isAdmin, banUser)
router.put('/unban/:email', isLoggedIn, isAdmin, unBanUser)


export default router
