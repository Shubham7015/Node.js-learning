import express from "express";
import type { Router } from "express";
import { getpets,getpetbyid } from "../controllers/pet.controller.js";
import { validateNumberById , validateAuthentication } from '../middlewares/pets.middleware.js'

const petrouter:Router = express.Router();


petrouter.get("/", getpets);

petrouter.get("/:id",validateAuthentication,validateNumberById,getpetbyid);

export default petrouter;
