import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoComponent } from "../Logo";
import { BlackGradientButton } from "./BlackGradientButton";
import { useAuth } from "@/context/AuthContext";

export function HeaderComponent() {
  const [open, setOpen] = useState(false);
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <div className="flex items-center justify-center border-b border-zinc-800 bg-black sticky top-0 z-50">
      <div className="flex w-11/12 max-w-7xl p-4 items-center justify-between bg-gradient-to-r from-black via-neutral-700 to-black">

        <Link to="/"><LogoComponent /></Link>

        <div className="text-white flex flex-row gap-10">
          <Link to="/" className="relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
            Home
          </Link>

          <div className="relative">
            <div className="cursor-pointer select-none relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              onClick={() => setOpen(o => !o)}>
              Catalog ▾
            </div>
            {open && (
              <div className="absolute top-full left-0 mt-2 bg-neutral-900 rounded-2xl shadow-lg w-44 border border-neutral-700 z-50 p-1">
                <Link to="/courses?category=webdev" onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-2xl hover:bg-slate-800 text-sm">Web Development</Link>
                <Link to="/courses?category=python" onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-2xl hover:bg-slate-800 text-sm">Python</Link>
                <Link to="/courses?category=aiml" onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-2xl hover:bg-slate-800 text-sm">AI / ML</Link>
                <Link to="/courses" onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-2xl hover:bg-slate-800 text-sm text-sky-400">All Courses →</Link>
              </div>
            )}
          </div>

          <Link to="/about" className="relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all hover:after:w-full">
            About
          </Link>
          <Link to="/contact" className="relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all hover:after:w-full">
            Contact
          </Link>
        </div>

        <div className="text-white flex flex-row gap-5 items-center">
          {token && user ? (
            <>
              <Link to="/dashboard">
                <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-purple-600 flex items-center justify-center text-sm font-bold">
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                  <span className="text-sm text-slate-300">{user.firstName}</span>
                </div>
              </Link>
              <button onClick={handleLogout}
                className="px-5 py-2 text-sm border border-red-800/60 rounded-2xl hover:bg-red-900/30 transition-colors text-red-400">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"><BlackGradientButton Label="Login" /></Link>
              <Link to="/signup"><BlackGradientButton Label="Sign up" /></Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
