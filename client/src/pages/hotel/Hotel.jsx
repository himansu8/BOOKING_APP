import React, { useContext, useState } from 'react'
import './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'


function Hotel() {
  const navigate = useNavigate()
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [slide, setSlide] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)



  const { data, loading, error } = useFetch(`/hotels/find/${id}`)


  // const photos = [
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/501839436.jpg?k=ed64026ef20e90b852977f6e9c9fedbcaf4f43baf84582206a7751f643bb53a7&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/501838935.jpg?k=c8994b74c6fdac1d0259cde7f5639e79f1ecab69f8f5d63a2e6ec171c40172ff&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/501839084.jpg?k=37d8840fcc4392524e7b438a54294366f35051e8ddc08a90b642fdf73baaf66a&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/501839074.jpg?k=69f2eb9edb4604789896bcef37234a7e4b4b3e5112c27d843d0abc605546d5bd&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/501839111.jpg?k=8cb4dfe5e37547d907cff10eb068ea8c0d545420c239e4192a408892a0eea6f7&o=&hp=1"
  //   },
  //   {
  //     src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/501839018.jpg?k=73052b57f6b2623eeb5883b57c32e22beb4bdd5b6f069e9b92515f427bf96ac9&o=&hp=1"
  //   },
  // ]


  const { dates, options } = useContext(SearchContext)
  const { user } = useContext(AuthContext)

  // console.log(dates)

  function dayDifference(a, b) {
    const timeDiff = Math.abs(b.getTime() - a.getTime());
    const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return dayDiff;
  }
  //console.log(dayDifference(dates[0].endDate,dates[0].startDate))
  const days = dayDifference(dates[0].endDate, dates[0].startDate)

  function handleOpen(index) {
    setSlide(index);
    setOpen(true)
  }

  function handleMove(direction) {
    let newSlide;
    if (direction === "l") {
      newSlide = slide === 0 ? 5 : slide - 1
    } else {
      newSlide = slide === 5 ? 0 : slide + 1
    }
    setSlide(newSlide)
  }
  function handleClick() {
    if (user) {
      setOpenModal(true)
    } else {
      navigate("/login")
    }
  }
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {
        loading ? loading : <>
          <div className="hotelContainer">
            {open && <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={() => setOpen(false)} />
              <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handleMove("l")} />
              <div className="sliderWrapper">
                <img src={data.photos[slide]} alt="" className="sliderImg" />
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => handleMove("r")} />

            </div>}
            <div className="hotelWrapper">
              <button className="bookNow">Reserve or Book Now!</button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">Excellent location - {data.distance} from center</span>
              <span className="hotelPriceHighlight">
                Book a stay over ${data.cheapestprice} at this property and get a free airport taxi
              </span>
              <div className="hotelImages">
                {data.photos?.map((ele, index) => (
                  <div className="hotelImgWrapper" key={index}>
                    <img onClick={() => handleOpen(index)} src={ele} alt="" className="hotelImg" />
                  </div>
                ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">
                    {data.description}
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located at the real heart of Puri, this property has an excellent location score of 9.8!
                  </span>
                  <h2><b>INR {days * data.cheapestprice * options.room}</b>({days} nights) </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <MailList />
            <Footer />
          </div></>}
          {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default Hotel