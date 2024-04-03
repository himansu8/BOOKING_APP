import React, { useContext, useState } from 'react'
import './navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import SignUp from '../../pages/signUp/SignUp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

function Navbar() {
    let navigate = useNavigate()
    const { user, dispatch } = useContext(AuthContext)

    const handleLogout = async () => {
        try {
          const removeToken = await axios.get("/auth/removetoken")
          if (removeToken) {
            dispatch({ type: "LOGOUT" })
            navigate('/');
          }
        }
        catch (error) {
          console.log(error)
        }
      };


    const [open, setOpen] = useState(false)
    return (
        <>
            <div className='navbar'>
                <div className='navCont'>
                    <Link to='/' style={{ color: "inherit", textDecoration: "none" }}>
                        <span className='logo'>ApnaBooking </span>
                    </Link>
                    {user ? (<div className='avatar'>
                        <img src={user.img} alt="" className="avtarimg" />
                        <span className='avtarname'>{user.name}</span>
                        <button className='navButton1' onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /> LogOut</button>
                        
                    </div>)
                        : (<div className='navitems'>
                            <button className='navButton' onClick={() => setOpen(true)}>Register</button>
                            <button className='navButton'><Link to="/login" className='linkButton' >Login</Link></button>
                            {/* <button className='navButton'>Login</button> */}
                        </div>)}
                </div>
            </div>
            {open && <SignUp setOpen={setOpen} />}
        </>
    )
}

export default Navbar