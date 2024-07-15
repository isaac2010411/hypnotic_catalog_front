import { Fragment, useContext } from 'react'
import { AppContext } from '../../contexts/AppContext'
import CarItem from '../CartItem/CartItem'

const CartList = () => {
  const { cart } = useContext(AppContext)

  return (
    <>
      {cart.map((item, i) => (
        <Fragment key={i}>
          <CarItem item={item} />
        </Fragment>
      ))}
    </>
  )
}

export default CartList
