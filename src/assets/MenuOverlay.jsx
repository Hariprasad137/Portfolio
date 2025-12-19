import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MenuOverlay = ({ isMenuOpen, toggleMenu }) => {
  const container = useRef();

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

  useGSAP(
    () => {
      gsap.set(container.current, {
        y: "-150%",
        rotation: -15,
        scale: 1.5,
        opacity: 0.25,
        transformOrigin: "top center",
      });
    },
    { scope: container }
  );

  useGSAP(() => {
    if (isMenuOpen) {
      gsap.to(container.current, {
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 1.25,
        ease: "power4.out",
      });
    } else {
      gsap.to(container.current, {
        y: "-150%",
        rotation: -15,
        scale: 1.5,
        opacity: 0.25,
        duration: 1,
        ease: "power4.in",
      });
    }
  }, [isMenuOpen]);

  return (
    <div
      ref={container}
      id="menu_container"
      className="fixed top-0 left-0 w-full h-screen bg-[#121212] text-white z-40 flex justify-center invisible"
      style={{ visibility: "visible" }}
    >
      <div className="flex justify-center w-full lg:w-5/6 h-full relative">
        <div className="hidden lg:flex justify-center items-center w-1/2">
          <div className="w-1/2 h-1/2 flex items-center justify-center">
            <img src="/frame.svg" alt="" className="object-contain" />
          </div>
        </div>
        <div className="flex flex-col justify-center lg:items-center w-full lg:w-1/2 space-y-20 px-10 md:px-20 lg:px-0">
          <div className="w-full lg:w-1/3 h-fit text-4xl space-y-10 tracking-tighter font-light">
            {navLinks.map((item, index) => (
              <div key={index} className="w-fit block">
                <Link
                  to={item.link}
                  onClick={toggleMenu}
                  className="group relative inline-block hover:text-gray-300 transition-colors"
                >
                  {item.name}
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-white rounded-full transform transition-transform duration-500 ease-out origin-right scale-x-0 group-hover:scale-x-100 group-hover:origin-left" />
                </Link>
              </div>
            ))}
          </div>
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
  );
};

export default MenuOverlay;
