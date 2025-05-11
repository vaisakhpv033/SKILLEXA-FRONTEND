import React from "react";
import Link from "next/link";
import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold text-white">Skillexa</h3>
            <p className="mt-4 text-sm">
              Skillexa offers expert-led online courses in web development, cybersecurity, data science, cloud computing, and more. Practice with AI-driven mock interviews and get instant feedback to advance your career.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/courses" className="hover:text-primary transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="text-lg font-semibold text-white">Follow Us</h4>
            <div className="mt-4 flex space-x-4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Visit our Facebook page"
              >
                <FacebookIcon className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Visit our Twitter profile"
              >
                <TwitterIcon className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Visit our LinkedIn profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Visit our Instagram profile"
              >
                <InstagramIcon className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:info@skillexa.com"
                className="hover:text-primary transition-colors"
                aria-label="Send us an email"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Skillexa. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;