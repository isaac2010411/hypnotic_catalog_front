import { Avatar, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useGet } from '../../customHooks/useGet'
import { AppContext } from '../../contexts/AppContext'
import { useNavigate } from 'react-router-dom'
import { formatNumber } from '../../commons'
import ContainerPage from '../../components/ContainerPage'
import { RemoveRedEye } from '@mui/icons-material'
import SearchProduct from '../../components/SearchProduct'

function HomePage() {
  const { data, error, getData, isLoading } = useGet()
  const { addToCart, substractToCart, cart } = useContext(AppContext)
  const [filteredproducts, setFilteredProducts] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    getData(`${process.env.REACT_APP_API}/api/catalog/${window.location.pathname.split('/')[1]}/${
      window.location.pathname.split('/')[2]
    }`)
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <ContainerPage title='Hypnotic Grow Shop' backAction={false}>
      <SearchProduct data={data} setFilteredProducts={setFilteredProducts}>
        {filteredproducts
          .filter((g) => g.stock_asignado > 0)
          .flat(Infinity)
          .map((i, j) => (
            <Grid item xs={12} key={j}>
              <Card>
                <CardHeader
                  title={<Typography fontSize={'13px'}>{i.name}</Typography>}
                  subheader={i.product_code}
                  avatar={<Avatar src={`${i.image}`} />}
                />
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} textAlign='end'>
                      <Typography variant='body1' fontSize={'18px'}>
                        {formatNumber(i.price)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>

                <CardActions style={{ justifyContent: 'space-between' }}>
                  <Typography variant='body2'> stock {i.stock_asignado}</Typography>

                  <div>
                    <IconButton
                      color='secondary'
                      onClick={() => substractToCart(i)}
                      disabled={!cart.find((j) => j.product_code === i.product_code)}
                    >
                      -
                    </IconButton>
                    <IconButton
                      color='secondary'
                      onClick={() => addToCart(i)}
                      disabled={
                        i.stock_asignado === 0 ||
                        cart.find((j) => j.product_code === i.product_code)?.quantity === i.stock_asignado
                      }
                    >
                      +
                    </IconButton>
                  </div>
                  <IconButton
                    onClick={() => navigate(`/product/${i.product_code}/${window.location.pathname.split('/')[1]}/${
                      window.location.pathname.split('/')[2]
                    }`)}
                  >
                    <RemoveRedEye color='disabled' />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </SearchProduct>
    </ContainerPage>
  )
}

export default HomePage
