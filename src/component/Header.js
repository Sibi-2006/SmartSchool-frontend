import React, { useContext, useState } from "react";
import { GlobalVariableContext } from "../Context/GlobalVariable";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // 🪶 using lucide-react for icons
import pfp from "../image/profile.webp";

export default function Header() {
  const { appName } = useContext(GlobalVariableContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-primary text-white shadow-md z-50">
      <header className="flex justify-between items-center py-3 px-6">
        {/* App Name */}
        <h1 className="font-bold text-2xl tracking-wide">{appName}</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-row gap-6 text-lg font-medium">
          <Link to="/about" className="hover:text-accent transition-colors duration-200">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-accent transition-colors duration-200">
            Contact Us
          </Link>
        </nav>

        {/* Profile + Hamburger */}
        <div className="flex items-center gap-4">
          <img
            className="h-10 w-10 rounded-full border-2 border-accent cursor-pointer hover:scale-105 transition-transform duration-200"
            src={pfp}
            alt="Profile"
          />
          {/* Hamburger Icon (only for mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-primary border-t border-accent">
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="py-3 px-6 hover:bg-secondary hover:text-white transition-all duration-200"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="py-3 px-6 hover:bg-secondary hover:text-white transition-all duration-200"
          >
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
}
