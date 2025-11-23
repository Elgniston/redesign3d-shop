import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { updateOrderStatus } from "@/app/actions/admin-orders";
import { OrderStatus } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({ params }: PageProps) {
    const { id } = await params;

    const { data: order } = await supabase
        .from("orders")
        .select("*, card_designs(name, preview_url)")
        .eq("id", id)
        .single();

    if (!order) {
        notFound();
    }

    const customization = order.customization_json as any;

    return (
        <div className="container py-10 max-w-4xl">
            <Button variant="ghost" asChild className="mb-6">
                <Link href="/admin/orders">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
                </Link>
            </Button>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Order #{order.id.slice(0, 8)}</h1>
                    <p className="text-muted-foreground">
                        Placed on {new Date(order.created_at).toLocaleString()}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <form action={async (formData) => {
                        "use server";
                        const status = formData.get("status") as OrderStatus;
                        await updateOrderStatus(id, status);
                    }}>
                        <div className="flex items-center gap-2">
                            <select
                                name="status"
                                defaultValue={order.status}
                                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            >
                                <option value="New">New</option>
                                <option value="Printing">Printing</option>
                                <option value="Shipped">Shipped</option>
                            </select>
                            <Button type="submit">Update</Button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-8">
                    <Card>
                        <CardHeader><CardTitle>Customer Details</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                                <span className="text-muted-foreground font-medium">Name:</span>
                                <span className="col-span-2">{order.customer_name}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="text-muted-foreground font-medium">Email:</span>
                                <span className="col-span-2">{order.customer_email}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="text-muted-foreground font-medium">Address:</span>
                                <span className="col-span-2">{order.shipping_address}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                                <span className="text-muted-foreground font-medium">Product:</span>
                                <span className="col-span-2">{order.card_designs?.name}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="text-muted-foreground font-medium">Quantity:</span>
                                <span className="col-span-2">{order.quantity}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="text-muted-foreground font-medium">Total:</span>
                                <span className="col-span-2 font-bold">${order.price}</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                <span className="text-muted-foreground font-medium">Payment:</span>
                                <span className="col-span-2 text-xs font-mono">{order.stripe_payment_intent_id || "Pending"}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card>
                        <CardHeader><CardTitle>Customization Data</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="bg-muted p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
                                {JSON.stringify(customization, null, 2)}
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="font-semibold mb-2">Preview Data</h4>
                                <ul className="space-y-1 text-sm">
                                    <li><span className="text-muted-foreground">Name:</span> {customization.name}</li>
                                    <li><span className="text-muted-foreground">Title:</span> {customization.title}</li>
                                    <li><span className="text-muted-foreground">Font:</span> {customization.font}</li>
                                    <li><span className="text-muted-foreground">Color:</span> {customization.color}</li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
