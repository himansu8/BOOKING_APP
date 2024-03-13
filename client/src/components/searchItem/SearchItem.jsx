import React from 'react'
import './searchItem.css'
import { Link } from 'react-router-dom'


function SearchItem({item}) {
  return (
    <div className='searchItem'>
        <img src={item.photos[0]} 
        alt="" className="siImg" />
        <div className="siDesc">
            <h1 className='siTitle'>{item.name}</h1>
            <span className="siDistance">{item.distance}</span>
            <span className="siTaxiOp">Free Airport Taxi</span>
            <span className="siSubtitle">Studio apartment with Air Conditioning</span>
            <span className="siFeatures">{item.description}</span>
            <span className="siCancelOp">Free Cancellation</span>
            <span className="siCancelOpsubtitle">You can cancel later, so lock in this great price today!</span>
        </div>
        <div className="siDetails">
         {  item.rating && <div className="siRating">
                <span>Excellent</span>
                <button>{item.rating}</button>
            </div>}
            <div className="siDetailTexts">
                <span className="siPrice">INR {item.cheapestprice}</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                <Link to={`/hotels/${item._id}`}>
                <button className='siCheckButton'>See Availability</button>
                </Link>
            </div>
        </div>
    </div> 
  )
}

export default SearchItem