//import mongoose from 'mongoose';
import usersModel from '../models/usersModel.js';

export async function updateUser(req, res,next) {
    try {
        const { userId } = req.params
        let editUser = await usersModel.findByIdAndUpdate(
            userId,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json({msg:"updated successfully"})
    } catch (error) {
        next(error);
    }
}

export async function deleteUser (req,res,next){
    try {
        const {userId} = req.params 
        await usersModel.findByIdAndDelete(
            userId
        )
        res.status(200).json({msg:"deleted successfully"})
    } catch (error) {
        next(error);
    }
}

export async function viewUser (req,res,next){
    try {
        const {userId} = req.params 
        let user =  await usersModel.findById(
            userId
        )
        res.status(200).json(user)
    } catch (error) {
        next(error);
    }
}

export async function viewAllUsers (req,res,next){
    try {
        let Users =  await usersModel.find()
        res.status(200).json(Users)
    } catch (error) {
        next(error);
    }
}