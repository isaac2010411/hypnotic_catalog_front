import { Button, Card, CardContent, Grid, TextField } from '@mui/material'
import { useEffect, useState } from 'react'

function SearchProduct({ data, children, setFilteredProducts }) {
  const [filterText, setFilterText] = useState('')

  const [originalProducts, setOriginalProducts] = useState([])

  useEffect(() => {
    if (data) {
      setOriginalProducts(data)
    }
  }, [data])

  useEffect(() => {
    if (filterText.length > 0) {
      setFilteredProducts(
        originalProducts.flat(Infinity).filter((item) => item.name.toLowerCase().search(filterText.toLowerCase()) > -1)
      )
    } else {
      setFilteredProducts(originalProducts.flat(Infinity))
    }
  }, [filterText, originalProducts])

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={1} mt={1} mb={0.5}>
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  size='small'
                  placeholder='Nombre de producto..'
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Button style={{ height: '40px' }} fullWidth variant='outlined' color='primary'>
                  Buscar
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      <hr style={{ marginTop: '1rem' }} />

      {children}
    </>
  )
}

export default SearchProduct
