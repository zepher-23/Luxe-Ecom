import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutForm from '../components/CheckoutForm';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cartItems, getCartTotal } = useCart();
    const navigate = useNavigate();
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // fetch publishable key
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/config`).then(async (r) => {
            const { publishableKey } = await r.json();
            setStripePromise(loadStripe(publishableKey));
        });
    }, []);

    useEffect(() => {
        const total = getCartTotal();
        if (cartItems.length > 0 && total > 0) {
            const amount = Math.round(total * 100);

            // Stripe requires at least 50 cents (approx)
            if (amount < 50) {
                console.warn("Cart total is too low for payment processing.");
                return;
            }

            // Create PaymentIntent as soon as the page loads
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/create-payment-intent`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: amount, // convert to cents
                    currency: "usd"
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        return res.json().then(json => Promise.reject(json));
                    }
                    return res.json();
                })
                .then((data) => setClientSecret(data.clientSecret))
                .catch((err) => console.error("Error creating payment intent:", err));
        }
    }, [cartItems, getCartTotal]);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="pt-32 pb-12 flex flex-col items-center justify-center min-h-[50vh]">
                    <h2 className="text-2xl font-bold mb-4">Your bag is empty</h2>
                    <button onClick={() => navigate('/collections')} className="bg-black text-white px-8 py-3 rounded-full">
                        Continue Shopping
                    </button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <h1 className="text-4xl font-black tracking-tight text-black mb-12 text-center">CHECKOUT</h1>

                {(stripePromise && clientSecret) ? (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <CheckoutForm clientSecret={clientSecret} />
                    </Elements>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black" />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
