'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './context/AuthContext';
import { 
  Gamepad2, 
  Trophy, 
  BarChart3, 
  Target, 
  Users, 
  Zap,
  ArrowRight,
  Play,
  Star
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Gamepad2 className="w-12 h-12 text-green-500" />,
      title: "Interactive Games",
      description: "Engaging rehabilitation exercises disguised as fun games to keep you motivated"
    },
    {
      icon: <Target className="w-12 h-12 text-green-500" />,
      title: "Personalized Goals",
      description: "AI-powered recommendations based on your condition and recovery progress"
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-green-500" />,
      title: "Progress Tracking",
      description: "Real-time monitoring of your rehabilitation journey with detailed analytics"
    },
    {
      icon: <Trophy className="w-12 h-12 text-green-500" />,
      title: "Achievement System",
      description: "Earn badges and rewards as you reach milestones in your recovery"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users" },
    { number: "95%", label: "Success Rate" },
    { number: "50+", label: "Game Types" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Gamify Your
              <span className="text-green-600"> Recovery</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform rehabilitation into an engaging journey with personalized games, 
              real-time progress tracking, and motivational rewards. Make recovery fun and effective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link href="/dashboard" className="btn-primary text-lg px-8 py-3">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/register" className="btn-primary text-lg px-8 py-3">
                    Start Free Trial
                  </Link>
                  <Link href="/games" className="btn-secondary text-lg px-8 py-3">
                    Explore Games
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose RehabGames?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with proven rehabilitation principles 
              to create an engaging recovery experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with RehabGames in three simple steps
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Profile</h3>
              <p className="text-gray-600">
                Set up your rehabilitation profile with your condition and recovery goals
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Play Games</h3>
              <p className="text-gray-600">
                Engage with personalized games designed for your specific rehabilitation needs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-gray-600">
                Monitor your improvement with detailed analytics and celebrate achievements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your Recovery?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who have made rehabilitation engaging and effective
          </p>
          {user ? (
            <Link href="/games" className="btn-primary text-lg px-8 py-3">
              Start Playing
            </Link>
          ) : (
            <Link href="/register" className="btn-primary text-lg px-8 py-3">
              Get Started Today
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}