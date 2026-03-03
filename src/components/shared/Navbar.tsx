import { LuBell, LuSearch } from "react-icons/lu";

const Navbar = () => {
  return (
    <header className="h-16 bg-main-black flex items-center justify-between px-6">
      <div className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2 w-72">
        <LuSearch size={16} className="text-white/40" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm outline-none w-full text-white placeholder:text-white/40"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
          <LuBell size={18} className="text-white/50" />
        </button>
        <div className="w-8 h-8 rounded-full bg-auth-green text-white flex items-center justify-center text-sm font-semibold">
          A
        </div>
      </div>
    </header>
  );
};

export default Navbar;
