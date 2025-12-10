// routes/contactRoute.js
import express from "express";
import { contactUs } from "../Contollers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/contact", contactUs);

export default contactRouter;
