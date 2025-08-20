import { NavLink } from 'react-router';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-2">
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              </div>
              <span className="text-2xl font-bold">Brand</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted marketplace for buying and selling quality products. 
              Connecting buyers and sellers with secure, reliable transactions.
            </p>
            <div className="flex space-x-4">
              <NavLink to="/facebook" className="text-gray-400 hover:text-indigo-400 transform hover:scale-110 transition-all duration-200">
                <Facebook size={20} />
              </NavLink>
              <NavLink to="/twitter" className="text-gray-400 hover:text-indigo-400 transform hover:scale-110 transition-all duration-200">
                <Twitter size={20} />
              </NavLink>
              <NavLink to="/instagram" className="text-gray-400 hover:text-indigo-400 transform hover:scale-110 transition-all duration-200">
                <Instagram size={20} />
              </NavLink>
              <NavLink to="/linkedin" className="text-gray-400 hover:text-indigo-400 transform hover:scale-110 transition-all duration-200">
                <Linkedin size={20} />
              </NavLink>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-3">
              <NavLink to="/" className={({ isActive }) => 
                `block text-sm transition-colors duration-200 ${
                  isActive ? 'text-indigo-400' : 'text-gray-300 hover:text-indigo-400'
                }`
              }>
                Home
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => 
                `block text-sm transition-colors duration-200 ${
                  isActive ? 'text-indigo-400' : 'text-gray-300 hover:text-indigo-400'
                }`
              }>
                About Us
              </NavLink>
              <NavLink to="/how-it-works" className={({ isActive }) => 
                `block text-sm transition-colors duration-200 ${
                  isActive ? 'text-indigo-400' : 'text-gray-300 hover:text-indigo-400'
                }`
              }>
                How It Works
              </NavLink>
              <NavLink to="/sell" className={({ isActive }) => 
                `block text-sm transition-colors duration-200 ${
                  isActive ? 'text-indigo-400' : 'text-gray-300 hover:text-indigo-400'
                }`
              }>
                Sell Products
              </NavLink>
              <NavLink to="/categories" className={({ isActive }) => 
                `block text-sm transition-colors duration-200 ${
                  isActive ? 'text-indigo-400' : 'text-gray-300 hover:text-indigo-400'
                }`
              }>
                Categories
              </NavLink>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Mail size={16} className="text-indigo-400 flex-shrink-0" />
                <span>support@brand.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-300">
                <Phone size={16} className="text-indigo-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-gray-300">
                <MapPin size={16} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>123 Market Street<br />San Francisco, CA 94103</span>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white mb-2">Stay Updated</h4>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright */}
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>© 2025 Brand. Made with</span>
              <Heart size={14} className="text-red-400 fill-current" />
              <span>All rights reserved.</span>
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6 text-sm">
              <NavLink to="/privacy" className={({ isActive }) => 
                `transition-colors duration-200 ${
                  isActive ? 'text-indigo-400' : 'text-gray-400 hover:text-indigo-400'
                }`
              }>
                Privacy Policy
              </NavLink>
              <NavLink to="/terms" className={({ isActive }) => 
                `transition-colors duration-200 ${
                  isActive ? 'text-indigo-400' : 'text-gray-400 hover:text-indigo-400'
                }`
              }>
                Terms of Service
              </NavLink>
              <NavLink to="/cookies" className={({ isActive }) => 
                `transition-colors duration-200 ${
                  isActive ? 'text-indigo-400' : 'text-gray-400 hover:text-indigo-400'
                }`
              }>
                Cookie Policy
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;