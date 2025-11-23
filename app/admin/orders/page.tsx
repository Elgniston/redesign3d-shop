import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { logoutAdmin } from "@/app/actions/admin-auth";

export default async function AdminOrdersPage() {
    const { data: orders } = await supabase
        .from("orders")
        .select("*, card_designs(name)")
        .order("created_at", { ascending: false });

    return (
        <div className="container py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Order Management</h1>
                <form action={logoutAdmin}>
                    <Button variant="outline">Logout</Button>
                </form>
            </div>

            <div className="border rounded-xl overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-mono text-xs">{order.id.slice(0, 8)}...</TableCell>
                                <TableCell>
                                    <div className="font-medium">{order.customer_name}</div>
                                    <div className="text-xs text-muted-foreground">{order.customer_email}</div>
                                </TableCell>
                                <TableCell>{order.card_designs?.name}</TableCell>
                                <TableCell>
                                    <Badge variant={
                                        order.status === "New" ? "default" :
                                            order.status === "Printing" ? "secondary" :
                                                order.status === "Shipped" ? "outline" : "destructive"
                                    }>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button asChild size="sm" variant="ghost">
                                        <Link href={`/admin/orders/${order.id}`}>View</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {(!orders || orders.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
