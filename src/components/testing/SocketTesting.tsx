import React , {useEffect} from 'react'
import io from 'socket.io-client';

export default function SocketTesting() {
    useEffect(() => {
      const socket = io('http://localhost:8000');

     
    }, [])
    
  return (
    <div>SocketTesting</div>
  )
}
