"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function TrackOrderSearchPage() {
    const [orderId, setOrderId] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (orderId.trim()) {
            router.push(`/track/${orderId.trim()}`);
        }
    };

    return (
        <div className="container flex items-center justify-center min-h-[60vh] py-10">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Track Your Order</CardTitle>
                    <CardDescription>
                        Enter the Order ID sent to your email to check its status.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSearch} className="flex flex-col gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Order ID (e.g., 550e8400...)"
                                className="pl-9"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                required
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Track Order
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
