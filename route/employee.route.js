import express from "express"
import {createemp} from "../controllers/create.controller.js"
import {deleteemp} from "../controllers/delete.controller.js"
import {getemp} from "../controllers/get.controller.js"
import { updateemp } from "../controllers/update.controller.js";

const router = express.Router();

router.post("/createemp",createemp);
router.get("/getemp/:id",getemp);
router.put("/updateemp/:id",updateemp)
router.delete("/deleteemp/:id",deleteemp);

export default router;
