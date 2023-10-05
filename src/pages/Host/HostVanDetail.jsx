import React from "react"
import { useParams, Link } from "react-router-dom"
import HostVanLayout from "../../components/HostVanLayout"

import { getVan } from "../../api"  //cheat whith this one you have acces to all vans even if you dont own them we dont have correct  authdecation 

export default function HostVanDetail() {
    const { id } = useParams()
    const [currentVan, setCurrentVan] = React.useState(null)

    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        async function loadVans() {
            
            try {
                const data = await getVan(id)
                setCurrentVan(data)
            } catch (err) {
                setError(err)
            } 
        }

        loadVans()
    }, [id])
    

    if (!currentVan) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
      <>
        <Link to=".." 
         relative="path"
        className="host-van-detail-link"> &larr; Back to all vans</Link>
        <section className="host-vans-detail-section">
            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={currentVan.imageUrl} />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type ${currentVan.type} selected`}
                        >
                            {currentVan.type}
                        </i>
                        <h3>{currentVan.name}</h3>
                        <h4>${currentVan.price}/day</h4>
                    </div>
                

                </div>
                <HostVanLayout  currentVan={currentVan}/>
            </div>   
           
        </section>
       
      </>
      
    )
}

