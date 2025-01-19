import React from 'react';
import { ScanLine, Calculator, Database, Settings } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-16 px-4 relative overflow-hidden mt-[-100px]">
      {/* Background Gradient Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-green-900/20" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            QR Code Food <span className="text-green-400">Calorie Scanner</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            A smart solution for tracking food calories through QR code scanning,
            helping you make informed dietary choices with real-time calculations.
          </p>
        </div>

        {/* Core Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-green-500/20 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <ScanLine className="w-8 h-8 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">QR Code Scanning</h3>
            </div>
            <p className="text-gray-300">
              Instantly scan QR codes on food dishes to retrieve detailed information
              about ingredients and their quantities. Compatible with standardized QR
              formats containing dish and constituent data.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-green-500/20 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <Calculator className="w-8 h-8 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Dynamic Calculations</h3>
            </div>
            <p className="text-gray-300">
              Real-time calorie calculations as you modify ingredient quantities.
              Get instant updates on total calories and detailed breakdowns of each
              constituent item.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-green-500/20 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <Database className="w-8 h-8 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Inventory Management</h3>
            </div>
            <p className="text-gray-300">
              Comprehensive CRUD operations for managing dishes and ingredients.
              MongoDB-powered database ensures accurate and up-to-date calorie
              information.
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-green-500/20 transform hover:scale-105 transition-transform duration-300">
            <div className="flex items-center mb-4">
              <Settings className="w-8 h-8 text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-white">Customization</h3>
            </div>
            <p className="text-gray-300">
              Easily modify ingredient quantities and see instant calorie updates.
              Personalize your meal combinations while keeping track of nutritional
              values.
            </p>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="bg-gradient-to-r from-black/60 via-green-900/20 to-black/60 backdrop-blur-sm p-8 rounded-xl border border-green-500/20 mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Technical Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-green-400 mb-3">Frontend</h3>
              <ul className="text-gray-300 space-y-2">
                <li>React.js</li>
                <li>React QR Reader</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-green-400 mb-3">Backend</h3>
              <ul className="text-gray-300 space-y-2">
                <li>Node.js</li>
                <li>Express.js</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-green-400 mb-3">Database</h3>
              <ul className="text-gray-300 space-y-2">
                <li>MongoDB</li>
                <li>Mongoose ODM</li>
                <li>CRUD Operations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Example Usage */}
       
      </div>
    </div>
  );
};

export default About;