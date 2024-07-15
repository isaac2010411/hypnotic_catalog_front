import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useGet } from '../../../customHooks/useGet'
import ContainerPage from '../../../components/ContainerPage'
import { formatNumber } from '../../../commons'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

function ProductDetails() {
  const { data, getData } = useGet()
  const [productState, setProductState] = useState({})

  useEffect(() => {
    
    getData(
      `${process.env.REACT_APP_API}/api/catalog/${window.location.pathname.split('/')[2]}/${window.location.pathname.split('/')[3]}/${
        window.location.pathname.split('/')[4]
      }`
    )
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      setProductState((prev) => ({ ...prev, ...data.flat(Infinity)[0], images: data.flat(Infinity)[0]?.image }))
    }
  }, [data])

  return (
    <ContainerPage title='Detalle de producto'>
      <Grid item xs={12}>
        <Card variant='outlined'>
          <CardHeader avatar={<LocalOfferIcon color='disabled' />} />
          <CardContent>
            {data && (
              <Grid container spacing={1}>
                <Grid item xs={12} style={{ position: 'relative' }}>
                  <img
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      aspectRatio: '1 / 1',
                      width: ' 100%',
                      height: '100%',
                      borderRadius: '10px',
                    }}
                    src={
                      productState.images && typeof productState.images === 'string'
                        ? `${productState.image}`
                        : productState.images && URL.createObjectURL(productState.images)
                    }
                  ></img>
                </Grid>

                <Grid item xs={7}>
                  <Grid item xs={12}>
                    <Typography fontWeight='600' fontSize='14px'>
                      {productState?.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography fontSize='14px'>{productState?.product_code}</Typography>
                  </Grid>
                  <Grid item xs={12} mb={3}>
                    <Typography fontSize='14px'>Disponible: {productState?.total} unidades</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={5} textAlign='center' alignSelf='center'>
                  <Typography variant='h5'> {formatNumber(productState?.price || 0)}</Typography>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      </Grid>
    </ContainerPage>
  )
}

export default ProductDetails
