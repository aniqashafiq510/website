import express from "express";
import * as rate from "../Contollers/ratingController.js"

const ratingRouter = express.Router();


ratingRouter.post("/add", rate.addRating);


ratingRouter.route("/:id").put(rate.updateRating).delete(rate.deleteRating)



export default ratingRouter;
