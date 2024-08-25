import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-white py-4 absolute bottom-0">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <p className="text-sm">
          © {new Date().getFullYear()} ReactApp. All rights reserved.
        </p>
        <nav className="flex space-x-4">
          <a
            href="/privacy"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Terms of Service
          </a>
          <a
            href="/contact"
            className="hover:text-blue-500 transition-colors duration-200"
          >
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
