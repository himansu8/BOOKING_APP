import React, { useContext, useState } from 'react'
import "./reserve.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Reserve({ setOpen, hotelId }) {
    const navigate = useNavigate()
    const [selectedRooms, setSelectedRooms] = useState([])
    const { dates } = useContext(SearchContext)
    const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`)

    function getDatesInRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        const dates = []
        while (date <= end) {
            dates.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1)
        }
        return dates;
    }

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)
    function isAvailable(roomNumber) {
        const isFound = roomNumber.unAvailableDates.some((date)=> alldates.includes(new Date(date).getTime())
        )
        return !isFound
    }

    function handleSelect(e) {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(checked ? [...selectedRooms, value] :
            selectedRooms.filter((ele) => ele !== value))
    }
    //console.log(selectedRooms)
    async function handleClick() {
try {
    await Promise.all(selectedRooms.map((roomId)=>{
        const res = axios.put(`/rooms/availability/${roomId}`, {
            dates:alldates,
        })
        return res.data
    }))
    setOpen(false)
    navigate("/")
} catch (error) {
    console.log(error)
}
    }
    return (
        <div className='reserve'>
            <div className="rContainer">
                <FontAwesomeIcon icon={faCircleXmark}
                    className='rClose'
                    onClick={() => setOpen(false)} />
                <span>select Your rooms:</span>
                {data.map((item) => (
                    <div className="rItem" key={item._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.description}</div>
                            <div className="rMax">
                                Max People :<b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice">{item.price}</div>
                        </div>
                        <div className="SelectedRooms">
                        {item.roomNumbers.map((ele) => (
                            <div className="room" key={ele._id}>
                                <label>{ele.number}</label>
                                <input type="checkbox" value={ele._id} 
                                onChange={handleSelect} 
                                disabled={!isAvailable(ele)}
                                />
                            </div>
                        ))}
                        </div>
                    </div>
                ))}
                <button onClick={handleClick} className="rButton">Reserve Now!</button>
            </div>
        </div>
    )
}

export default Reserve