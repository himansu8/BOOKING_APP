import React from 'react'
import './signUp.css'
function SignUp({setOpen}) {
    return (
        <div className='container'>
            <div className="wrapper1">
                <img src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" alt="" className="image" />
                <input type="file" name="img" className="input1"   />       
            </div>
            <div className="wrapper2">
                <div className="close" onClick={() => setOpen(false)}>X</div>
                <h1 className="title">
                    Sign Up For ApnaBooking
                </h1>
                <label>Name</label>
                <input type="text"  placeholder='Enter Your Name' className="input" />                
                <label>User Name</label>
                <input type="text" placeholder='username' className="input" />                
                <label>Email Id</label>
                <input type="email" placeholder='Email' className="input" />                
                <label>Password</label>
                <input type="password" placeholder='Password' className="input" />                
                <label>Country</label>
                <input type="text" placeholder='Country' className="input" />                
                <label>City</label>
                <input type="text" placeholder='City' className="input" />
                <label>Phone No</label>
                <input type="text" placeholder='Phone no with country code (+91)' className="input" />

                <button className="button">submit</button>
            </div>
        </div>
    )
}

export default SignUp




