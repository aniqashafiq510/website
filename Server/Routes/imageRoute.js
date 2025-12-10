import express from "express"
import * as i from "../Contollers/imageController.js"
import uploading from "../middlewares/multer.js"


const imageRoute = express.Router()


imageRoute.post("/upload-image",uploading.array("image",5), i.uploadImage )
imageRoute.get("/get-images", i.fetchAllImages);
imageRoute.delete("/delete-image/:id", i.deleteImage);

export default imageRoute


// in server
// app.use("/api/images", imageRoute)