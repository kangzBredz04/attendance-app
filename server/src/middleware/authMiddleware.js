import { supabase } from "../config/supabase.js";

export const authenticate = async (
    req,
    res,
    next
) => {
    try {
        const authHeader =
            req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Token required",
            });
        }

        const token = authHeader.replace(
            "Bearer ",
            ""
        );

        const {
            data: { user },
            error,
        } = await supabase.auth.getUser(token);

        if (error || !user) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        req.user = user;

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: err.message,
        });
    }
};