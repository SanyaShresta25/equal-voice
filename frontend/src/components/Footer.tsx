import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-50 to-pink-100 border-t border-pink-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">EqualVoice</span>
            </Link>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Empowering communication through advanced text analysis. 
              Discover insights, improve clarity, and make every word count.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span>shrestasanya@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/analyzer" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Text Analyzer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/signin" className="text-gray-600 hover:text-pink-600 transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

        {/* Contact Info */}
<div>
  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
  <ul className="space-y-2">
    <li className="flex items-center space-x-2 text-gray-600">
      <Mail className="w-4 h-4" />
      <span>shrestasanya@gmail.com</span>
    </li>
    <li className="flex items-center space-x-2 text-gray-600">
      <MapPin className="w-4 h-4" />
      <span>Udupi, Karnataka</span>
    </li>
  </ul>
</div>

        </div>

        {/* Bottom Border */}
        <div className="border-t border-pink-200 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © 2025 EqualVoice. All rights reserved. Made with ❤️ for better communication.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;