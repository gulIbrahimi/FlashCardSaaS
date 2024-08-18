    import { NextResponse } from 'next/server';
import Stripe from 'stripe';

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    export async function POST() {
    try {
        const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
            {
            price_data: {
                currency: 'usd',
                product_data: {
                name: 'Pro Plan',
                },
                unit_amount: 1000,  // e.g., $10.00
            },
            quantity: 1,
            },
        ],
        success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
        });

        return NextResponse.json({ id: session.id });
    } catch (err) {
        return NextResponse.json({ error: { message: err.message } }, { status: 400 });
    }
    }
