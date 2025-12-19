import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MenuOverlay = ({ isMenuOpen, toggleMenu }) => {
  // 1. Ref for the Black Background Container (The Vehicle)
  const container = useRef();
  // 2. Ref for the Inner Content (The Cargo that distorts)
  const overlayContent = useRef();

  const navLinks = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Projects", link: "/projects" },
    { name: "Contact", link: "/contact" },
  ];

  const socialLinks = [
    { name: "GitHub", link: "https://github.com" },
    { name: "LinkedIn", link: "https://linkedin.com" },
    { name: "Twitter", link: "https://twitter.com" },
  ];

  useGSAP(() => {
    // --- INITIAL SETUP ---
    // 1. Container sits hidden ABOVE the screen
    gsap.set(container.current, { y: "-100%" });

    // 2. Content sits inside distored (Rotated, Zoomed, Faded)
    gsap.set(overlayContent.current, {
      y: 0,
      scale: 1.5,
      rotation: -15,
      opacity: 0.25,
      transformOrigin: "top center",
    });
  }, { scope: container }); // Scope to container for safety

  useGSAP(() => {
    if (isMenuOpen) {
      // --- OPEN ANIMATION ---
      
      // 1. Move Container Down (The curtain falls)
      gsap.to(container.current, {
        y: 0,
        duration: 1.25,
        ease: "power4.out",
      });

      // 2. Undistort the Content (It straightens out as it falls)
      gsap.to(overlayContent.current, {
        scale: 1,
        rotation: 0,
        opacity: 1,
        duration: 1.25,
        delay: -0.1, // Slight overlap for smoothness
        ease: "power4.out",
      });

    } else {
      // --- CLOSE ANIMATION ---
      
      // 1. Move Container Up (The curtain lifts)
      gsap.to(container.current, {
        y: "-100%",
        duration: 1,
        ease: "power4.in",
      });

      // 2. Distort the Content (It twists and fades as it goes up)
      gsap.to(overlayContent.current, {
        scale: 1.5,
        rotation: -15,
        opacity: 0.25,
        duration: 1,
        ease: "power4.in",
      });
    }
  }, [isMenuOpen]);

  return (
    // OUTER CONTAINER: Handles Background & Sliding (Y-Axis)
    <div
      ref={container}
      className="fixed top-0 left-0 w-full h-screen bg-[#121212] z-40 invisible overflow-hidden"
      style={{ visibility: "visible" }}
    >
      {/* INNER CONTENT: Handles Distortion (Scale/Rotate) */}
      <div 
        ref={overlayContent}
        className="w-full h-full flex justify-center relative"
      >
        <div className="flex justify-center w-full lg:w-5/6 h-full relative">
          
          {/* Left Side: Image (Hidden on Mobile) */}
          <div className="hidden lg:flex justify-center items-center w-1/2">
            <div className="w-1/2 h-1/2 flex items-center justify-center">
              <img src="/frame.svg" alt="" className="object-contain" />
            </div>
          </div>

          {/* Right Side: Links */}
          <div className="flex flex-col justify-center lg:items-center w-full lg:w-1/2 space-y-20 px-10 md:px-20 lg:px-0">
            {/* Nav Links */}
            <div className="w-full lg:w-1/3 h-fit text-4xl space-y-10 tracking-tighter font-light text-white">
              {navLinks.map((item, index) => (
                <div key={index} className="w-fit block">
                  <Link
                    to={item.link}
                    onClick={toggleMenu}
                    className="group relative inline-block hover:text-gray-300 transition-colors"
                  >
                    {item.name}
                    <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-white rounded-full transform transition-transform duration-500 ease-out origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="w-full lg:w-1/3 text-lg space-y-4">
              {socialLinks.map((item, index) => (
                <div key={index} className="w-fit text-[#8f8f8f]">
                  <Link
                    to={item.link}
                    target="_blank"
                    className="group relative inline-block hover:text-white"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-white transform transition-transform duration-300 ease-out origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuOverlay;