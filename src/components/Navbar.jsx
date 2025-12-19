import { Link } from "react-router-dom";
import MenuButton from "../assets/MenuButton";

const Navbar1 = ({ toggleMenu, isMenuOpen }) => {
  return (
    <nav className="flex justify-center items-center fixed top-0 w-full py-6 bg-transparent z-50 text-white mix-blend-difference">
      <div className="flex justify-between items-center w-5/6">
        <div className="flex justify-center items-center text-2xl font-bold">
          <Link to="/">SilverCloud</Link>
        </div>
        <MenuButton isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>
    </nav>
  );
};

export default Navbar1;
