import { Router } from "express";
import multer from "multer";

import {
    clockIn,
    clockOut,
    getAttendanceHistory,
} from "../controllers/attendanceController.js";

import { authenticate }
    from "../middleware/authMiddleware.js";

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post(
    "/clock-in",
    authenticate,
    upload.single("photo"),
    clockIn
);

router.post(
    "/clock-out",
    authenticate,
    upload.single("photo"),
    clockOut
);

router.get(
    "/history",
    authenticate,
    getAttendanceHistory
);

export default router;