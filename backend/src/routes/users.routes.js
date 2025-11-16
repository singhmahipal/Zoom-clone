import { Router } from "express";
import { login, register } from "../controllers/user.controller.js";
import { addToActivity, getAllActivity } from "../controllers/activity.controller.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);

router.post("/add_to_activity", addToActivity);
router.get("/get_all_activity", getAllActivity);

export default router;
