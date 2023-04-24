import React from 'react'
import io from "socket.io-client"

const socket = io.connect("http://localhost:4000");

const Socket = () => {

  return (
    <div>
        <h1>Socket page</h1>
    </div>
  )
}

export default Socket