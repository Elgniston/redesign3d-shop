# REDESIGN3D

REDESIGN3D is a modern e-commerce platform for customizing and ordering 3D printed business cards. Built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Features

- **3D Hero Experience**: Interactive 3D business card on the homepage using React Three Fiber.
- **Customization Engine**: Live preview of business card designs with real-time updates.
- **E-commerce**: Integrated with Stripe for secure checkout.
- **Order Tracking**: Public tracking page (`/track`) where users can search by Order ID.
- **Email Notifications**: Automated order confirmation emails via Resend.
- **Admin Dashboard**: Manage orders, update statuses, and view customer details.
- **Responsive Design**: Mobile-first approach using Tailwind CSS and shadcn/ui.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, React Three Fiber
- **Backend**: Next.js Server Actions, API Routes
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **Email**: Resend

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase Account
- Stripe Account
- Resend Account (for emails)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd REDESIGN3D
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:

   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # Email (Resend)
   RESEND_API_KEY=your_resend_api_key

   # Admin
   ADMIN_PASSWORD=your_admin_password
   ```

4. Set up the database:
   Run the SQL commands in `db/schema.sql` in your Supabase SQL Editor.

5. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `/app`: Next.js App Router pages and API routes.
- `/components`: Reusable UI components (including `hero-3d-card.tsx`).
- `/lib`: Utility functions and client configurations.
- `/db`: Database schema and seeds.
- `/types`: TypeScript type definitions.

## Admin Access

Navigate to `/admin/login` and enter the password configured in `ADMIN_PASSWORD` (default: `admin123`).

## Deployment

The easiest way to deploy is via **Vercel**:

1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add all the Environment Variables from `.env.local` to the Vercel project settings.
4. Deploy!

## License

MIT
