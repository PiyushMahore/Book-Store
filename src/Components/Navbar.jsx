import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useFirebase } from '../Context/FirebaseContext'
import { Button } from "@material-tailwind/react"
import { AiOutlineCloseCircle, AiOutlineMenu} from "react-icons/ai";

function Navbar() {
  const Firebase = useFirebase()
  const [user, setUser] = useState(false)
  const [nav, setNav] = useState(false)
  const [photo, setPhoto] = useState("")

  const handleNav = () => {
    setNav(!nav)
  }

  const LogOut = () => {
    Firebase.SignOut()
    setNav(!nav)
  }
  
  useEffect(() => {
    if(Firebase.user) {
      setUser(true)
      setPhoto(Firebase.user.photoURL)
    }else {
      setPhoto("")
    }
  }, [Firebase])

  return (
    <div>
      <nav className="p-1 text-white mb-1">
        <div className="mx-5">
          <div className="hidden md:flex md:justify-between md:items-center">
            {user ? <img src={photo} width={"50px"} style={{borderRadius: "50%", border: "2px solid white", backgroundSize: "cover", marginTop: "2px"}} alt="UserPhoto" /> : null}
            <div className='flex  md:justify-between md:items-center'>
              <NavLink className={({ isActive }) => isActive ? "px-3 py-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-300 mr-4 hover:scale-110 duration-300 rounded" : "hover:scale-110 duration-300 rounded px-3 py-1 mr-4" } to='/'>
                Home
              </NavLink>
              <NavLink to='/addbooks' className={({ isActive }) => isActive ? "px-3 py-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-300 mr-4 hover:scale-110 duration-300 rounded" : "hover:scale-110 duration-300 rounded px-3 py-1 mr-4" }>
                Add Books
              </NavLink>
              <NavLink className={({ isActive }) => isActive ? "px-3 py-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-300 mr-4 hover:scale-110 duration-300 rounded" : "px-3 py-1 rounded mr-4 hover:scale-110 duration-300" } to={`/book/orders`}>Orders</NavLink>
              {Firebase.isLogedIn ? <Button className='flex bg-gradient-to-r from-light-blue-400 via-purple-600 to-pink-600 hover:scale-110 duration-300' onClick={Firebase.SignOut}>Log Out</Button> : <Button className='bg-gradient-to-r from-light-blue-400 via-purple-600 to-pink-600'><NavLink to='/login'>
                Login
              </NavLink></Button>}
            </div>
          </div>

          {/* mobile */}

          <div className={`md:hidden flex ${Firebase.user ? 'justify-between' : "justify-end"} items-center mt-0.5`}>
            {user ? <NavLink><img src={photo} width={"50px"} style={{borderRadius: "50%", border: "2px solid white", backgroundSize: "cover", marginTop: "2px"}} alt="UserPhoto" /></NavLink> : null}
            <div onClick={handleNav}>
              {nav ? <AiOutlineCloseCircle className='cursor-pointer' size={25} /> : <AiOutlineMenu className='cursor-pointer' size={25} />}
            </div>
          </div>
          <div className={nav ? `z-10 fixed h-full left-0 top-0 w-[60%] bg-gradient-to-r from-blue-500 via-cyan-400 to-green-300 border-r shadow-sm overflow-hidden border-white ease-in-out  duration-500` : `fixed left-[-100%]`}>
            <ul className='p-8 text-2xl'>
              <li className='p-2'><NavLink onClick={() => setNav(!nav)} className='cursor-pointer' to='/'>Home</NavLink></li>
              <li className='p-2'><NavLink onClick={() => setNav(!nav)} className='cursor-pointer' to='/addbooks'>Add Books</NavLink></li>
              <li className='p-2'><NavLink onClick={() => setNav(!nav)} className="cursor-pointer" to='/book/orders'>Orders</NavLink></li>
              <li className='p-2'>
                {Firebase.isLogedIn ? (
                  <Button className='flex justify-s bg-gradient-to-r from-red-600 to-yellow-400 hover:scale-110 duration-300' onClick={LogOut}>Log Out</Button>
                ) : (
                  <Button className='bg-gradient-to-r from-light-blue-400 via-purple-600 to-pink-600'><NavLink onClick={handleNav} to='/login'>Login</NavLink></Button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav><hr />
    </div>
  )
}

export default Navbar
