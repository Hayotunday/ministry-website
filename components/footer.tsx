"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Share2, Youtube } from "lucide-react";
import { toast } from "sonner";
import { getContactInfo, type ContactInfo } from "@/lib/contact";
import Image from "next/image";

export function Footer() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    getContactInfo().then((info) => {
      if (info.email || info.phone || info.address) {
        setContactInfo(info);
      }
    });
  }, []);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                loading="eager"
                src="/imgs/ekklisa-elite.jpeg"
                alt="Repairer of the Breach"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg">Ekklesia Elite</span>
                <span className="font-bold text-xs">
                  Repairer of the Breach
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Nurturing the next generation of Christian leaders and
              changemakers
            </p>
            <div className="flex gap-4 mt-4">
              <Link
                target="_blank"
                href="https://www.facebook.com/share/17y7nthgXz/"
                className="text-gray-400 hover:text-purple-400 bg-gray-800 hover:bg-gray-700 transition-colors flex items-center gap-2 p-2 rounded-full"
              >
                <Facebook size={20} />
              </Link>
              <Link
                target="_blank"
                href="https://www.instagram.com/bridgerepairernetwork?utm_source=qr&igsh=YWN4OWhlbGdjcmI="
                className="text-gray-400 hover:text-purple-400 bg-gray-800 hover:bg-gray-700 transition-colors flex items-center gap-2 p-2 rounded-full"
              >
                <Instagram size={20} />
              </Link>
              <Link
                target="_blank"
                href="https://youtube.com/@kingdommatters4us?si=Kx6I4S268xNX6Dz-"
                className="text-gray-400 hover:text-purple-400 bg-gray-800 hover:bg-gray-700 transition-colors flex items-center gap-2 p-2 rounded-full"
              >
                <Youtube size={20} />
              </Link>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.origin);
                  toast.success("Website link copied to clipboard!");
                }}
                className="text-gray-400 hover:text-purple-400 bg-gray-800 hover:bg-gray-700 transition-colors flex items-center gap-2 p-2 rounded-full"
              >
                <Share2 size={20} />
                <p>share</p>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-purple-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-purple-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/programs"
                  className="hover:text-purple-400 transition-colors"
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="hover:text-purple-400 transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-purple-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Connect</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: {contactInfo.email}</li>
              <li>Phone: {contactInfo.phone}</li>
              <li>Address: {contactInfo.address}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-400 text-sm text-center">
            © 2026 Repairer of the Breach. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
