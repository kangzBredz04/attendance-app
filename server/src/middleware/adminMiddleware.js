import { supabase } from "../config/supabase.js";

export const isAdmin = async (
    req,
    res,
    next
) => {
    try {
        const { data, error } =
            await supabase
                .from("profiles")
                .select("role")
                .eq("id", req.user.id)
                .single();

        if (error) throw error;

        if (data.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};