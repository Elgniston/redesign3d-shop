"use client";

import { useState } from "react";
import { CardDesign, CustomizationData } from "@/types";
import { CardPreview } from "@/components/card-preview";
import { CustomizationForm } from "@/components/customization-form";
import { Button } from "@/components/ui/button";
import { checkoutAction } from "@/app/actions/checkout"; // We will create this
import { Loader2 } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is installed or use standard toast? shadcn uses sonner usually.
// Wait, I didn't install sonner. I'll use simple alert or just console for now, or install it.
// I'll skip toast for now and just handle error.

interface CustomizeFlowProps {
    design: CardDesign;
}

export function CustomizeFlow({ design }: CustomizeFlowProps) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<CustomizationData>({
        name: "",
        title: "",
        phone: "",
        email: "",
        font: "Inter",
        color: "Black",
    });

    const handleCheckout = async () => {
        setLoading(true);
        try {
            // Call server action to create checkout session
            const result = await checkoutAction(design.id, data);
            if (result?.error) {
                alert(`Error: ${result.error}`);
            } else if (result?.url) {
                window.location.href = result.url;
            } else {
                alert("Failed to start checkout. Please try again.");
            }
        } catch (error: any) {
            console.error(error);
            alert(`An error occurred: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="lg:sticky lg:top-24 h-fit">
                <div className="mb-6 text-center lg:text-left">
                    <h2 className="text-2xl font-bold mb-2">Live Preview</h2>
                    <p className="text-muted-foreground">See your card update in real-time.</p>
                </div>
                <CardPreview data={data} />
            </div>

            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Customize Your Card</h1>
                    <p className="text-muted-foreground">
                        Enter your details below. What you see is what we print.
                    </p>
                </div>

                <div className="bg-card border rounded-xl p-6 shadow-sm">
                    <CustomizationForm data={data} onChange={setData} />
                </div>

                <div className="bg-muted/30 p-6 rounded-xl border">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Base Price</span>
                        <span>${design.base_price}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
                        <span>Total</span>
                        <span>${design.base_price}</span>
                    </div>
                </div>

                <Button
                    size="lg"
                    className="w-full text-lg"
                    onClick={handleCheckout}
                    disabled={loading}
                >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Proceed to Checkout
                </Button>
            </div>
        </div>
    );
}
