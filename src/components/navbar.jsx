import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (name) => {
    setActive(name);
    setIsOpen(false); // close menu on mobile
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-white/10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center h-[70px]">
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-bold text-gray-800 tracking-tight hover:text-indigo-500 transition"
        >
          Brand
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
            <li key={item}>
              <a
                href="#"
                onClick={() => handleLinkClick(item)}
                className={`px-4 py-2 rounded-md font-medium text-sm transition ${
                  active === item
                    ? "text-indigo-500 bg-indigo-500/10"
                    : "text-gray-700 hover:text-indigo-500 hover:bg-indigo-500/10"
                }`}
              >
                {item}
              </a>
            </li>
          ))}

          <li>
            <a
              href="#"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-md font-semibold text-sm shadow-md transition hover:translate-y-[-2px] hover:shadow-lg"
            >
              Get Started
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl text-gray-700 focus:outline-none"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`md:hidden flex flex-col gap-2 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-white/10 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5 invisible"
        }`}
      >
        {["Home", "About", "Services", "Portfolio", "Contact"].map((item) => (
          <li key={item}>
            <a
              href="#"
              onClick={() => handleLinkClick(item)}
              className={`block px-4 py-2 rounded-md font-medium text-sm text-center transition ${
                active === item
                  ? "text-indigo-500 bg-indigo-500/10"
                  : "text-gray-700 hover:text-indigo-500 hover:bg-indigo-500/10"
              }`}
            >
              {item}
            </a>
          </li>
        ))}

        <li>
          <a
            href="#"
            className="block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-md font-semibold text-sm shadow-md text-center"
          >
            Get Started
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
