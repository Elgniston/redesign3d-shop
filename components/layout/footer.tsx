import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t bg-muted/40">
            <div className="container py-10 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold">REDESIGN3D</h3>
                        <p className="text-sm text-muted-foreground">
                            Premium 3D printed business cards for the modern professional.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/shop">All Designs</Link></li>
                            <li><Link href="/shop?category=minimal">Minimalist</Link></li>
                            <li><Link href="/shop?category=tech">Tech</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/track">Track Order</Link></li>
                            <li><Link href="/faq">FAQ</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/terms">Terms of Service</Link></li>
                            <li><Link href="/privacy">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-10 pt-6 border-t text-center text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} REDESIGN3D. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
