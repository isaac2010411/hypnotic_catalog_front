import { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppContext'

export const usePut = () => {
  
  const { userInfo } = useContext(AppContext)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [data, setData] = useState([])

  const putData = async (path, body, imageSent) => {

    setIsLoading(true)

    const query = {
      method: 'PUT',
      body: body,
    }

    if (!imageSent) {
      query.headers = {
        'Content-Type': `application/json`,
        Authorization: `Bearer ${userInfo?.token}`,
      }
    }

    const response = await fetch(path, query)

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      //   localStorage.setItem("token", json.token);
      setData((prevData) => [...prevData, json])
    }
    setIsLoading(false)
  }

  return { putData, data, isLoading, error }
}
