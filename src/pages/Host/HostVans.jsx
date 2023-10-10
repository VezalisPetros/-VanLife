import React from "react"
import { Link } from "react-router-dom"
import { getHostVans } from "../../api"

export default function HostVans() {
    const [vans, setVans] = React.useState([])
    const [error, setError] = React.useState(null)

    const idLogged = localStorage.getItem("idLogged")
    

    React.useEffect(() => {
        async function loadVans() {
            try {
                const data = await getHostVans(idLogged)
                setVans(data)
            } catch (err) {
                setError(err)
            } 
        }
        loadVans()
        
    }, [])

    const hostVansEls = vans.map(van => (
        <Link
            to={van.id}
            key={van.id}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                </div>
            </div>
        </Link>
    ))

    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }

    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {
                    vans.length > 0 ? (
                        <section>
                            {hostVansEls}
                        </section>

                    ) : (
                            <div className="no-vans-message">
                                    <h2>It looks like you haven't uploaded a van to your account yet</h2>
                                    <Link to="../income" className="add-van vibrate-1 ">Add Your Van</Link>
                            </div>
                            
                        )
                }
            </div>
        </section>
    )
}