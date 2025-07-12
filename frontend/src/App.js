import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import OptimizationDemo from './components/OptimizationDemo';
import PricingPage from './components/PricingPage';
import CheckoutSuccess from './components/CheckoutSuccess';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<OptimizationDemo />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

