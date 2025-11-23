import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CustomizeFlow } from "@/components/customize-flow";
import { CardDesign } from "@/types";

export const dynamic = "force-dynamic";

// Mock data (duplicated for now)
interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function CustomizePage({ params }: PageProps) {
    const { id } = await params;

    // Fetch from DB
    const { data: design } = await supabase.from("card_designs").select("*").eq("id", id).single();

    if (!design) {
        notFound();
    }

    return (
        <div className="container py-10 md:py-16">
            <CustomizeFlow design={design} />
        </div>
    );
}
