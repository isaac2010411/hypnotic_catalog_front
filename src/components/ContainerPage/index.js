import { Grid, Typography } from '@mui/material'
import BackAction from '../BackAction'

function ContainerPage({ title, children, actions, backAction = true ,props}) {
  return (
 
      <Grid container  p={1} spacing={1}>
        <Grid item xs={12} p={1.3} display='flex' alignItems={'center'} justifyContent='space-between'>
          <Typography component='h1' fontSize='24px'>
            {backAction && <BackAction />} {title}
          </Typography>
          <div>{actions}</div>
        </Grid>
        {children}
      </Grid>
 
  )
}

export default ContainerPage
