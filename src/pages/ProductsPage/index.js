import { Avatar, Card, CardActions, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useGet } from '../../customHooks/useGet'
import { useNavigate } from 'react-router-dom'
import ContainerPage from '../../components/ContainerPage'
import { formatNumber } from '../../commons'
import { East } from '@mui/icons-material'
import SearchProduct from '../../components/SearchProduct'

function ProductsPage() {
  const { data, isLoading, error, getData } = useGet()
  const [filteredproducts, setFilteredProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getData(`${process.env.REACT_APP_API}/api/products`)
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }
  return (
    <ContainerPage
      title='Productos'
      actions={
        <IconButton
          onClick={() => {
            navigate(`/product/add`)
          }}
        >
          +
        </IconButton>
      }
    >
      <SearchProduct data={data} setFilteredProducts={setFilteredProducts}>
        {filteredproducts.flat(Infinity).map((i) => (
          <Grid item xs={12} key={i._id}>
            <Card>
              <CardHeader avatar={<Avatar src={`${i.image}`} />} title={i.name} subheader={i.product_code} />
              <CardContent>
                <Typography textAlign='start'>Consignados {i?.consigned_total || 0}</Typography>
                <Typography textAlign='start'>Inventario {i.inventory_total}</Typography>
                <Typography textAlign='end'>{formatNumber(i.price)}</Typography>
              </CardContent>
              <CardActions style={{ display: 'flex', justifyContent: 'end' }}>
                <IconButton
                  onClick={() => {
                    navigate(`/product/${i.product_code}`)
                  }}
                >
                  <East />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </SearchProduct>
    </ContainerPage>
  )
}

export default ProductsPage
