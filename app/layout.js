import './globals.css'
import Header from '../components/Header'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export const metadata = {
  title: 'PlEstate - Find Your Perfect Home',
  description: 'Discover exceptional properties in prime locations. Professional real estate services to help you find your dream home.',
  keywords: 'real estate, property, houses for sale, apartments for rent, luxury homes, UK property',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-neutral-900 text-white">
          {/* Main Footer Content */}
          <div className="container-custom py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {/* Company Info */}
              <div>
                <h3 className="text-2xl font-display font-bold mb-6">PlEstate</h3>
                <p className="text-neutral-400 mb-6">
                  Your trusted partner in finding the perfect property. We make your real estate journey seamless and successful.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="/" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/properties?status=sale" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                      Buy Property
                    </a>
                  </li>
                  <li>
                    <a href="/properties?status=rent" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                      Rent Property
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Property Types */}
              <div>
                <h4 className="font-bold text-lg mb-6">Property Types</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="/properties?type=house" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                      Houses
                    </a>
                  </li>
                  <li>
                    <a href="/properties?type=apartment" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                      Apartments
                    </a>
                  </li>
                  <li>
                    <a href="/properties?type=condo" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                      Condos
                    </a>
                  </li>
                  <li>
                    <a href="/properties?type=townhouse" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                      Townhouses
                    </a>
                  </li>
                  <li>
                    <a href="/properties?type=land" className="text-neutral-400 hover:text-white transition-colors flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></span>
                      Land
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="font-bold text-lg mb-6">Contact Us</h4>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-3 text-neutral-400">
                    <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>PlEstate, London, United Kingdom</span>
                  </li>
                  <li className="flex items-start space-x-3 text-neutral-400">
                    <Phone className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>+44 20 1234 5678</span>
                  </li>
                  <li className="flex items-start space-x-3 text-neutral-400">
                    <Mail className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>info@plestate.com</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-neutral-800">
            <div className="container-custom py-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-neutral-400 text-sm">
                  &copy; {new Date().getFullYear()} PlEstate. All rights reserved.
                </p>
                <div className="flex space-x-6 text-sm">
                  <a href="/privacy" className="text-neutral-400 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                  <a href="/terms" className="text-neutral-400 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                  <a href="/cookies" className="text-neutral-400 hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}