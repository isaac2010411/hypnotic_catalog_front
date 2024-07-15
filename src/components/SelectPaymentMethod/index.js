import { Grid, Checkbox, FormControlLabel, FormGroup } from '@mui/material'

const SelectPaymentMethod = ({paymentMethod, setPaymentMethod}) => {
//   const [paymentMethod, setPaymentMethod] = useState('Efectivo')

  return (
  
      <Grid item xs={12} mt={2} mb={2}>
        <FormGroup>
          <FormControlLabel
            labelPlacement='start'
            onChange={() => setPaymentMethod('Mercadopago')}
            checked={paymentMethod === 'Mercadopago'}
            control={<Checkbox color='primary' />}
            label='Mercadopago'
          />
          <FormControlLabel
            labelPlacement='start'
            onChange={() => setPaymentMethod('Efectivo')}
            checked={paymentMethod === 'Efectivo'}
            control={<Checkbox color='primary' />}
            label='Efectivo'
          />
        </FormGroup>
      </Grid>
   
  )
}

export default SelectPaymentMethod
