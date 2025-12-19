const MenuButton = ({ isOpen, toggleMenu }) => {
  // 1. OPENING: 1.25s + Ease Out (Decelerate) - Matches menu dropping down
  const openTransition = "transition-all duration-[1250ms] ease-[cubic-bezier(0.25,1,0.5,1)]";
  
  // 2. CLOSING: 1.0s + Ease In (Accelerate) - Matches menu flying up
  const closeTransition = "transition-all duration-[1000ms] ease-[cubic-bezier(0.76,0,0.24,1)]";

  return (
    <button
      onClick={toggleMenu}
      className="group flex items-center gap-3 uppercase font-medium tracking-wider cursor-none"
    >
      <div className="relative h-6 overflow-hidden text-right">
        <div
          className={`flex flex-col ${isOpen ? openTransition : closeTransition} ${
            isOpen ? "-translate-y-1/2" : "translate-y-0"
          }`}
        >
          <span className="h-6 flex items-center">Open</span>
          <span className="h-6 flex items-center">Close</span>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center w-6 h-3.5">
        <span
          className={`w-6 h-0.5 bg-white origin-center ${isOpen ? openTransition : closeTransition} ${
            isOpen ? "rotate-45 translate-y-[6px]" : ""
          }`}
        />
        
        <span
          className={`w-6 h-0.5 bg-white ${isOpen ? openTransition : closeTransition} ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />

        <span
          className={`w-6 h-0.5 bg-white origin-center ${isOpen ? openTransition : closeTransition} ${
            isOpen ? "-rotate-45 -translate-y-[6px]" : ""
          }`}
        />
      </div>
    </button>
  );
};

export default MenuButton;