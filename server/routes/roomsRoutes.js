import express from 'express'
import { verifyAdmin } from '../middlewares/verifyToken.js';
import { createRoom, deleteRoom, updateRoom, updateRoomAvailability, viewAllRooms, viewRoom } from '../controller/roomsController.js';
const router = express.Router();

router.post("/:hotelId", verifyAdmin, createRoom)
router.put("/:roomId", verifyAdmin, updateRoom)
router.put("/availability/:roomId", updateRoomAvailability)

router.delete("/:roomId/:hotelId", verifyAdmin, deleteRoom)
router.get("/:roomId",  viewRoom)
router.get("/",  viewAllRooms)


export default router;