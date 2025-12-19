const MenuButton = ({ isOpen, toggleMenu }) => {
  return (
    <button
      onClick={toggleMenu}
      className="group flex items-center gap-3 uppercase font-medium tracking-wider cursor-none"
    >
      <div className="relative h-6 overflow-hidden text-right">
        <div
          className={`flex flex-col transition-transform duration-1250 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isOpen ? "-translate-y-1/2" : "translate-y-0"
          }`}
        >
          <span className="h-6 flex items-center">Open</span>
          <span className="h-6 flex items-center">Close</span>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center w-6 h-3.5">
        <span
          className={`w-6 h-0.5 bg-white transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-center ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        
        <span
          className={`w-6 h-0.5 bg-white transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />

        <span
          className={`w-6 h-0.5 bg-white transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-center ${
            isOpen ? "-rotate-45 -translate-y-1.5]" : ""
          }`}
        />
      </div>
    </button>
  );
};

export default MenuButton;