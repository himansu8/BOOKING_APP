import React, { useContext, useState } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import SignUp from '../../pages/signUp/SignUp'

function Navbar() {

    const { user } = useContext(AuthContext)
const [open, setOpen] = useState(false)
    return (
        <>
        <div className='navbar'>
            <div className='navCont'>
                <Link to='/' style={{ color: "inherit", textDecoration: "none" }}>
                    <span className='logo'>ApnaBooking </span>
                </Link>
                {user ? (user.userName) : (<div className='navitems'>
                    <button className='navButton' onClick={() => setOpen(true)}>Register</button>
                   <button className='navButton'><Link to= "/login" className='linkButton' >Login</Link></button> 
                    {/* <button className='navButton'>Login</button> */}
                </div>)}
            </div>
        </div>
   {open && <SignUp setOpen={setOpen}/>}
        </>
    )
}

export default Navbar