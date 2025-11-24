import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === "checkout.session.completed") {
        const orderId = session.metadata?.orderId;
        const paymentIntentId = session.payment_intent as string;

        if (orderId) {
            // Update order status
            const { data: order, error } = await supabaseAdmin // Changed to supabaseAdmin and destructuring data and error
                .from("orders")
                .update({
                    status: "New",
                    stripe_payment_intent_id: paymentIntentId,
                    shipping_address: JSON.stringify((session as any).shipping_details), // Store shipping details
                })
                .eq("id", orderId)
                .select("*, card_designs(name)") // Added select
                .single(); // Added single

            if (error) {
                console.error("Error updating order:", error);
                return new NextResponse("Database Error", { status: 500 });
            }

            // Send Confirmation Email
            if (order && session.customer_details?.email) {
                const { sendOrderConfirmationEmail } = await import("@/lib/email");
                await sendOrderConfirmationEmail(
                    session.customer_details.email,
                    order.id,
                    session.customer_details.name || "Customer",
                    order.card_designs?.name || "Custom Cards",
                    order.price
                );
            }
        }
    }

    return new NextResponse(null, { status: 200 });
}
