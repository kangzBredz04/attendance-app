import { supabase } from "../config/supabase.js";
import {
    successResponse,
    errorResponse,
} from "../utils/response.js";

import { uploadAttendancePhoto } from "../services/storageService.js";

export const clockIn = async (
    req,
    res
) => {
    try {
        const user_id = req.user.id;

        const {
            latitude,
            longitude,
        } = req.body;

        const today = new Date()
            .toISOString()
            .split("T")[0];

        const filePath =
            await uploadAttendancePhoto(
                user_id,
                req.file.buffer,
                `${today}-in.jpg`,
                req.file.mimetype
            );

        const { data, error } =
            await supabase
                .from("attendance")
                .insert([
                    {
                        user_id,
                        date: today,
                        clock_in:
                            new Date().toISOString(),
                        latitude_in: latitude,
                        longitude_in: longitude,
                        image_url_in: filePath,
                        status: "hadir",
                    },
                ])
                .select()
                .single();

        if (error) throw error;

        return successResponse(
            res,
            data,
            "Clock in successful",
            201
        );
    } catch (err) {
        return errorResponse(
            res,
            err.message
        );
    }
};

export const clockOut = async (req, res) => {
    try {
        const { user_id, latitude, longitude } = req.body;

        if (!req.file) {
            return errorResponse(res, "Photo is required", 400);
        }

        const today = new Date().toISOString().split("T")[0];

        const filePath = await uploadAttendancePhoto(
            user_id,
            req.file.buffer,
            `${today}-out.jpg`,
            req.file.mimetype
        );

        const { data, error } = await supabase
            .from("attendance")
            .update({
                clock_out: new Date().toISOString(),
                latitude_out: latitude,
                longitude_out: longitude,
                image_url_out: filePath,
            })
            .eq("user_id", user_id)
            .eq("date", today)
            .select()
            .single();

        if (error) throw error;

        return successResponse(
            res,
            data,
            "Clock out successful"
        );
    } catch (err) {
        return errorResponse(res, err.message);
    }
};

export const getAttendanceHistory =
    async (req, res) => {
        try {
            const user_id =
                req.user.id;

            const { data, error } =
                await supabase
                    .from("attendance")
                    .select("*")
                    .eq("user_id", user_id)
                    .order("date", {
                        ascending: false,
                    });

            if (error) throw error;

            return successResponse(
                res,
                data
            );
        } catch (err) {
            return errorResponse(
                res,
                err.message
            );
        }
    };

export const getAttendanceSummary = async (
    req,
    res
) => {
    try {
        const { startDate, endDate } = req.query;

        let query = supabase
            .from("attendance")
            .select(`
        *,
        profiles (
          nama,
          email,
          jabatan
        )
      `)
            .order("date", {
                ascending: false,
            });

        if (startDate) {
            query = query.gte("date", startDate);
        }

        if (endDate) {
            query = query.lte("date", endDate);
        }

        const { data, error } =
            await query;

        if (error) throw error;

        return successResponse(res, data);
    } catch (err) {
        return errorResponse(res, err.message);
    }
};