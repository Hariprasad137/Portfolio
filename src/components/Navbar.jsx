import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

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

const HamburgerIcon = ({ isOpen }) => {
  return (
    <div className="flex flex-col justify-center items-center w-6 h-6 space-y-1 overflow-hidden group">
      <span
        className={`bg-current h-0.5 w-6 rounded transition-all duration-300 ease-in-out ${
          isOpen ? "rotate-45 translate-y-1.5" : ""
        }`}
      />
      <span
        className={`bg-current h-0.5 w-6 rounded transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-0 translate-x-full" : "opacity-100"
        }`}
      />
      <span
        className={`bg-current h-0.5 w-6 rounded transition-all duration-300 ease-in-out ${
          isOpen ? "-rotate-45 -translate-y-1.5" : ""
        }`}
      />
    </div>
  );
};

const MenuLink = ({ to, children }) => {
  return (
    <Link to={to} className="relative group inline-block py-1 overflow-hidden">
      <span className="text-gray-400 transition-colors duration-500 group-hover:text-white">
        {children}
      </span>
      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-white transform scale-x-0 transition-transform duration-700 ease-out origin-bottom-right group-hover:scale-x-100 group-hover:origin-bottom-left" />
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef(null);
  const navbarRef = useRef(null);
  const tl = useRef(null);

  const DARK_GREY = "#1a1a1a";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    let mm = gsap.matchMedia();
    
    let ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });

      mm.add("(min-width: 768px)", () => {
        gsap.set(containerRef.current, {
          transformOrigin: "top left",
          rotation: -100,
          yPercent: 0,
          xPercent: 0,
          autoAlpha: 1, 
          visibility: "hidden" 
        });

        tl.current
          .set(containerRef.current, { visibility: "visible" }) 
          .to([containerRef.current, navbarRef.current], {
            backgroundColor: DARK_GREY,
            color: "#ffffff",
            borderColor: DARK_GREY,
            rotation: 0, 
            duration: 0.8,
            ease: "power2.out",
          }, "<"); 
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(containerRef.current, {
          yPercent: -100, 
          rotation: 0,    
          visibility: "hidden"
        });

        tl.current
          .set(containerRef.current, { visibility: "visible" })
          .to([containerRef.current, navbarRef.current], {
            backgroundColor: DARK_GREY,
            color: "#ffffff",
            borderColor: DARK_GREY,
            yPercent: 0, 
            duration: 0.6,
            ease: "power2.out",
          }, "<");
      });

    });

    return () => ctx.revert(); 
  }, []);

  useEffect(() => {
    if (tl.current) {
      if (isMenuOpen) {
        tl.current.play();
      } else {
        tl.current.reverse();
      }
    }
  }, [isMenuOpen]);

  return (
    <div>
      <div
        ref={navbarRef} 
        className="w-full flex justify-center border-b border-gray-300 fixed top-0 left-0 bg-white z-50 text-black"
      >
        <nav className="flex justify-between items-center p-4 w-4/5 h-16">
          <div>
            <Link to="/" className="text-xl font-bold">
              SilverCloud
            </Link>
          </div>
          
          <button
            className="cursor-pointer focus:outline-none z-50 flex items-center gap-4 group"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <p className="text-sm font-medium tracking-wide uppercase">
              {isMenuOpen ? "Close" : "Menu"}
            </p>
            <HamburgerIcon isOpen={isMenuOpen} />
          </button>
        </nav>
      </div>

      <div
        ref={containerRef} 
        id="nav_wrapper"
        className="fixed top-16 left-0 w-full h-screen z-40 flex justify-center bg-[#1a1a1a] text-white invisible"
      >
        <div
          id="nav_container"
          className="w-full md:w-2/3 h-full flex flex-row justify-center items-center px-4 md:px-0"
        >
          <div
            id="img_container"
            className="w-1/2 hidden xl:flex justify-center items-center mb-30"
          >
            <img
              className="w-7/12 h-7/12 object-cover overflow-hidden"
              src="/frame.svg"
              alt="Menu Visual"
            />
          </div>

          <div
            id="navlink_container"
            className="w-full xl:w-1/2 flex flex-row justify-center items-center mb-20 md:mb-30 xl:pr-30"
          >
            <div
              id="links_wrapper"
              // FIXED: Removed 'items-center'. Changed to 'items-end' for ALL screens.
              // This ensures Social Links stay anchored to the bottom alongside Nav Links on mobile.
              className="flex flex-row items-end w-full h-auto md:h-1/3 justify-center gap-8 md:gap-24"
            >
              <div
                id="navlinks"
                className="w-1/2 flex flex-col justify-end items-end space-y-8 md:space-y-14 text-xl md:text-3xl text-right"
              >
                {navItems.map((item) => (
                  <MenuLink key={item.name} to={item.href}>
                    {item.name}
                  </MenuLink>
                ))}
              </div>

              <div
                id="sociallinks"
                className="w-1/2 flex flex-col justify-end items-start space-y-4 text-base md:text-lg text-left"
              >
                {socialLinks.map((link) => (
                  <MenuLink key={link.name} to={link.href}>
                    {link.name}
                  </MenuLink>
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