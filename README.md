# REDESIGN3D

REDESIGN3D is a modern e-commerce platform for customizing and ordering 3D printed business cards. Built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Customization Engine**: Live preview of business card designs with real-time updates.
- **E-commerce**: Integrated with Stripe for secure checkout.
- **Order Tracking**: Public tracking page for customers to monitor their order status.
- **Admin Dashboard**: Manage orders, update statuses, and view customer details.
- **Responsive Design**: Mobile-first approach using Tailwind CSS and shadcn/ui.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js Server Actions, API Routes
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase Account
- Stripe Account

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
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
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
- `/components`: Reusable UI components.
- `/lib`: Utility functions and client configurations (Supabase, Stripe).
- `/db`: Database schema and seeds.
- `/types`: TypeScript type definitions.

## Admin Access

Navigate to `/admin/login` and enter the password configured in `ADMIN_PASSWORD` (default: `admin123`).

## License

MIT
