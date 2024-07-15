import { Button, Grid, Typography } from '@mui/material'
import CartEmptySvg from '../../../assets/emptyCart.svg'

const EmptyCart = () => {

  return (
    <>
      <Grid
        item
        xs={12}
        style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant='h4' align='center'>
          Carrito Vacio
        </Typography>
        <Typography variant='subtitle1' align='center' style={{ paddingBottom: '15px', marginTop: '16px' }}>
          Probablemente aún no hayas seleccionado nada. Para seleccionar y ordenar, vaya a la Tienda.
        </Typography>
        <img
          src={CartEmptySvg}
          alt='empty-cart'
          style={{
            objectPosition: 'center',
            aspectRatio: '4 / 4',
            width: ' 40%',
            height: '40%',
            maxHeight: '400px',
            padding: '5px',
            borderRadius: '10px',
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={10}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '25px' }}
      >
        <Button
          variant='outlined'
          color='secondary'
          onClick={() =>
            window.location.href = `${process.env.REACT_APP_FRONT}/${window.location.pathname.split('/')[2]}/${window.location.pathname.split('/')[3]}`
          }
        >
          Ir a Tienda
        </Button>
      </Grid>
    </>
  )
}

export default EmptyCart
