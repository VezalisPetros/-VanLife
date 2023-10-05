import React from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function HostVanLayout({currentVan}) {
    const activeStyles = {
        fontWeight: 600,
        textDecoration: "none",
        color: "#161616",
        fontSize: "19px" 
    }
    
   

    return (
        <>
            <nav className="host-nav side-links hostvan-links">
                <NavLink
                    to="."
                    end
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Details
                </NavLink>

                <NavLink
                    to="pricing"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Pricing
                </NavLink>

                <NavLink
                    to="photos"
                    style={({ isActive }) => isActive ? activeStyles : null}
                >
                    Photos
                </NavLink>

                

            </nav>
            <Outlet  context={{currentVan}}/>
        </>
    )
}