import jwtDecode from 'jwt-decode'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '/styles/activate-account.css'

import { activateUsersAccount } from '../../redux/slices/userSlice'

const ActivateAccount = () => {
  const { token } = useParams()
  const decoded = jwtDecode(String(token))
  const navigate = useNavigate()

  const handleActivate = async () => {
    try {
      const response = await activateUsersAccount(String(token))
      toast.success(response, {
        onClose: () => {
          navigate('/signin')
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="activate-account-section">
      <ToastContainer />
      <h1 className="activate-geader">Hello, {decoded.name}!</h1>
      <button onClick={handleActivate} className="activate-account-section__activate-button">
        Activate Your Account
      </button>
    </div>
  )
}

export default ActivateAccount
