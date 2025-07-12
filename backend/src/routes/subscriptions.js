const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Subscription plans
const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    features: ['3 optimizations/month', 'Basic optimization', 'Email support']
  },
  professional: {
    name: 'Professional', 
    price: 29,
    priceId: 'price_professional',
    features: [
      'Unlimited optimizations',
      'All 6 Revolutionary Applications',
      'Predictive Content DNA',
      'Psychology Engine',
      'Evolution Predictor',
      'Priority support'
    ]
  },
  business: {
    name: 'Business',
    price: 99, 
    priceId: 'price_business',
    features: [
      'Everything in Professional',
      'Team collaboration',
      'Advanced analytics',
      'Custom integrations',
      'Dedicated support'
    ]
  },
  enterprise: {
    name: 'Enterprise',
    price: 299,
    priceId: 'price_enterprise', 
    features: [
      'Everything in Business',
      'Unlimited team members',
      'Custom AI models',
      'White-label options',
      'SLA guarantee'
    ]
  }
};

// Get subscription plans
router.get('/plans', (req, res) => {
  res.json({
    success: true,
    data: PLANS
  });
});

// Create checkout session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { planId } = req.body;
    
    if (!planId || !PLANS[planId] || planId === 'free') {
      return res.status(400).json({
        success: false,
        error: 'Invalid plan selected'
      });
    }

    const plan = PLANS[planId];
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `LexiForge ${plan.name}`,
            description: plan.features.join(', ')
          },
          unit_amount: plan.price * 100,
          recurring: {
            interval: 'month'
          }
        },
        quantity: 1
      }],
      mode: 'subscription',
      success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/pricing`,
      metadata: {
        planId: planId
      }
    });

    res.json({
      success: true,
      url: session.url
    });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create checkout session'
    });
  }
});

// Webhook for Stripe events
router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('Payment successful:', session.id);
      // TODO: Update user subscription in database
      break;
    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      console.log('Invoice payment succeeded:', invoice.id);
      break;
    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      console.log('Invoice payment failed:', failedInvoice.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

module.exports = router;

