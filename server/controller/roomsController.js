import roomModel from "../models/roomsModel.js";
import hotelsModel from "../models/hotelsModel.js";
import { createError } from "../utils/error.js";

export async function createRoom(req, res, next) {
    try {
        const hotelId = req.params.hotelId
        const { title, price, maxPeople, description, roomNumbers } = req.body
        let roomData = {
            title,
            price,
            maxPeople,
            description,
            roomNumbers
        }
        const Room = await roomsModel.create(roomData);
        try {
            await hotelsModel.findByIdAndUpdate(hotelId, { $push: { rooms: Room._id } })
        } catch (error) {
            next(error)
        }
        res.status(200).json(Room)
    } catch (error) {
        next(error)
    }
}

export async function updateRoom(req, res, next) {
    try {
        const { roomId } = req.params
        let editRoom = await roomsModel.findByIdAndUpdate(
            roomId,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(editRoom)
    } catch (error) {
        next(error);
    }
}

export async function deleteRoom(req, res, next) {
    try {
        const { hotelId } = req.params
        const { roomId } = req.params
        await roomsModel.findByIdAndDelete(
            roomId
        )
        try {
            await hotelsModel.findByIdAndUpdate(
                hotelId,
                { $pull: { rooms: roomId } }
            )

        } catch (error) {
            next(error)
        }
        res.status(200).json({ msg: "room deleted successfully" })
    } catch (error) {
        next(error);
    }
}

export async function viewRoom(req, res, next) {
    try {
        const { roomId } = req.params
        let room = await roomsModel.findById(
            roomId
        )
        res.status(200).json(room)
    } catch (error) {
        next(error);
    }
}

export async function viewAllRooms(req, res, next) {
    try {
        let rooms = await roomsModel.find()
        res.status(200).json(rooms)
    } catch (error) {
        next(error);
    }
}

export async function updateRoomAvailability(req, res, next) {
    try {
        await roomModel.updateOne(
            { "roomNumbers._id": req.params.roomId },
            {
                $push: {
                    "roomNumbers.$.unAvailableDates": req.body.dates
                }
            }
        )

        res.status(200).json("Room status updated")
    } catch (error) {
        next(error);
    }
}