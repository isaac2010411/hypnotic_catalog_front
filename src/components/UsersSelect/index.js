import { useEffect } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useGet } from '../../customHooks/useGet'

function UserSelect({ userId, setUserId }) {
  const { data, getData } = useGet()

  useEffect(() => {
    getData(`${process.env.REACT_APP_API}/api/users`)
  }, [])

  return (
    <>
      {data && (
        <FormControl style={{width:'100%'}}>
          <InputLabel id='demo-simple-select-label'>Usuario</InputLabel>
          <Select
          fullWidth
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={userId}
            label='Vendedor'
            name='employee'
            onChange={(e) => {
              e.preventDefault()
              setUserId(e.target.value)
              return e.target.value
            }}
          >
            {data.flat(Infinity).map((i) => (
              <MenuItem key={i._id} value={i._id}>
                {i.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </>
  )
}

export default UserSelect
