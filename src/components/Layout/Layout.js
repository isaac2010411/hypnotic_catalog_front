import { Outlet } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Logo from '../../assets/logos/image.png'
import { Avatar } from '@mui/material'
import Menu from '../Menu/Menu'
import { useWindowsSize } from '../../customHooks/useWindowsSize'

const Layout = () => {
  const classes = {}
  const { height } = useWindowsSize()

  return (
    <Grid container className={classes.layoutContainer}>
      <Grid item xs={12} style={{ position: 'fixed', width: '100%', zIndex: '10000' }}>
        <Grid container>
          <Grid
            item
            xs={2}
            display='flex'
            style={{
              height: '50px',
              background: '#9c27b0',
              alignItems: 'start',
              justifyContent: 'center',
            }}
          >
            <Avatar src={Logo} style={{ margin: '4px' }} />
          </Grid>
          <Grid
            item
            xs={7}
            display='flex'
            style={{
              height: '50px',
              background: '#9c27b0',
              alignItems: 'start',
              justifyContent: 'center',
            }}
          ></Grid>
          <Grid
            item
            xs={3}
            style={{
              paddingTop: '5px',
              height: '50px',
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'start',
              background: '#9c27b0',
            }}
          >
            <Menu />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        style={{
          marginTop: '3rem',
          minHeight: `${height}px`,
          width: '100%',
          backgroundColor: '#F5F5F5',
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </Grid>
    </Grid>
  )
}

export default Layout
