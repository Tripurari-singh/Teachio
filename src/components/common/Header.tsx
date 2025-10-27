



import { useState } from "react";
import { LogoComponent } from "../Logo";
import { BlackGradientButton } from "./BlackGradientButton";

export function HeaderComponent() {

  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center border-b-0 border-zinc-700 bg-black ">
      <div className="flex w-11/12 max-w-maxContent p-4 items-center justify-between bg-gradient-to-r from-black via-neutral-700 to-black">

        {/* Logo Element */}
        <LogoComponent />

        {/* NavBar Elements */}
        <div className="text-white flex flex-row gap-10">

          <div className="relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:after:w-full">
            Home
          </div>

          {/* Catalog Component with Dropdown */}
          <div className="relative">
            <div
              className="cursor-pointer select-none relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-white after:transition-all hover:after:w-full"
              onClick={() => { setOpen((open) => !open) }}
            >
              catalog ▾
            </div>

            {open && (
              <div className="absolute top-full left-0 mt-2 bg-neutral-900 rounded-2xl shadow-lg w-40 border border-neutral-700 z-50 p-1">
                <div className="block px-2 py-2 rounded-2xl hover:bg-slate-800">web Development</div>
                <div className="block px-2 py-2 rounded-2xl hover:bg-slate-800">Python</div>
              </div>
            )}
          </div>

          <div className="relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all hover:after:w-full">
            About us
          </div>

          <div className="relative after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-amber-400 after:transition-all hover:after:w-full">
            Contact us
          </div>
        </div>

        {/* Login and signup Buttons */}
        <div className="text-white flex flex-row gap-5">
            <BlackGradientButton Label={"Login"} />
            <BlackGradientButton Label={"Sign up"} />
        </div>
      </div>
    </div>
  );
}
