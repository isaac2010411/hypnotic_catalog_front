import { createContext, useEffect, useMemo, useState } from 'react'
import io from 'socket.io-client'

export const SocketContext = createContext()

export const SocketContextProvider = ({ children }) => {
  const socket = useMemo(
    () =>
      io.connect(process.env.REACT_APP_API, {
        transports: ['websocket'],
        withCredentials: true,
      }),
    []
  )

  const [online, setOnline] = useState(socket.connected)

  useEffect(() => {
    setOnline(socket.connected)
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false)
    })
  }, [socket])

  return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>
}
