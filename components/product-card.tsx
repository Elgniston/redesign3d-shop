import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardDesign } from "@/types";

interface ProductCardProps {
    design: CardDesign;
}

export function ProductCard({ design }: ProductCardProps) {
    return (
        <Card className="overflow-hidden flex flex-col h-full transition-all hover:shadow-lg">
            <div className="aspect-[1.586/1] bg-muted relative overflow-hidden group">
                {/* Placeholder for actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-muted-foreground">
                    {/* In a real app, use next/image with design.preview_url */}
                    <span className="text-lg font-medium">{design.name} Preview</span>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button asChild variant="secondary">
                        <Link href={`/design/${design.id}`}>View Details</Link>
                    </Button>
                </div>
            </div>
            <CardHeader>
                <CardTitle className="flex justify-between items-start">
                    <span>{design.name}</span>
                    <span className="text-lg font-bold text-primary">${design.base_price}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {design.description}
                </p>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={`/customize/${design.id}`}>Customize Now</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
