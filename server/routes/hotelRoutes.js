import express from 'express'
import { countByCity, countByType, createHotels, deleteHotels, getHotelRooms, updateHotel, viewAllHotels, viewHotel } from '../controller/hotelsController.js';
import { verifyAdmin } from '../middlewares/verifyToken.js';

const router = express.Router();

/*
description: create hotels
method :post
api_url: api/hotels
*/

router.post("/", verifyAdmin, createHotels)

/*
description: update hotel
method :put
api_url: api/hotels/:hotelId
*/
router.put("/:hotelId", verifyAdmin, updateHotel)


/*
description: delete hotel
method :delete
api_url: api/hotels/:hotelId
*/
router.delete("/find/:hotelId", verifyAdmin, deleteHotels)

/*
description: view one hotel
method :get
api_url: api/hotels/:hotelId
*/
router.get("/find/:hotelId", viewHotel)

/*
description: view all hotels
method :get
api_url: api/hotels
*/

router.get("/", viewAllHotels)

router.get("/countByCity", countByCity)


router.get("/countByType", countByType)

router.get("/room/:id", getHotelRooms)



export default router;