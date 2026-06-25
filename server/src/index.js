import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import attendanceRoutes from "./routes/attendanceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({
    limit: "10mb",
}));

app.use(express.urlencoded({
    extended: true,
}));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Attendance API Running",
    });
});

app.use(
    "/api/attendance",
    attendanceRoutes
);

app.use(
    "/api/admin",
    adminRoutes
);

const PORT =
    process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});