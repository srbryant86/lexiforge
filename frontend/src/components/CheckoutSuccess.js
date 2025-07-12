import React from 'react';
import { CheckCircle } from 'lucide-react';

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your subscription has been activated. You can now access all features.
        </p>
        <a
          href="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Start Optimizing
        </a>
      </div>
    </div>
  );
};

export default CheckoutSuccess;

