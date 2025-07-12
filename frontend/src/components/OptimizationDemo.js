import React, { useState } from 'react';
import { Brain, Zap, Target, TrendingUp, Users, Lightbulb } from 'lucide-react';
import axios from 'axios';

const OptimizationDemo = () => {
  const [content, setContent] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [results, setResults] = useState(null);

  const handleOptimize = async () => {
    if (!content.trim()) return;

    setIsOptimizing(true);
    try {
      const response = await axios.post('/api/optimization/demo', {
        content,
        options: {
          targetAudience: { demographic: 'professional' },
          contentGoals: ['engagement', 'clarity', 'conversion']
        }
      });

      setResults(response.data.data);
    } catch (error) {
      console.error('Optimization error:', error);
      setResults({
        error: 'Failed to optimize content. Please try again.'
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Revolutionary AI Content Intelligence
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the world's first predictive content optimization platform with 6 breakthrough applications that don't exist anywhere else.
          </p>
          
          {/* Revolutionary Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Brain className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Predictive Content DNA</h3>
              <p className="text-gray-600">Predict performance before writing</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Psychology Engine</h3>
              <p className="text-gray-600">Real-time emotional optimization</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Evolution Predictor</h3>
              <p className="text-gray-600">Strategic planning over time</p>
            </div>
          </div>
        </div>

        {/* Demo Interface */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Try the Revolutionary System
          </h2>

          {/* Content Input */}
          <div className="mb-6">
            <label className="block text-lg font-semibold mb-2">
              Enter your content to optimize:
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your content here to experience revolutionary AI optimization..."
              className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Optimize Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleOptimize}
              disabled={!content.trim() || isOptimizing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isOptimizing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Applying Revolutionary AI...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-5 h-5" />
                  <span>Optimize with Revolutionary AI</span>
                </div>
              )}
            </button>
          </div>

          {/* Results */}
          {results && (
            <div className="bg-gray-50 rounded-xl p-6">
              {results.error ? (
                <div className="text-red-600 text-center">{results.error}</div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold mb-4">Revolutionary Optimization Results</h3>
                  
                  {/* Performance Prediction */}
                  {results.performancePrediction && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Performance Prediction:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {results.performancePrediction.engagement}%
                          </div>
                          <div className="text-sm text-gray-600">Engagement</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {results.performancePrediction.conversion}%
                          </div>
                          <div className="text-sm text-gray-600">Conversion</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-purple-600">
                            {results.performancePrediction.psychology}%
                          </div>
                          <div className="text-sm text-gray-600">Psychology</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg text-center">
                          <div className="text-2xl font-bold text-orange-600">
                            {results.performancePrediction.overallScore}%
                          </div>
                          <div className="text-sm text-gray-600">Overall</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Optimized Content */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Optimized Content:</h4>
                    <div className="bg-white p-4 rounded-lg border">
                      {results.optimizedContent}
                    </div>
                  </div>

                  {/* Improvements */}
                  {results.improvements && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-2">Revolutionary Improvements:</h4>
                      <ul className="space-y-2">
                        {results.improvements.map((improvement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Zap className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Revolutionary Features Used */}
                  {results.revolutionaryFeatures && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Revolutionary Features Applied:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {Object.entries(results.revolutionaryFeatures).map(([feature, status]) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm capitalize">{feature.replace(/([A-Z])/g, ' $1')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Experience the full power of all 6 revolutionary applications
            </p>
            <a
              href="/pricing"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Unlock Revolutionary Features
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationDemo;

