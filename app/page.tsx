import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Printer, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-background">
        <div className="container relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
            The Future of Networking <br /> is 3D Printed.
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px] mb-8">
            Stand out with premium, customizable 3D printed business cards.
            Durable, unique, and unforgettable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="text-lg px-8 h-12">
              <Link href="/shop">
                Start Designing <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8 h-12">
              <Link href="/shop">View Gallery</Link>
            </Button>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <Palette className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fully Customizable</h3>
              <p className="text-muted-foreground">
                Choose from premium materials, colors, and fonts. Add your logo and details instantly.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <Printer className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">High-Precision 3D Print</h3>
              <p className="text-muted-foreground">
                Printed with industrial-grade technology for sharp details and durability.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-sm border">
              <div className="p-3 bg-primary/10 rounded-full mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-muted-foreground">
                Production starts immediately. Track your order from print bed to doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="bg-primary text-primary-foreground rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to make an impression?</h2>
              <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have upgraded their networking game.
              </p>
              <Button size="lg" variant="secondary" asChild className="text-lg h-12 px-8">
                <Link href="/shop">Order Now</Link>
              </Button>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl" />
          </div>
        </div>
      </section>
    </div>
  );
}
