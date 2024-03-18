import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import './new.scss'
import axios from 'axios';
function New({ inputs, title }) {
  const [file, setFile] = useState("")
  const [info, setInfo] = useState()
  function handleChange(e) {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  async function handleClick(e) {
    e.preventDefault();
    const data = new FormData()
    data.append("file", file)
    data.append("upload_preset", "upload")
    try {
      const uploadRes = await axios.post("POST https://api.cloudinary.com/v1_1/himansu8/image/upload", data)

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axios.post("/auth/register", newUser);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title} </h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor='file'>
                  Image : <DriveFolderUploadOutlinedIcon className='icon' /></label>
                <input type="file" id='file' onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />
              </div>
              {inputs.map((ele) => (
                <div className="formInput" key={ele.id}>
                  <label>{ele.label}</label>
                  <input onChange={handleChange} type={ele.type} placeholder={ele.placeholder} id={ele.id} />
                </div>
              ))}


              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New