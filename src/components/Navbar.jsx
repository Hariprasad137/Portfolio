import { Link } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "GitHub", href: "" },
  { name: "LinkedIn", href: "" },
  { name: "Instagram", href: "" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Top Navigation Bar */}
      <div
        className={`w-full flex justify-center border-b fixed top-0 left-0 z-50 transition-colors duration-300 ${
          isMenuOpen
            ? "bg-black text-white border-black"
            : "bg-white text-black border-gray-300"
        }`}
      >
        <nav className="flex justify-between items-center p-4 w-4/5 h-16">
          <div>
            <Link to="/" className="text-xl">
              SilverCloud
            </Link>
          </div>
          <button
            className="cursor-pointer focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <p>Close</p> : <p>Menu</p>}
          </button>
        </nav>
      </div>

      {/* Full Screen Menu Overlay */}
      {/* UPDATE: Removed "{isMenuOpen && (..)}" wrapper. 
          Added transition classes to sync with navbar. */}
      <div
        id="nav_wrapper"
        className={`fixed top-16 left-0 w-full h-screen z-40 flex justify-center bg-black text-white transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 visible" // Show when open
            : "opacity-0 invisible pointer-events-none" // Hide when closed
        }`}
      >
        <div
          id="nav_container"
          className="w-full md:w-2/3 h-full flex flex-row justify-center items-center px-4 md:px-0"
        >
          {/* Left Side: Image (Hidden on Mobile) */}
          <div
            id="img_container"
            className="w-1/2 hidden md:flex justify-center items-center mb-30"
          >
            <img
              className="w-7/12 h-7/12 object-cover overflow-hidden"
              src="/kiss.jpg"
              alt="Menu Visual"
            />
          </div>

          {/* Right Side: Links Wrapper */}
          <div
            id="navlink_container"
            className="w-full md:w-1/2 flex flex-row justify-center items-center mb-20 md:mb-30 md:pr-30"
          >
            <div
              id="links_wrapper"
              className="flex flex-row items-end w-full h-auto md:h-1/3 justify-around md:justify-between"
            >
              {/* Main Navigation Links */}
              <div
                id="navlinks"
                className="w-1/2 flex flex-col justify-end items-center md:items-center space-y-10 md:space-y-14 text-xl md:text-3xl"
              >
                {navItems.map((item) => (
                  <Link key={item.name} to={item.href}>
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Social Links */}
              <div
                id="sociallinks"
                className="w-1/2 flex flex-col justify-end items-center md:items-start space-y-4 text-base md:text-lg text-gray-400"
              >
                {socialLinks.map((link) => (
                  <Link key={link.name} to={link.href}>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;