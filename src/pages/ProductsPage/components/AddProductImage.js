import { Button, Grid } from '@mui/material'
import { usePut } from '../../../customHooks/usePut'

// Convierte un archivo a base64 y devuelve una Promesa que se resuelve con el resultado
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => resolve(reader.result) // Resuelve la promesa con el resultado en base64
    reader.onerror = (error) => reject(error) // Rechaza la promesa si ocurre un error
  })
}

const DragAndDropFile = ({ productState, setProductState, edit }) => {
  const classes = {}
  const { putData } = usePut()

  const onDropFile = (e) => {
    e.preventDefault()
    if (e.dataTransfer.items) {
      ;[...e.dataTransfer.items].forEach((item, i) => {
        if (item.kind === 'file') {
          const images = item.getAsFile()
          setProductState({ ...productState, images })
        }
      })
    } else {
      ;[...e.dataTransfer.files].forEach((file, i) => {})
    }
  }
  function dragOverHandler(ev) {
    ev.preventDefault()
  }
  const handleImage = async (product) => {
    const base64Image = await getBase64(product.images)

    putData(
      `${process.env.REACT_APP_API}/api/products`,
      JSON.stringify({
        product_code: product.product_code,
        fileContent: base64Image,
        fileName: Date.now() + product.images.name,
      }),

    )
  }
  return (
    <>
      <Grid item onDrop={onDropFile} onDragOver={dragOverHandler} xs={12} className={classes.dragAndDropContainer}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button fullWidth color='secondary' variant='outlined' aria-label='upload picture' component='label'>
            <input
              hidden
              accept='.png, .jpg, .jpeg'
              type='file'
              onChange={(e) => {
                if (edit) {
                  handleImage({
                    product_code: productState.product_code,
                    images: e.target.files[0],
                  })
                }
                setProductState({ ...productState, images: e.target.files[0] })
              }}
            />
            Cambiar Imagen
          </Button>
        </div>
      </Grid>
    </>
  )
}

export default DragAndDropFile
