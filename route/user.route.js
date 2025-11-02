import express from "express";
import { createUser, deleteUser, getUser, updateUser } from "../controller/user.controller.js";

const router = express.Router();

router.get("/getuser/:key/:value", getUser);
router.post("/createuser", createUser);
router.put("/updateuser/:key/:value", updateUser);
router.delete("/deleteuser/:key/:value", deleteUser);

export default router