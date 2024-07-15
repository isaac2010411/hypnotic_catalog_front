import { useContext, useEffect, useState } from 'react'
import { Button, Grid, Typography, TextField, CardContent, CardHeader, Card, CardActions } from '@mui/material'
import CartList from '../../components/CartList/CartList'
import EmptyCart from './components/EmptyCart'
import { AppContext } from '../../contexts/AppContext'
import { usePost } from '../../customHooks/usePost'
import ContainerPage from '../../components/ContainerPage'
import { formatNumber } from '../../commons'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const CartScreen = () => {
  const { totalPrice, cart, startOrder } = useContext(AppContext)
  const [step, setStep] = useState(false)
  const [user, setUser] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
  })

  const { postData, isLoading, data } = usePost()

  useEffect(() => {
    let timeOut
    if (data.length > 0) {
      console.log(data)
      //   timeOut = setTimeout(() => {
      //     setCartItems([])
      //     navigate(`/`)
      //   }, 1500)
      // }
    }
    return () => clearTimeout(timeOut)
  }, [data])

  const handleOrder = (e) => {
    e.preventDefault()
    if (cart.length < 1) {
      return
    }

    setStep(true)
  }

  const handleRequest = (e) => {
    e.preventDefault()
    if (cart.length < 1) {
      return
    }
    postData(
      `${process.env.REACT_APP_API}/api/catalog/${window.location.pathname.split('/')[2]}/${
        window.location.pathname.split('/')[3]
      }`,
      JSON.stringify({
        cart,
        user,
        seller:window.location.pathname.split('/')[2],
        total: Number(totalPrice()),
      })
    )

   
  }

  return (
    <div>
      {!cart.length > 0 ? (
        <Grid container justifyContent='center' direction='row' alignItems='center' p={1} style={{ marginTop: '15px' }}>
          <EmptyCart />
        </Grid>
      ) : (
        !startOrder && (
          <ContainerPage title='Resumen del pedido'>
            <Grid item xs={12} md={8}>
              <CartList />
              <Typography align='right'>
                Importe total <b style={{ fontSize: '18px' }}>{formatNumber(totalPrice())}</b>
              </Typography>
            </Grid>
            {step ? (
              <Grid item xs={12} mt={5}>
                <Card>
                  <CardHeader title='Confirma tu compra' avatar={<PersonAddIcon color='disabled' />} />
                  <CardContent>
                    <Grid
                      container
                      spacing={1}
                      component='form'
                      //  onSubmit={handleUser}
                    >
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          name='name'
                          type='text'
                          label='Nombre'
                          onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          name='lastName'
                          type='text'
                          label='Apellido'
                          onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          name='email'
                          type='email'
                          label='Email'
                          onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          name='phone'
                          type='text'
                          label='Celular'
                          onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button variant='outlined' disabled={isLoading} fullWidth color='secondary' onClick={handleRequest}>
                      Confirmar
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Button variant='outlined' disabled={isLoading} fullWidth color='secondary' onClick={handleOrder}>
                  Siguiente
                </Button>
              </Grid>
            )}
          </ContainerPage>
        )
      )}
    </div>
  )
}

export default CartScreen
