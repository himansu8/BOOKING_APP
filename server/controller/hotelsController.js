//import mongoose from 'mongoose';
import hotelsModel from '../models/hotelsModel.js';
import roomsModel from '../models/roomsModel.js';


export async function createHotels(req, res, next) {
    try {
        const { name, type, city, address, distance, title, description, cheapestprice } = req.body
        let hotelsData = {
            name,
            type,
            city,
            address,
            distance,
            title,
            description,
            cheapestprice
        }
        await hotelsModel.create(hotelsData)
        res.status(200).json({ msg: 'hotel registered sucessfully' });

    } catch (error) {
        next(error);
    }
}

export async function updateHotel(req, res, next) {
    try {
        const { hotelId } = req.params
        let editHotels = await hotelsModel.findByIdAndUpdate(
            hotelId,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(editHotels)
    } catch (error) {
        next(error);
    }
}

export async function deleteHotels(req, res, next) {
    try {
        const { hotelId } = req.params
        await hotelsModel.findByIdAndDelete(
            hotelId
        )
        res.status(200).json({ msg: "deleted successfully" })
    } catch (error) {
        next(error);
    }
}

export async function viewHotel(req, res, next) {
    try {
        const { hotelId } = req.params
        let hotel = await hotelsModel.findById(
            hotelId
        )
        res.status(200).json(hotel)
    } catch (error) {
        next(error);
    }
}

export async function viewAllHotels(req, res, next) {
    const { min, max, ...others } = req.query;
    try {
        console.log("Constructed query:", req.query);
        const hotels = await hotelsModel.find({
            ...others,
            cheapestprice: { $gte: min | 1, $lte: max || 999 },
        }).limit(4);

        console.log("Retrieved hotels:", hotels);
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
}

export async function countByCity(req, res, next) {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map((ele) => {
            return hotelsModel.countDocuments({ city: ele })
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error);
    }
}

export async function countByType(req, res, next) {
    try {
        const hotelCount = await hotelsModel.countDocuments({ type: "hotel" })
        const apartmentCount = await hotelsModel.countDocuments({ type: "apartment" })
        const resortCount = await hotelsModel.countDocuments({ type: "resort" })
        const villaCount = await hotelsModel.countDocuments({ type: "villa" })
        const cabinCount = await hotelsModel.countDocuments({ type: "cabin" })
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount },
        ])
    } catch (error) {
        next(error);
    }
}

export async function getHotelRooms(req, res, next) {
    try {
        const hotel = await hotelsModel.findById(req.params.id)
        const list = await Promise.all(hotel.rooms.map((ele) => {
            return roomsModel.findById(ele)
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}