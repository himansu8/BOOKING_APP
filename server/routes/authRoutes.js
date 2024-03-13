import express from 'express'
import { login, register } from '../controller/authcontroller.js';
import { verifyToken } from '../middlewares/verifyToken.js';


const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/login/authverify", verifyToken, 
(req, res, next)=> {res.send ("You are logged in")})






export default router;