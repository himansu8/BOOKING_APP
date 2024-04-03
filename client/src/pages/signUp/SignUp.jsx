import React, { useState } from 'react'
import './signUp.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



function SignUp({ setOpen }) {
    
    const navigate = useNavigate()
    const [file, setFile] = useState("")
    const [info, setInfo] = useState({
        name: "",
        userName: "",
        email: "",
        country: "",
        city: "",
        phone: "",
        password: "",
        img: ""
    })


    const handleChange = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value })
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "upload")
        try {
          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/himansu8/image/upload", data)
          console.log(uploadRes.data.url)
          const { url } = uploadRes.data;
          console.log(url)
          const newUser = {
            ...info,
            img: url,
          };
          await axios.post("/auth/register", newUser);
          const confirmed = window.confirm("Are you submited your form?");
          if (!confirmed) return;
          window.alert("Thank You For chossing us.")
          setOpen(false)
          navigate("/")
          //console.log("navigate ok")
        } catch (error) {
          window.alert(error.response.data.message)
        }
      }

    return (
        <div className='container'>
            <div className="wrapper1">
                <img src= {file ? URL.createObjectURL(file) :"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" } alt="" className="image" />
                <input type="file" name="img" className="input1" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="wrapper2">
                <div className="close" onClick={() => setOpen(false)}>X</div>
                <h1 className="title">
                    Sign Up For ApnaBooking
                </h1>
                <label>Name</label>
                <input type="text" name="name" placeholder='Enter Your Name' className="input" onChange={handleChange} />
                <label>User Name</label>
                <input type="text" name="userName" placeholder='username' className="input" onChange={handleChange} />
                <label>Email Id</label>
                <input type="email" name="email" placeholder='Email' className="input" onChange={handleChange} />
                <label>Password</label>
                <input type="password" name="password" placeholder='Password' className="input" onChange={handleChange}/>
                <label>Country</label>
                <input type="text" name="country" placeholder='Country' className="input" onChange={handleChange}/>
                <label>City</label>
                <input type="text" name="city" placeholder='City' className="input" onChange={handleChange}/>
                <label>Phone No</label>
                <input type="text" name="phone" placeholder='Phone no with country code (+91)' className="input" onChange={handleChange}/>

                <button className="button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default SignUp




