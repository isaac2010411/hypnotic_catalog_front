import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Layout from '../components/Layout/Layout'
import CartScreen from '../pages/CartScreen/CartScreen'
import ProductDetails from '../pages/ProductsPage/components/ProductDetails'
import PublicRoutes from './publicRoutes'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route
          path='/:seller/:code'
          element={
            <PublicRoutes>
              <HomePage />
            </PublicRoutes>
          }
        />

        <Route
          path='/product/:id/:seller/:code'
          element={
            <PublicRoutes>
              <ProductDetails />{' '}
            </PublicRoutes>
          }
        />
        <Route
          path='/cart/:seller/:code'
          element={
            <PublicRoutes>
              <CartScreen />{' '}
            </PublicRoutes>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
