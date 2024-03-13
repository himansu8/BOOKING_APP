import React, { useContext } from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
function Navbar() {

    const { user } = useContext(AuthContext)

    return (
        <div className='navbar'>
            <div className='navCont'>
                <Link to='/' style={{ color: "inherit", textDecoration: "none" }}>
                    <span className='logo'>booking Logo</span>
                </Link>
                {user ? (user.userName) : (<div className='navitems'>
                    <button className='navButton'>Register</button>
                    <Link to= "/login" className='linkButton' >Login</Link>
                    {/* <button className='navButton'>Login</button> */}
                </div>)}
            </div>
        </div>
    )
}

export default Navbar