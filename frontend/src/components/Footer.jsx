import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, Twitter, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="glass-strong border-t border-dark-200/50 dark:border-dark-700/50 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-lg font-semibold text-gray-900 hidden sm:block">
              TechShop
            </span>
            </div>
            <p className="text-sm text-dark-500 dark:text-dark-400">
              Premium e-commerce experience with modern design and seamless shopping.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-dark-500 dark:text-dark-400">
              <li>
                <Link to="/products" className="hover:text-primary-600 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-dark-500 dark:text-dark-400">
              <li>
                <Link to="/faq" className="hover:text-primary-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-primary-600 transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-primary-600 transition-colors">
                  Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-2">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                href="#"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-dark-200 dark:border-dark-700 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-dark-500 dark:text-dark-400">
          <p>© {currentYear} Luxe Minimal. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-primary-600 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-600 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
