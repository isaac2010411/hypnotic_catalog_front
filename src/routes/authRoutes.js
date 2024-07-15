import { useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'

const AuthRoutes = ({ children }) => {
  const { userInfo } = useContext(AppContext)

  let location = useLocation()

  if (!userInfo) {
    return <Navigate to='/sign-in' state={{ from: location }} replace />
  }

  return children
}

export default AuthRoutes