import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const TopHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-emerald-600">
              Propert<span className="text-gray-900">Finderr</span>
            </span>
          </Link>

          
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition"
            >
              List Property
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
