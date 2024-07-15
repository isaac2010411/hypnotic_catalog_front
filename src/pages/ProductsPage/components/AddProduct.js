import { Button, Card, CardContent, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useGet } from '../../../customHooks/useGet'
import { usePost } from '../../../customHooks/usePost'
import ContainerPage from '../../../components/ContainerPage'
import DragAndDropFile from './AddProductImage'

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

function AddProduct() {
  const [product, setProduct] = useState({ provider_id: '', bill_code: '', images: '' })

  const { postData, isLoading, data } = usePost()

  useEffect(() => {
    let timeOut
    // if (data.length > 0) {
    //   timeOut = setTimeout(() => {
    //     navigate('/products')
    //   }, 1500)
    // }

    return () => clearTimeout(timeOut)
  }, [data])

  // Convierte un archivo a base64 y devuelve una Promesa que se resuelve con el resultado
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => resolve(reader.result) // Resuelve la promesa con el resultado en base64
      reader.onerror = (error) => reject(error) // Rechaza la promesa si ocurre un error
    })
  }

  const handleProduct = async (e) => {
    e.preventDefault()
    const base64Image = await getBase64(product.images)
    
    postData(
      `${process.env.REACT_APP_API}/api/products`,
      JSON.stringify({ ...product, fileContent: base64Image, fileName: Date.now() + product.images.name })
    )
  }
  return (
    <ContainerPage title='Nuevo producto'>
      <Grid item xs={12}>
        <Card variant='outlined' component='form' style={{ padding: '8px' }} onSubmit={handleProduct}>
          <CardContent>
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
                    typeof product.images === 'string'
                      ? `${process.env.REACT_APP_API}/public/assets/img/avatars/avatar.jpg`
                      : URL.createObjectURL(product.images)
                  }
                />
              </Grid>
              <DragAndDropFile productState={product} setProductState={setProduct} />
              <Grid item xs={12}>
                <ProviderSelect product={product} setProduct={setProduct} />
              </Grid>
              <Grid item xs={12}>
                <BillSelect product={product} setProduct={setProduct} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='name'
                  label='Nombre'
                  onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
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
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={5}
                  name='description'
                  label='Descripcion'
                  onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  // disabled={isLoading}
                  color='secondary'
                  variant='outlined'
                  fullWidth
                  type='submit'
                >
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

export default AddProduct
