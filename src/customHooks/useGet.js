import { useState } from 'react'

export const useGet = () => {

  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [data, setData] = useState([])

  const getData = async (path, token) => {
    setIsLoading(true)

    const response = await fetch(path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

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

  return { getData, data, isLoading, error, setData }
}
