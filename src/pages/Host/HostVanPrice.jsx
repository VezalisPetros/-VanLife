import React from 'react'
import { useOutletContext } from "react-router-dom"
const HostVanInfo = () => {

  const { currentVan } = useOutletContext()
  return (
    <div>
      <h3 className="host-van-price">${currentVan.price}<span>/day</span></h3>
    </div>
  )
}

export default HostVanInfo
