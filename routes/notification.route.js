import { Router } from "express";
import { getNotifications, markRead } from "../controllers/notification";
import auth from "../middleware/auth";

const router = Router();

router.get("/", auth, getNotifications);
router.post("/mark-read", auth, markRead);

export default router;
