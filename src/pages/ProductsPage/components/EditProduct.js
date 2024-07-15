import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useGet } from '../../../customHooks/useGet'
import ContainerPage from '../../../components/ContainerPage'
import { usePut } from '../../../customHooks/usePut'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

function EditProduct() {
  const [product, setProduct] = useState({ provider_id: '', bill_code: '', name: '', price: '', product_code: '' })
  const navigate = useNavigate()
  const { data, getData } = useGet()
  const { putData ,isLoading, data:postD} = usePut()


  useEffect(() => {
    let timeOut
    if (postD.length > 0) {
      timeOut = setTimeout(() => {
        navigate('/products')
      }, 1500)
    }

    return () => clearTimeout(timeOut)
  }, [postD])

  useEffect(() => {
    getData(`${process.env.REACT_APP_API}/api/products/${window.location.pathname.split('/')[2]}/edit`)
  }, [])

  

  useEffect(() => {
    if (data) {
      setProduct((prev) => data.flat(Infinity)[0])
    }
  }, [data])

  const handleProduct = (e) => {
    e.preventDefault()
    putData(`${process.env.REACT_APP_API}/api/products/${product.product_code}/edit`, JSON.stringify(product))
  }

  return (
    <ContainerPage title='Editar Producto'>
      <Grid item xs={12}>
        <Card variant='outlined' component='form' onSubmit={handleProduct}>
          <CardHeader avatar={<EditIcon color='disabled' />} />
          <CardContent>
            {product && (
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    required
                    disabled
                    fullWidth
                    name='product_code'
                    value={product.product_code}
                    label='Codigo'
                    onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='name'
                    value={product.name}
                    label='Nombre'
                    onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    value={product.price}
                    name='price'
                    label='Precio'
                    onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    multiline
                    rows={5}
                    value={product?.description}
                    name='description'
                    label='Descripcion'
                    onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                <Button disabled={isLoading} color='secondary' variant='outlined' fullWidth type='submit'>
                  {isLoading ? 'Guardando' : postD.length > 0 ? 'Guardado' : 'Guardar'}
                </Button>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </Card>
      </Grid>
    </ContainerPage>
  )
}

export default EditProduct
