import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, Package, Truck } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
    params: Promise<{ orderId: string }>;
    searchParams: Promise<{ success?: string }>;
}

export default async function TrackOrderPage({ params, searchParams }: PageProps) {
    const { orderId } = await params;
    const { success } = await searchParams;

    // Use admin client to bypass RLS for guest tracking
    const adminClient = (await import("@/lib/supabase-admin")).supabaseAdmin;
    const db = adminClient || supabase;

    const { data: order } = await db
        .from("orders")
        .select("*, card_designs(name, preview_url)")
        .eq("id", orderId)
        .single();

    if (!order) {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
                <p className="mb-8">We couldn't find an order with ID: {orderId}</p>
                <Button asChild><Link href="/">Go Home</Link></Button>
            </div>
        );
    }

    const steps = [
        { status: "New", label: "Order Placed", icon: CheckCircle2 },
        { status: "Printing", label: "Printing in Progress", icon: PrinterIcon },
        { status: "Shipped", label: "Shipped", icon: Truck },
    ];

    const currentStepIndex = steps.findIndex(s => s.status === order.status) !== -1
        ? steps.findIndex(s => s.status === order.status)
        : (order.status === "Pending Payment" ? -1 : 0); // Default to 0 if unknown, -1 if pending

    return (
        <div className="container py-10 md:py-16 max-w-3xl">
            {success && (
                <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg mb-8 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-3" />
                    <p>Thank you! Your order has been placed successfully.</p>
                </div>
            )}

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Order Tracking</h1>
                <span className="text-muted-foreground text-sm">ID: {order.id.slice(0, 8)}...</span>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Status: {order.status}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative flex justify-between">
                        {/* Progress Bar Background */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 -z-10" />

                        {/* Active Progress Bar */}
                        <div
                            className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 -z-10 transition-all duration-500"
                            style={{ width: `${Math.max(0, currentStepIndex / (steps.length - 1)) * 100}%` }}
                        />

                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = index <= currentStepIndex;
                            const isCurrent = index === currentStepIndex;

                            return (
                                <div key={step.status} className="flex flex-col items-center bg-background px-2">
                                    <div className={`
                     w-10 h-10 rounded-full flex items-center justify-center border-2 
                     ${isActive ? "border-primary bg-primary text-primary-foreground" : "border-muted text-muted-foreground"}
                   `}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <span className={`text-xs mt-2 font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader><CardTitle>Order Details</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Product</span>
                            <span className="font-medium">{order.card_designs?.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Quantity</span>
                            <span className="font-medium">{order.quantity}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Total</span>
                            <span className="font-medium">${order.price}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader><CardTitle>Shipping To</CardTitle></CardHeader>
                    <CardContent>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-muted-foreground">{order.shipping_address}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function PrinterIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
            <rect x="6" y="14" width="12" height="8" rx="1" />
        </svg>
    )
}
