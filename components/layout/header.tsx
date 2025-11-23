import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight">REDESIGN3D</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link href="/shop" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Shop
                        </Link>
                        <Link href="/track" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Track Order
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="sr-only">Cart</span>
                    </Button>
                    <Button asChild>
                        <Link href="/shop">Get Started</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
