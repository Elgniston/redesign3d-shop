"use server";

import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function loginAdmin(password: string) {
    if (password === ADMIN_PASSWORD) {
        (await cookies()).set("admin_session", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24, // 1 day
        });
        return true;
    }
    return false;
}

export async function logoutAdmin() {
    (await cookies()).delete("admin_session");
}
