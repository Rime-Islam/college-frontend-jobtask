import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  return (
    <footer className="bg-[#1a2332] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Campus Connect</h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Your gateway to discovering the perfect college experience. Schedule campus tours, virtual visits, and
              connect with admissions representatives.
            </p>
            <div className="flex gap-4">
              <Link to="#" className="text-gray-300 transition-colors hover:text-white" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-300 transition-colors hover:text-white" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-300 transition-colors hover:text-white" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link to="#" className="text-gray-300 transition-colors hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-300 transition-colors hover:text-white">
                  Campus Tours
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 transition-colors hover:text-white">
                  Virtual Visits
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 transition-colors hover:text-white">
                  Find Colleges
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 transition-colors hover:text-white">
                  Events Calendar
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 transition-colors hover:text-white">
                  Student Life
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="text-gray-300 transition-colors hover:text-white">
                  Admissions Guide
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 transition-colors hover:text-white">
                  Financial Aid
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 transition-colors hover:text-white">
                  Application Tips
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 transition-colors hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-300 transition-colors hover:text-white">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-300" />
                <span className="text-gray-300">
                  123 Education Lane
                  <br />
                  Boston, MA 02115
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gray-300" />
                <Link href="tel:+18005551234" className="text-gray-300 transition-colors hover:text-white">
                  +1 (800) 555-1234
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gray-300" />
                <Link href="mailto:info@campusconnect.edu" className="text-gray-300 transition-colors hover:text-white">
                  info@campusconnect.edu
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex col items-center justify-between gap-4 text-sm text-gray-400 sm:row">
            <p>&copy; {new Date().getFullYear()} Campus Connect. All rights reserved.</p>
            <div className="flex wrap gap-6">
              <Link to="#" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <Link to="#" className="transition-colors hover:text-white">
                Terms of Service
              </Link>
              <Link to="#" className="transition-colors hover:text-white">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
