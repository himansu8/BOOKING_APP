import usersModel from "../models/usersModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import config from "../config/config.js";
//import generationToken from "../utils/generationToken.js"
import {createError} from "../utils/error.js";

export async function register(req, res, next) {
    try {
        let { userName, email, password } = req.body
        password = await bcrypt.hash(password, 12)
        let userData = {
            userName,
            email,
            password
        }
        await usersModel.create(userData)
        res.status(200).json({ msg: "user successfully registered" })
    } catch (error) {
        next(error)
    }
}
export async function login(req, res, next) {
    try {
        var { userName, password } = req.body

        let user = await usersModel.findOne({ userName: userName });
        if (!user) {
            return next(createError(404,'Incorrect userName'))
        }
        let matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            return next(createError(400, 'Incorrect password'))
        }
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            config.JWT
        );

        var { password, isAdmin, ...otherDetails } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ ...otherDetails });

        // let payload = {
        //     id: userFound._id,
        //     isAdmin: userFound.isAdmin
        // }
        // const token = generationToken(payload)

        // res.status(200).json({ msg: 'user login successfully', token });
    } catch (error) {
        next(error)
    }
}