import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Button, Grid } from '@mui/material'

export default function TimePickers({ actions, startDate, setStartDate, endDate, setEndDate }) {
  return (
    <Grid item xs={12}>
      <LocalizationProvider dateAdapter={AdapterDateFns} >
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <DatePicker disableFuture format='dd/MM/yyyy' value={startDate} onChange={(e) => setStartDate(e)} />
          </Grid>
          <Grid item xs={4}>
            <DatePicker disableFuture format='dd/MM/yyyy' value={endDate} onChange={(e) => setEndDate(e)} />
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth variant='outlined' style={{ height: '56px' }} onClick={() => actions(startDate, endDate)}>
              Buscar
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </Grid>
  )
}
