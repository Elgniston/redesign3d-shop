"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAdmin } from "@/app/actions/admin-auth"; // We will create this
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await loginAdmin(password);
        if (success) {
            router.push("/admin/orders");
        } else {
            setError("Invalid password");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-sm space-y-6 p-6 border rounded-xl shadow-sm">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Admin Login</h1>
                    <p className="text-muted-foreground">Enter password to access dashboard</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                    <Button type="submit" className="w-full">Login</Button>
                </form>
            </div>
        </div>
    );
}
