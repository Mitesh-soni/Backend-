import express from "express";
import { createUser, deleteUser, getUser, updateUser } from "../controller/user.controller.js";

const router = express.Router();

router.get("/getuser/:id", getUser);
router.post("/createuser", createUser);
router.put("/updateuser/:id", updateUser);
router.delete("/deleteuser/:id", deleteUser);

export default router