import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const TopHeader = () => {
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

          <div className="flex items-center gap-4">
            <Link
              to="/analysis"
              className="hidden sm:inline-flex items-center rounded-lg bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
            >
              View Analysis
            </Link>
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm hover:shadow"
            >
              List Property
            </Link>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
