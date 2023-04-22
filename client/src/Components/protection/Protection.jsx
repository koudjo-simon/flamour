import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const Protection = () => {
  return (
    <div>
        {
            localStorage.getItem("token") ? <Outlet/> : <Navigate to="/login" />
        }
    </div>
  )
}

export default Protection