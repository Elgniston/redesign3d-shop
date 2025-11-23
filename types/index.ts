export type CardDesign = {
    id: string;
    name: string;
    description: string;
    base_price: number;
    preview_url: string;
    created_at: string;
};

export type OrderStatus = 'New' | 'Printing' | 'Shipped';

export type Order = {
    id: string;
    user_id?: string;
    design_id: string;
    customization_json: CustomizationData;
    quantity: number;
    price: number;
    status: OrderStatus;
    customer_name: string;
    customer_email: string;
    shipping_address: string;
    stripe_payment_intent_id?: string;
    created_at: string;
    updated_at: string;
};

export type CustomizationData = {
    name: string;
    title: string;
    phone?: string;
    email?: string;
    font: string;
    color: string;
};

export type PrintJob = {
    id: string;
    order_id: string;
    status: string;
    notes?: string;
    updated_at: string;
};
