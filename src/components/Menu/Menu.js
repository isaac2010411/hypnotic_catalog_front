import { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { ListItemText, IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { AppContext } from '../../contexts/AppContext'

function CustomBadge({ children }) {
  const { totalQuantity } = useContext(AppContext)
  return (
    <Badge
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      badgeContent={totalQuantity()}
      color='primary'
    >
      {children}
    </Badge>
  )
}
export default function Menu() {
  const navigate = useNavigate()

  const [state, setState] = useState(false)

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState(!state)
  }
console.log(window.location.pathname.split('/'))
  const list = () => (
    <Box
      sx={{ width: 'auto', color: 'black' }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <>
        <List>


          <ListItem key={'Tienda'} onClick={() => navigate('/')} disablePadding>
            <ListItemButton>
              <ListItemIcon>{/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}</ListItemIcon>
              <ListItemText primary={'Tienda'} />
            </ListItemButton>
          </ListItem>
        </List>
      </>
    </Box>
  )


  const path = window.location.pathname.split('/')[1] === 'product'? `${window.location.pathname.split('/')[3]}/${window.location.pathname.split('/')[4]}`:`${window.location.pathname.split('/')[1]}/${window.location.pathname.split('/')[2]}`

  return (
    <>
      <CustomBadge>
        <IconButton onClick={() => navigate(`/cart/${path}`)}>
          <ShoppingCartIcon style={{ color: 'white' }} />
        </IconButton>
      </CustomBadge>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon style={{ color: 'white' }} />{' '}
      </IconButton>

      <SwipeableDrawer anchor={'bottom'} open={state} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        {list()}
      </SwipeableDrawer>
    </>
  )
}
