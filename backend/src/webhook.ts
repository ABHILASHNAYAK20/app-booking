import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_API_KEY as string, );
const app = express();

// Middleware to handle raw body
app.use(express.raw({ type: 'application/json' }));

// Stripe Webhook Endpoint
app.post('/webhook', (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;

    let event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
    } catch (err) {
        // Ensure err is an instance of Error to safely access .message
        if (err instanceof Error) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        } else {
            console.error('Unknown error occurred');
            return res.status(400).send('Webhook Error: Unknown error');
        }
    }

    // Handle different event types
    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object as Stripe.PaymentIntent;
            console.log(`PaymentIntent was successful! ID: ${paymentIntent.id}`);
            // Handle successful payment here
            break;
        case 'payment_intent.payment_failed':
            const paymentFailed = event.data.object as Stripe.PaymentIntent;
            console.error(`Payment failed for PaymentIntent ID: ${paymentFailed.id}`);
            // Handle failed payment here
            break;
        // Add more cases for other event types as needed
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
});

// Start Webhook Server
const WEBHOOK_PORT = process.env.WEBHOOK_PORT || 3001;
app.listen(WEBHOOK_PORT, () => {
    console.log(`Webhook server running on http://localhost:${WEBHOOK_PORT}`);
});
