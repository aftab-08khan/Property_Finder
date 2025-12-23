import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const TopHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="ml-2 text-xl font-bold text-emerald-600">
                Propert<span className="text-gray-800">Finderr</span>
              </span>
            </div>
          </Link>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/analysis"
              className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
            >
              View Analysis
            </Link>

            <Link
              to="/contact"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 shadow-sm"
            >
              List Property
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? (
              <X className="h-5 w-5 text-gray-600" />
            ) : (
              <Menu className="h-5 w-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2 pb-4">
            <Link
              to="/analysis"
              onClick={() => setIsOpen(false)}
              className="block w-full rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-100"
            >
              View Analysis
            </Link>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              List Property
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default TopHeader;

