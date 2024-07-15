import { useContext } from 'react'
import { Close, AddCircle, RemoveCircle } from '@mui/icons-material'
import { Avatar, Divider, Grid, IconButton, Typography } from '@mui/material'
import { AppContext } from '../../contexts/AppContext'
import { formatNumber } from '../../commons'

const CarItem = ({ item }) => {
  const { addToCart, substractToCart, quitToCart,cart } = useContext(AppContext)

  return (
    <Grid container spacing={1} p={1} mt={2} display='flex' alignContent='center'>
      <Grid item xs={3}>
        <Avatar variant='rounded' style={{ height: '100%', width: '100%' }} src={`${item.image}`} />
      </Grid>
      <Grid item xs={8.5}>
        <Grid container>
          <Grid item xs={11}>
            <Typography fontSize='12px' fontWeight='600'>
              {item.name}
            </Typography>
            <Typography fontSize='10px'>{item.product_code}</Typography>
          </Grid>
          <Grid item xs={1} mt={-1.5}>
            <IconButton onClick={() => quitToCart(item)}>
              <Close />{' '}
            </IconButton>
          </Grid>
          <Grid item xs={6} style={{ alignItems: 'center' }}>
            <span style={{ textAlign: 'end' }}>{formatNumber(item.price)} x 1u</span>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'end' }}>
            <IconButton color='secondary'    disabled={!cart.find((j) => j.product_code === item.product_code)} onClick={() => substractToCart(item)}>
              <RemoveCircle />
            </IconButton>
            <Typography variant='span'>{item.quantity}</Typography>
            <IconButton
              color='secondary'
              disabled={
                item.stock_asignado === 0 ||
                cart.find((j) => j.product_code === item.product_code)?.quantity === item.stock_disponible
              }
              onClick={() => addToCart(item)}
            >
              <AddCircle />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
    </Grid>
  )
}

export default CarItem
