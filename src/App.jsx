import React, { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import { FooterWithSocialLinks } from "./Components/Footer"

function App() {
  useEffect(() => {
    document.body.className = 'bg-custom-gradient min-h-screen';
  }, [])

  return (
   <div>
    <Navbar />
    <Outlet />
    <FooterWithSocialLinks />
   </div>
  )
}

export default App
