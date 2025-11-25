"use server";

import { stripe } from "@/lib/stripe";
import { supabase } from "@/lib/supabase";
import { CustomizationData } from "@/types";
import { headers } from "next/headers";

export async function checkoutAction(designId: string, customization: CustomizationData) {
    try {
        const origin = (await headers()).get("origin") || "http://localhost:3000";

        // 1. Fetch design details to get price
        const { data: design } = await supabase
            .from("card_designs")
            .select("*")
            .eq("id", designId)
            .single();

        if (!design) {
            throw new Error("Design not found");
        }

        // 2. Create Order in DB (Pending)
        // Use admin client to bypass RLS for guest checkout
        const adminClient = (await import("@/lib/supabase-admin")).supabaseAdmin;
        const db = adminClient || supabase;

        if (!adminClient) {
            console.warn("SUPABASE_SERVICE_ROLE_KEY not set. Guest checkout might fail due to RLS.");
        }

        const { data: order, error: orderError } = await db
            .from("orders")
            .insert({
                design_id: designId,
                customization_json: customization,
                quantity: 100, // Default quantity for now
                price: design.base_price,
                status: "Pending Payment",
                customer_name: customization.name, // Use customization name as customer name for now
                customer_email: customization.email || "guest@example.com",
                shipping_address: "123 Main St", // Placeholder, Stripe will collect address
            })
            .select()
            .single();

        if (orderError || !order) {
            console.error("Order creation failed:", orderError);
            throw new Error(`Failed to create order: ${orderError?.message || "Unknown error"}`);
        }

        // 3. Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: `Custom ${design.name} Business Cards`,
                            description: "100x Custom 3D Printed Cards",
                            images: [origin + design.preview_url], // Ensure absolute URL
                        },
                        unit_amount: Math.round(design.base_price * 100), // Cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${origin}/track/${order.id}?success=true`,
            cancel_url: `${origin}/customize/${designId}?canceled=true`,
            metadata: {
                orderId: order.id,
            },
            shipping_address_collection: {
                allowed_countries: ["US", "CA"],
            },
            customer_email: customization.email || undefined,
        });

        return { url: session.url };

    } catch (error: any) {
        console.error("Checkout error:", error);
        return { error: error.message || "An error occurred during checkout" };
    }
}
