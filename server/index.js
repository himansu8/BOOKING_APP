import express from 'express'
import './dbConnect.js';
import authRoutes from "./routes/authRoutes.js"
import hotelRoutes from "./routes/hotelRoutes.js"
import roomRoutes from "./routes//roomsRoutes.js"
import usersRoutes from "./routes/usersroutes.js"
import cookieParser from 'cookie-parser';


const app = express();
const port = 5555;

app.use(cookieParser())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("home page")
})

app.use("/api/auth", authRoutes)
app.use("/api/hotels", hotelRoutes)
app.use("/api/rooms", roomRoutes)
app.use("/api/users", usersRoutes)


app.use((error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack,
    });
});


app.listen(port, () => {
    console.log(`the server started at port no  ${port}`)
})