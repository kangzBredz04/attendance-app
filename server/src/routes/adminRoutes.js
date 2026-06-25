import { Router } from "express";

import {
    getAttendanceSummary,
} from "../controllers/attendanceController.js";

import { authenticate }
    from "../middleware/authMiddleware.js";

import { isAdmin }
    from "../middleware/adminMiddleware.js";

const router = Router();

router.get(
    "/attendance-summary",
    authenticate,
    isAdmin,
    getAttendanceSummary
);

export default router;