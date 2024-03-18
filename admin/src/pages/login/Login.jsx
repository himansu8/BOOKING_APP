import React, { useContext, useState } from 'react'
import './login.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'




function Login() {
    const navigate = useNavigate()
    const [loginInfo, setLoginInfo] = useState({
        userName: undefined,
        password: undefined
    })

    const { user, loading, error, dispatch } = useContext(AuthContext)
    // console.log("dispatch ------", dispatch)
    // console.log("user ------", user)
    // console.log("loading ------", loading)
    // console.log("error ------", error)

    function handleChange(e) {
        setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    async function handleClick(e) {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/login", loginInfo)
            if(res.data.isAdmin){
              dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details })
              navigate("/")
            }else{
              dispatch({ type: "LOGIN_failure", payload: {message: "You are not allowed"} })
            }

        } catch (error) {
            dispatch({ type: "LOGIN_failure", payload: error.response.data })
        }
    }
    console.log(user)
    return (
        <div className='login'>
            <div className="lContainer">
                <input type="text" placeholder='userName' name='userName' onChange={handleChange} className="lInput" />
                <input type="password" placeholder='Password' name='password' onChange={handleChange} className="lInput" />
                <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
                {error && <span>{error.message}</span>}
            </div>
        </div>
    )
}

export default Login