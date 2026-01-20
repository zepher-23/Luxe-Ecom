import React, { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Truck } from 'lucide-react';
import { getOptimizedImage } from '../assets/products';

const CheckoutForm = ({ clientSecret }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Shipping State
    const [shippingRates, setShippingRates] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState(null);

    // Form state
    const [address, setAddress] = useState({
        email: '',
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        postalCode: '',
        country: '',
    });

    useEffect(() => {
        // Fetch shipping rates
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/shipping`)
            .then(res => res.json())
            .then(data => {
                setShippingRates(data);
                // Default to first option (Standard)
                if (data.length > 0) {
                    setSelectedShipping(data[0]);
                }
            })
            .catch(err => console.error(err));
    }, []);

    const handleInputChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleShippingChange = async (rate) => {
        setSelectedShipping(rate);

        // Update Stripe Payment Intent Amount
        if (clientSecret) {
            const paymentIntentId = clientSecret.split('_secret')[0];
            const newTotal = getCartTotal() + rate.price;

            try {
                await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/update-payment-intent`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        paymentIntentId,
                        amount: Math.round(newTotal * 100)
                    })
                });
            } catch (error) {
                console.error("Failed to update payment intent amount", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        // 1. Confirm Payment with Stripe
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/`,
            },
            redirect: "if_required",
        });

        if (error) {
            setMessage(error.message);
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            setMessage("Payment succeeded!");
            await createOrderInBackend(paymentIntent);

            clearCart();
            setIsProcessing(false);
            alert("Order Placed Successfully!");
            navigate('/');
        } else {
            setMessage("Unexpected state.");
            setIsProcessing(false);
        }
    };

    const createOrderInBackend = async (paymentIntent) => {
        const orderData = {
            orderItems: cartItems.map(item => ({
                product: item._id,
                name: item.name,
                image: item.image,
                price: item.price,
                qty: item.qty,
                size: item.size
            })),
            shippingAddress: {
                address: address.street,
                city: address.city,
                postalCode: address.postalCode,
                country: address.country,
                email: address.email
            },
            paymentMethod: 'Stripe',
            paymentResult: {
                id: paymentIntent.id,
                status: paymentIntent.status,
                update_time: new Date().toISOString(),
                email_address: address.email
            },
            itemsPrice: getCartTotal(),
            shippingPrice: selectedShipping ? selectedShipping.price : 0,
            taxPrice: 0,
            totalPrice: getCartTotal() + (selectedShipping ? selectedShipping.price : 0)
        };

        try {
            await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            });
        } catch (error) {
            console.error("Failed to save order to backend", error);
        }
    };

    const grandTotal = getCartTotal() + (selectedShipping ? selectedShipping.price : 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Details */}
            <div className="space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Contact & Shipping</h2>
                    <div className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:border-black focus:ring-0 transition-all font-medium"
                            onChange={handleInputChange}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                required
                                className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:border-black focus:ring-0 transition-all font-medium"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                required
                                className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:border-black focus:ring-0 transition-all font-medium"
                                onChange={handleInputChange}
                            />
                        </div>
                        <input
                            type="text"
                            name="street"
                            placeholder="Address"
                            required
                            className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:border-black focus:ring-0 transition-all font-medium"
                            onChange={handleInputChange}
                        />
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                required
                                className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:border-black focus:ring-0 transition-all font-medium"
                                onChange={handleInputChange}
                            />
                            <input
                                type="text"
                                name="postalCode"
                                placeholder="Postal Code"
                                required
                                className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:border-black focus:ring-0 transition-all font-medium"
                                onChange={handleInputChange}
                            />
                        </div>
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            required
                            className="w-full p-4 bg-gray-50 rounded-xl border-transparent focus:border-black focus:ring-0 transition-all font-medium"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Shipping Method Section */}
                <div className="bg-white p-8 rounded-3xl shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Shipping Method</h2>
                    <div className="space-y-3">
                        {shippingRates.map((rate) => (
                            <div
                                key={rate.id}
                                onClick={() => handleShippingChange(rate)}
                                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${selectedShipping?.id === rate.id
                                    ? 'border-black bg-gray-50 ring-1 ring-black'
                                    : 'border-gray-200 hover:border-gray-300'
                                    }`}
                            >
                                <div className="flex items-center">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${selectedShipping?.id === rate.id ? 'border-black' : 'border-gray-300'
                                        }`}>
                                        {selectedShipping?.id === rate.id && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-black" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm">{rate.name}</p>
                                        <p className="text-gray-500 text-xs">{rate.duration}</p>
                                    </div>
                                </div>
                                <span className="font-medium text-sm">
                                    {rate.price === 0 ? 'Free' : `$${rate.price.toFixed(2)}`}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Payment Details</h2>
                    {/* Stripe Payment Element */}
                    <PaymentElement />
                </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:sticky lg:top-32 h-fit">
                <div className="bg-white p-8 rounded-3xl shadow-sm space-y-6">
                    <h2 className="text-xl font-bold">Order Summary</h2>

                    <div className="max-h-96 overflow-y-auto pr-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={`${item._id}-${item.size}`} className="flex gap-4">
                                <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={getOptimizedImage(item.image).src}
                                        srcSet={getOptimizedImage(item.image).srcSet}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-sm">{item.name}</h3>
                                    <p className="text-gray-500 text-xs mt-1">Size: {item.size} | Qty: {item.qty}</p>
                                    <p className="font-medium text-sm mt-1">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 pt-6 space-y-3">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${getCartTotal().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span>{selectedShipping ? (selectedShipping.price === 0 ? "Free" : `$${selectedShipping.price.toFixed(2)}`) : "--"}</span>
                        </div>
                        <div className="flex justify-between font-bold text-xl text-black pt-3 border-t border-gray-100">
                            <span>Total</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                    </div>

                    {message && (
                        <div className="text-red-500 text-sm font-medium text-center">
                            {message}
                        </div>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={isProcessing || !stripe || !elements}
                        className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? 'Processing Payment...' : 'Pay Now'}
                    </button>

                    <p className="text-xs text-center text-gray-400">
                        Secure payment powered by Stripe.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
