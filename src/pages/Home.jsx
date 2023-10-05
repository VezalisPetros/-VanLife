import React from 'react'
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div>
        <main className='home-container'>

            <div className="info">
                <h1>You got the travel plans, we got the travel vans.</h1>
                <p>Add adventure to your life by joining the #vanlife movement. Rent the perfect van to make your perfect road trip.</p>
                <Link to="/vans" className='vibrate-1'>Find your van</Link>
           
            </div>
               
        </main>
    </div>
  )
}

export default Home
