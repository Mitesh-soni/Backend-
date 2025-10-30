import express from "express";
import { createUser, deleteUser, findAllUser, updateUser } from "../controller/user.controller.js";

const router = express.Router();

router.get("/getuser", findAllUser);
router.post("/createuser", createUser);
router.put("/updateuser/:userId", updateUser);
router.delete("/deleteuser/:key/:value", deleteUser);

export default router