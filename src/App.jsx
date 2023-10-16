
import React from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'


import Vans from "./pages/Vans/Vans"
import VanDetail from "./pages/Vans/VanDetail"
import Dashboard from "./pages/Host/Dashboard"
import Reviews from "./pages/Host/Reviews"
import Layout from "./components/Layout"
import HostLayout from "./components/HostLayout"



import HostVans from './pages/Host/HostVans'
import HostVanDetail from './pages/Host/HostVanDetail'
import HostVanPrice from './pages/Host/HostVanPrice'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import HostVanInfo from './pages/Host/HostVanInfo'
import NotFound from './pages/NotFound'
import Login from "./pages/Login"
import AuthRequired from './components/AuthRequired'
import SignUp from './pages/SignUp'
import AddVan from './pages/Host/AddVan'

const App = () => {
  return (

    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="vans" element={<Vans />} />
        <Route path="vans/:id" element={<VanDetail />} />
        <Route path="login"  element={<Login />} />
        <Route path="signUp"  element={<SignUp />} />
        

        <Route element={<AuthRequired/>}>
          <Route path="host" element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="addVan" element={<AddVan />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="vans/:id" element={<HostVanDetail />} >
              <Route index element={<HostVanInfo />} />
              <Route path="pricing" element={<HostVanPrice />} />
              <Route path="photos" element={<HostVanPhotos />} />
            </Route>
          </Route>
          
          
        </Route>
        <Route path="*" element={<NotFound />}/>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App
