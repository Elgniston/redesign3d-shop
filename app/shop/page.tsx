import { supabase } from "@/lib/supabase";
import { ProductCard } from "@/components/product-card";
import { CardDesign } from "@/types";

// Mock data for development if DB is empty
export const dynamic = "force-dynamic";

export default async function ShopPage() {
    // Fetch designs from Supabase
    const { data: designs, error } = await supabase
        .from("card_designs")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {
        if (error) {
            console.error("Supabase Error in ShopPage:", JSON.stringify(error, null, 2));
            console.error("Supabase Error Details:", error.message, error.details, error.hint);
        }
    }

    return (
        <div className="container py-10 md:py-16">
            <div className="flex flex-col items-center text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Design</h1>
                <p className="text-muted-foreground max-w-2xl">
                    Select a base design to start customizing. All cards are printed with high-quality PLA/PETG materials.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {designs?.map((design) => (
                    <ProductCard key={design.id} design={design} />
                ))}
                {(!designs || designs.length === 0) && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        No designs found. Please run the database seed script.
                    </div>
                )}
            </div>
        </div>
    );
}
