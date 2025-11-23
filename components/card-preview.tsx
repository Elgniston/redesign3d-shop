import { CustomizationData } from "@/types";
import { cn } from "@/lib/utils";

interface CardPreviewProps {
    data: CustomizationData;
    className?: string;
}

export function CardPreview({ data, className }: CardPreviewProps) {
    const { name, title, phone, email, font, color } = data;

    // Map font names to CSS classes or styles
    const fontClass = {
        "Inter": "font-sans",
        "Roboto": "font-serif", // Placeholder mapping
        "Outfit": "font-sans",
    }[font] || "font-sans";

    // Map color names to hex or classes
    const colorStyle = {
        "Black": "#18181b",
        "Blue": "#2563eb",
        "Red": "#dc2626",
        "Green": "#16a34a",
    }[color] || "#18181b";

    return (
        <div className={cn("perspective-1000 w-full max-w-md mx-auto", className)}>
            <div
                className="relative aspect-[1.586/1] w-full rounded-xl shadow-2xl transition-transform duration-500 transform hover:rotate-y-6 hover:rotate-x-6"
                style={{
                    backgroundColor: colorStyle,
                    color: color === "White" ? "black" : "white",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Card Content */}
                <div className="absolute inset-0 flex flex-col justify-center p-8">
                    <h2 className={cn("text-3xl font-bold mb-2", fontClass)}>{name || "Your Name"}</h2>
                    <p className={cn("text-lg opacity-90 mb-6", fontClass)}>{title || "Job Title"}</p>

                    <div className="mt-auto space-y-1 text-sm opacity-80">
                        {phone && <p>{phone}</p>}
                        {email && <p>{email}</p>}
                    </div>
                </div>

                {/* 3D Thickness Effect (Pseudo-element simulation) */}
                <div
                    className="absolute inset-0 rounded-xl pointer-events-none border border-white/10"
                    style={{ transform: "translateZ(2px)" }}
                />
            </div>
        </div>
    );
}
