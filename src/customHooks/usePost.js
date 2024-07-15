import { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppContext'

export const usePost = () => {
  const { userInfo } = useContext(AppContext)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [data, setData] = useState([])

  const postData = async (path, body, imageSent) => {

    setIsLoading(true)

    const query = {
      method: 'POST',
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
      setError(json)
    }
    if (response.ok) {
      setData((prevData) => [...prevData, json])
    }
    setIsLoading(false)
  }

  return { postData, data, isLoading, error }
}
