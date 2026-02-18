'use client';

import Link from 'next/link';
import { Facebook, Mail, Share2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-sm font-bold">
                A
              </div>
              <span className="font-bold text-lg">Repairer of the Breach</span>
            </div>
            <p className="text-gray-400 text-sm">
              Nurturing the next generation of Christian leaders and changemakers
            </p>
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Mail size={20} />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Share2 size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-blue-400 transition-colors">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-blue-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Connect</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: info@repairerofthebreach.org</li>
              <li>Phone: +234 (0) 123 456 7890</li>
              <li>Lagos, Nigeria</li>
              <li className="pt-2">
                <Link href="/privacy" className="hover:text-blue-400 transition-colors text-xs">
                  Privacy Policy
                </Link>
                {' • '}
                <Link href="/terms" className="hover:text-blue-400 transition-colors text-xs">
                  Terms of Service
                </Link>
                {' • '}
                <Link href="#" className="hover:text-blue-400 transition-colors text-xs">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            © 2024 Repairer of the Breach. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
