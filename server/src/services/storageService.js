import { supabase } from "../config/supabase.js";

export const uploadAttendancePhoto = async (
    userId,
    fileBuffer,
    fileName,
    mimeType
) => {
    const filePath = `${userId}/${fileName}`;

    const { error } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(filePath, fileBuffer, {
            contentType: mimeType,
            upsert: true,
        });

    if (error) {
        throw error;
    }

    return filePath;
};