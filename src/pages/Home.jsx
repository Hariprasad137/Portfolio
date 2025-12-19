import { useState } from "react";
import Navbar from "../components/Navbar";
import MenuOverlay from "../assets/MenuOverlay";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <MenuOverlay isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      
      <div className="w-full h-screen bg-black text-white pt-32 px-10">
        <h1 className="text-4xl">Welcome Home</h1>
      </div>
    </>
  );
};

export default Home;