import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
//import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import './newroom.scss'
import { roomInputs } from '../../formSource';
import useFetch from '../../hooks/useFetch';
import axios from 'axios';


function NewRoom() {
  const [info, setInfo] = useState({})
  const [hotelId, setHotelId] = useState(undefined)
  const [rooms, setRooms] = useState([]);
  const { data, loading } = useFetch("/hotels")

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
    try {
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info)
  return (
    <div className='new'>
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room </h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((ele) => (
                <div className="formInput" key={ele.id}>
                  <label>{ele.label}</label>
                  <input id={ele.id} type={ele.type} placeholder={ele.placeholder} onChange={handleChange} />

                </div>
              ))}

              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers."
                />
                <div className="chooseInput">
                <label>Choose A Hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                    data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))}
                </select>
                </div>
              </div>

              {/* <div className="formInput">
                <label>Choose A Hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                    data.map((hotel) => (
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))}
                </select>
              </div> */}

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRoom