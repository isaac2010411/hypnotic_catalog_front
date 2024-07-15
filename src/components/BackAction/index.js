import { IconButton } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function BackAction() {
  const navigate = useNavigate()

  return (
    <IconButton style={{margin:'-4px -8px 0 -8px'}} onClick={() => navigate(-1)}>
      <ArrowBackIcon  />
    </IconButton>
  )
}

export default BackAction
