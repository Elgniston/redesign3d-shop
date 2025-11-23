import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { CardDesign } from "@/types";

export const dynamic = "force-dynamic";

// Mock data (duplicated for now)
interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function DesignPage({ params }: PageProps) {
    const { id } = await params;

    // Fetch from DB
    const { data: design } = await supabase.from("card_designs").select("*").eq("id", id).single();

    if (!design) {
        notFound();
    }

    return (
        <div className="container py-10 md:py-16">
            <Button variant="ghost" asChild className="mb-8">
                <Link href="/shop">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
                </Link>
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Image / Preview */}
                <div className="aspect-square bg-muted rounded-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50" />
                    <span className="relative z-10 text-2xl font-medium text-muted-foreground">{design.name} Preview</span>
                </div>

                {/* Details */}
                <div>
                    <h1 className="text-4xl font-bold mb-4">{design.name}</h1>
                    <p className="text-2xl font-bold text-primary mb-6">${design.base_price}</p>
                    <p className="text-lg text-muted-foreground mb-8">
                        {design.description}
                    </p>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-3" />
                            <span>Premium 3D Printed Material</span>
                        </div>
                        <div className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-3" />
                            <span>Fully Customizable Text & Colors</span>
                        </div>
                        <div className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-3" />
                            <span>Durable & Water Resistant</span>
                        </div>
                    </div>

                    <Button size="lg" className="w-full md:w-auto text-lg px-8" asChild>
                        <Link href={`/customize/${design.id}`}>Customize This Design</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
