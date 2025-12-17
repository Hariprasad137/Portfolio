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
      {/* Top Navigation Bar */}
      <div
        ref={navbarRef} 
        className="w-full flex justify-center border-b border-gray-300 fixed top-0 left-0 bg-white z-50"
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
      <div
        ref={containerRef} 
        id="nav_wrapper"
        className="fixed top-16 left-0 w-full h-screen z-40 flex justify-center bg-[#1a1a1a] text-white invisible"
      >
        <div
          id="nav_container"
          className="w-full md:w-2/3 h-full flex flex-row justify-center items-center px-4 md:px-0"
        >
          {/* Left Side: Image */}
          <div
            id="img_container"
            className="w-1/2 hidden xl:flex justify-center items-center mb-30"
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
            className="w-full xl:w-1/2 flex flex-row justify-center items-center mb-20 md:mb-30 xl:pr-30"
          >
            <div
              id="links_wrapper"
              className="flex flex-row items-center md:items-end w-full h-auto md:h-1/3 justify-center gap-8 md:gap-24"
            >
              {/* Main Navigation Links (Left Column) */}
              <div
                id="navlinks"
                className="w-1/2 flex flex-col justify-end items-end space-y-8 md:space-y-14 text-xl md:text-3xl text-right"
              >
                {navItems.map((item) => (
                  <Link key={item.name} to={item.href}>
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Social Links (Right Column) */}
              <div
                id="sociallinks"
                className="w-1/2 flex flex-col justify-end items-start space-y-4 text-base md:text-lg text-gray-400 text-left"
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