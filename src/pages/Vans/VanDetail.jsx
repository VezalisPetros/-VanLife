import React from "react"
import { useParams , useLocation } from "react-router-dom"
import {Link} from "react-router-dom"
import { getVan } from "../../api"

export default function VanDetail() {
    const params = useParams()
    const location =useLocation()
    const [van, setVan] = React.useState(null)
    const [error, setError] = React.useState(null)
    const { id } = useParams()

    React.useEffect(() => {
        async function loadVans() {
            
            try {
                const data = await getVan(id)
                setVan(data)
            } catch (err) {
                setError(err)
            } 
        }
        loadVans()
    }, [id])
   

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }
    return (
        <div className="van-detail-container">
            {van ? (
                <div className="van-detail">
                    <img src={van.imageUrl} />
                    <div className="van-detail-info">
                        <Link 
                           to={location.state?`..?${location.state.search}`:".."}
                           relative="path"
                           className="">&larr; { `Back to ${location.state.type ?`${location.state.type}`:"all"} vans`}</Link>  
                        <h2>{van.name}</h2>
                        <p className="van-price"><span>${van.price}</span>/day</p>
                        <i className={`van-type ${van.type} selected`}>
                            {van.type}
                        </i>
                        <p>{van.description}</p>
                        <button className="link-button vibrate-1 ">Rent this van</button>
                        
                    </div>
                    
                </div>
            ) : <h2>Loading...</h2>}
        </div>
    )
}