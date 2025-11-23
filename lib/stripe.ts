import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
    apiVersion: '2025-11-17.clover' as any, // Cast to any to avoid type issues if types are mismatched, or use exact string from error
    typescript: true,
});
