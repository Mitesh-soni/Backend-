import express from "express";
import { createUser } from "../controller/user.controller.js";

const router = express.Router();

// router.get("/",);
router.post("/",createUser);
// router.put("/",);
// router.delete("",);

export default router