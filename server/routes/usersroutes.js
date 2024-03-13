import express from 'express'
import { updateUser,deleteUser,viewUser,viewAllUsers } from '../controller/userController.js';
import { verifyToken, verifyUser, verifyAdmin } from '../middlewares/verifyToken.js';
const router = express.Router();

// router.get("/checkauth", verifyToken, (req,res,next)=>{
//     res.send("hello himansu this is auth")
// } )

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("hello himansu this is auth an you can delete")
// } )

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("hello admin ")
// } )

router.put("/:userId",verifyUser, updateUser )


router.delete("/:userId",verifyUser, deleteUser )


router.get("/:userId",verifyUser, viewUser )


router.get("/",verifyAdmin, viewAllUsers )

export default router;