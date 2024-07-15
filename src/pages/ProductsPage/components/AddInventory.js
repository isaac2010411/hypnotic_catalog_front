import { Button, Card, CardContent, CardHeader, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useGet } from '../../../customHooks/useGet'
import { usePost } from '../../../customHooks/usePost'
import ContainerPage from '../../../components/ContainerPage'
import WidgetsIcon from '@mui/icons-material/Widgets'
import { useLocation, useNavigate } from 'react-router-dom'

function ProviderSelect({ product, setProduct }) {
  const { data, getData } = useGet()

  useEffect(() => {
    getData(`${process.env.REACT_APP_API}/api/providers`)
  }, [])

  return (
    <Box sx={{ minWidth: 120 }}>
      {data && (
        <FormControl fullWidth required>
          <InputLabel id='demo-simple-select-label'>Proveedor</InputLabel>
          <Select
            required
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={product.provider_id}
            label='Proveedor'
            name='provider_id'
            onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
          >
            {data.flat(Infinity).map((i) => (
              <MenuItem key={i._id} value={i._id}>
                {i.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  )
}

function BillSelect({ product, setProduct }) {
  const { data, getData } = useGet()

  useEffect(() => {
    getData(`${process.env.REACT_APP_API}/api/bills`)
  }, [])

  return (
    <Box sx={{ minWidth: 120 }}>
      {data && (
        <FormControl required fullWidth>
          <InputLabel id='demo-simple-select-label'>Codigo de factura</InputLabel>
          <Select
            required
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={product.bill_code}
            label='Codigo de factura'
            name='bill_code'
            onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
          >
            {data.flat(Infinity).map((i) => (
              <MenuItem key={i._id} value={i.bill_code}>
                {i.bill_code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </Box>
  )
}

function Addinventory() {
  const location = useLocation()
  const [product, setProduct] = useState({ provider_id: '', bill_code: '', images: '' })

  const { postData, isLoading, data } = usePost()

  const navigate = useNavigate()

  useEffect(() => {
    let timeOut
    if (data.length > 0) {
      timeOut = setTimeout(() => {
        navigate(`/product/${location.pathname.split('/')[2]}`)
      }, 1500)
    }

    return () => clearTimeout(timeOut)
  }, [data])

  const handleProduct = (e) => {
    e.preventDefault()
    const product_code = location.pathname.split('/')[2]

    postData(
      `${process.env.REACT_APP_API}/api/products/${product_code}/add-inventory`,
      JSON.stringify({ ...product, product_code })
    )
  }
  return (
    <ContainerPage title='Agregar unidades'>
      <Grid item xs={12}>
        <Card variant='outlined' component='form' style={{ padding: '8px' }} onSubmit={handleProduct}>
          <CardHeader avatar={<WidgetsIcon color='disabled' />} />
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <ProviderSelect product={product} setProduct={setProduct} />
              </Grid>
              <Grid item xs={12}>
                <BillSelect product={product} setProduct={setProduct} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name='nameByProvider'
                  label='Nombre producto proveedor'
                  onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  name='unit_price'
                  type='number'
                  label='Precio unitario'
                  onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='quantity'
                  type='number'
                  label='Cantidad'
                  onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button disabled={isLoading} color='secondary' variant='outlined' fullWidth type='submit'>
                  {isLoading ? 'Guardando' : data.length > 0 ? 'Guardado' : 'Guardar'}
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </ContainerPage>
  )
}

export default Addinventory
