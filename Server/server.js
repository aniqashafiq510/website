import express from "express";
import db_connection from "./dbConn/dbconfig.js";
import router from "./Routes/userRoutes.js";
import morgan from "morgan";
import cors from 'cors'
import reviewRouter from "./Routes/reviewsRoute.js";
import imageRoute from "./Routes/imageRoute.js";
import ratingRouter from "./Routes/ratingRoute.js";
import postRouter from "./Routes/postRoutes.js";
import contactRouter from "./Routes/contactRoute.js";







const app = express()
const port = 9090;

app.use(express.json())
// this middleware will use to show our json data into js object so that it become available for us to use or read

app.use(cors())
app.use(morgan("dev"))

// these middlewares help fetching data from server at browser site
// morgan me argument dena lazmi h ,,dev means development mode

app.use("/api/user" , router)
app.use("/api/reviews", reviewRouter) 
app.use("/api/images", imageRoute)
app.use("/api/rating", ratingRouter)
app.use("/api/posts", postRouter)
app.use("/api", contactRouter)





app.get('/', (req,res) => {
    res.send(`Server has started on port ${port}`)
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}` )
})

db_connection()