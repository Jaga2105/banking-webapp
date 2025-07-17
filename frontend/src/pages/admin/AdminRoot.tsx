import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const AdminRoot = (props: Props) => {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default AdminRoot