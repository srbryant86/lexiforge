import React from 'react';
import { Check } from 'lucide-react';
import axios from 'axios';

const PricingPage = () => {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: [
        '3 optimizations per month',
        'Basic optimization',
        'Email support',
        'Community access'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 29,
      popular: true,
      features: [
        'Unlimited optimizations',
        'All 6 Revolutionary Applications',
        'Predictive Content DNA System',
        'Real-Time Psychology Engine',
        'Content Evolution Predictor',
        'Multi-Dimensional Optimizer',
        'Contextual Memory Intelligence',
        'Priority support'
      ]
    },
    {
      id: 'business',
      name: 'Business',
      price: 99,
      features: [
        'Everything in Professional',
        'Team collaboration (up to 10 members)',
        'Advanced analytics dashboard',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      features: [
        'Everything in Business',
        'Unlimited team members',
        'Custom AI model training',
        'On-premise deployment',
        'Advanced security features',
        '24/7 phone support'
      ]
    }
  ];

  const handleSubscribe = async (planId) => {
    if (planId === 'free') {
      alert('Free plan selected! Sign up to get started.');
      return;
    }

    try {
      const response = await axios.post('/api/subscriptions/create-checkout-session', {
        planId
      });

      if (response.data.success) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Failed to start subscription process. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Revolutionary AI Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that unlocks the full power of our 6 revolutionary applications. 
            Capabilities that don't exist anywhere else in the market.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl shadow-xl p-8 relative ${
                plan.popular ? 'ring-4 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold mb-6">
                ${plan.price}<span className="text-lg text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan.id)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

