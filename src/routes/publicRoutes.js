import { useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { AppContext } from '../contexts/AppContext'

const PublicRoutes = ({ children }) => {
  const { userInfo } = useContext(AppContext)

  let location = useLocation()

  if (userInfo) {
    return <Navigate to='/' state={{ from: location }} replace />
  }

  return children
}

export default PublicRoutes