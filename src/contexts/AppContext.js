import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AppContext = createContext()

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate()

  const [userInfo, setUserInfo] = useState()
  const [drawerState, setDrawerState] = useState(false)
  const [shippingPrice, setShippingPrice] = useState(0)
  const [payments, setPayments] = useState([])

  const toggleDrawerState = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setDrawerState(open)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [window.location.pathname])


  const [cart, setCartItems] = useState([])

  const addQuantity = (item) => {
    const data = cart.map((obj) => {
      if (obj.product_code === item.product_code) {
        obj.quantity = Number(obj.quantity) + 1
        obj.stock_asignado = obj.stock_asignado - 1
      }
      return obj
    })
    setCartItems(data)
  }

  const substractQuantity = (item) => {
    const data = cart.map((obj) => {
      if (obj.product_code === item.product_code) {
        obj.quantity = Number(obj.quantity) - 1
        obj.stock_asignado = obj.stock_asignado +1
      }
      return obj
    })
    setCartItems(data)
  }

  const totalPrice = () => {
    let totalAmount = cart
      .map((item) => item.price * item.quantity)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    return totalAmount
  }

  const totalQuantity = () => {
    let totalAmount = cart
      .map((item) => item.quantity)
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0)

    return totalAmount
  }

  const addToCart = (item) => {
    const isItemInCart = cart.find((ca) => ca.product_code === item.product_code)
    if (isItemInCart) {
      addQuantity(item)
    } else {
      setCartItems((prev) => [{ ...item, quantity: 1, stock_asignado: item.stock_asignado - 1 }, ...prev])
    }
  }
  const quitToCart = (item) => {
    const isItemInCart = cart.find((ca) => ca.product_code === item.product_code)
    const data = cart.filter((c) => c.product_code !== isItemInCart.product_code)
    setCartItems(data)
  }
  const substractToCart = (item) => {
    const isItemInCart = cart.find((ca) => ca.product_code === item.product_code)
    if (isItemInCart.quantity === 1) {
      const data = cart.filter((c) => c.product_code !== isItemInCart.product_code)
      setCartItems(data)
    } else {
      substractQuantity(item)
    }
  }

  return (
    <AppContext.Provider
      value={{
        drawerState,
        setDrawerState,
        navigate,
        setCartItems,
        toggleDrawerState,
        userInfo,
        setUserInfo,
        cart,
        addToCart,
        totalPrice,
        totalQuantity,
        substractToCart,
        quitToCart,
        shippingPrice,
        setShippingPrice,
        payments,
        setPayments,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
