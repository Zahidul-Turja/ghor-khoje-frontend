import React from "react";
import { Github, Linkedin, Globe } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full bg-gray-800 py-4 text-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 py-8 sm:py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {/* Brand Section */}
          <div className="text-center md:text-left lg:col-span-1">
            <h1 className="mb-4 text-xl font-extrabold uppercase text-primary sm:text-2xl lg:mb-0">
              Ghor Khoje
            </h1>
          </div>

          {/* Services Section */}
          <div className="text-center md:text-left">
            <h2 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg">
              Services
            </h2>
            <ul className="space-y-1 text-sm sm:space-y-2 sm:text-base">
              <li className="cursor-pointer transition-colors hover:text-primary">
                Buy
              </li>
              <li className="cursor-pointer transition-colors hover:text-primary">
                Rent
              </li>
              <li className="cursor-pointer transition-colors hover:text-primary">
                Sell
              </li>
            </ul>
          </div>

          {/* Navigation Section */}
          <div className="text-center md:text-left">
            <h2 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg">
              Navigation
            </h2>
            <ul className="space-y-1 text-sm sm:space-y-2 sm:text-base">
              <li className="cursor-pointer transition-colors hover:text-primary">
                Places
              </li>
              <li className="cursor-pointer transition-colors hover:text-primary">
                About us
              </li>
              <li className="cursor-pointer transition-colors hover:text-primary">
                Contact
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h2 className="mb-3 text-base font-bold sm:mb-4 sm:text-lg">
              Contact us
            </h2>
            <ul className="space-y-1 text-sm sm:space-y-2 sm:text-base">
              <li className="break-words">Aftabnagar, Dhaka, Bangladesh</li>
              <li>
                <a
                  href="tel:+8801748052301"
                  className="transition-colors hover:text-primary"
                >
                  +880 1748052301
                </a>
              </li>
              <li>
                <a
                  href="mailto:zahidulturja@gmail.com"
                  className="break-all transition-colors hover:text-primary"
                >
                  zahidulturja@gmail.com
                </a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="mt-4 flex items-center justify-center gap-4 md:justify-start">
              <a
                href="https://github.com/Zahidul-Turja"
                target="_blank"
                rel="noopener noreferrer"
                className="transform text-gray-100 transition-colors hover:scale-110 hover:text-primary"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/zahidul-turja/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform text-gray-100 transition-colors hover:scale-110 hover:text-primary"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://zahidul-turja.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="transform text-gray-100 transition-colors hover:scale-110 hover:text-primary"
                aria-label="Personal Website"
              >
                <Globe size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 pt-4 sm:pt-6">
          <p className="text-center text-xs font-light sm:text-sm">
            Copyright &copy; 2025{" "}
            <span className="font-bold text-primary">Ghor Khoje</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
