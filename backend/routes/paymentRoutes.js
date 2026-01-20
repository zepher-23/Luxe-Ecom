const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.get('/config', (req, res) => {
    res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});

router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency = 'usd' } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (e) {
        res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});

module.exports = router;

router.post('/update-payment-intent', async (req, res) => {
    try {
        const { paymentIntentId, amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.update(
            paymentIntentId,
            { amount }
        );

        res.send({ success: true, paymentIntent });
    } catch (e) {
        res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});
