import React, {useContext, useEffect, useState } from 'react';
import { io } from "socket.io-client";

// const ENDPOINT = "http://127.0.0.1:5000";

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState()
  const [id, setId] = useState('')

  const getId = (value) => {
    setId(value)
  }
  useEffect(() => {
    if(id != null) {  
      
      const newSocket = io(
        'http://localhost:5000',
        { query: { id } }
      )
      setSocket(newSocket)

      return () => newSocket.close()
    }
  }, [id])

  return (
    <SocketContext.Provider value={{socket, getId}}>
      { children }
    </SocketContext.Provider>
  )
}

// export default function Socketio() {

//     const socket = io(ENDPOINT);
//     // socket.on("connect", () => {
//     //     console.log("your Socket id is ", `${socket.id}`)
//     // })
//   return socket;
// };