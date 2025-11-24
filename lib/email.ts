import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail(
    email: string,
    orderId: string,
    customerName: string,
    designName: string,
    totalPrice: number
) {
    if (!process.env.RESEND_API_KEY) {
        console.log("⚠️ RESEND_API_KEY not found. Skipping email sending.");
        console.log(`[Mock Email] To: ${email}, Subject: Order Confirmation #${orderId}`);
        return;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'REDESIGN3D <orders@resend.dev>', // Default testing domain
            to: [email],
            subject: `Order Confirmation - ${designName}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Thank you for your order, ${customerName}!</h1>
          <p>We have received your order for <strong>${designName}</strong>.</p>
          
          <div style="background-color: #f4f4f4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Order ID:</strong> ${orderId}</p>
            <p><strong>Total:</strong> $${totalPrice.toFixed(2)}</p>
            <p><strong>Status:</strong> Payment Received</p>
          </div>

          <p>You can track your order status at any time by clicking the link below:</p>
          <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/track/${orderId}" 
             style="display: inline-block; background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
            Track Order
          </a>
        </div>
      `,
        });

        if (error) {
            console.error("Resend Email Error:", error);
        } else {
            console.log("Email sent successfully:", data);
        }
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}
