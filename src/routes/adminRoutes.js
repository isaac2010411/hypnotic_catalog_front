import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'
import role from '../cofig/role'

const AdminRoutes = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userLogin)

  let location = useLocation()

  if (!userInfo?.isAdmin && userInfo?.role !== role.ADMIN_ROLE) {
    return <Navigate to='/ventas' state={{ from: location }} replace />
  }

  return children
}

export default AdminRoutes