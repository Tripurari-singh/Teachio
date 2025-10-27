// import { LogoComponent } from "../Logo";

// export function HeaderComponent(){
//     return(
//         <div className="flex items-center justify-center  border-b-0 border-zinc-700 bg-black ">
//           <div className="flex w-11/12 max-w-maxContent p-4 items-center justify-between  bg-gradient-to-r from-black via-neutral-700 to-black">
//               {/* Logo Element */}
//               <LogoComponent/>
//               {/* NavBar Elements */}
//               <div className="text-white flex flex-row gap-4">
//                 <div>Home</div>
//                 <div>catalog</div>
//                 <div>About us</div>
//                 <div>Contact us</div>
//               </div>
//               {/* Login and signup Buttons */}
//               <div className="text-white flex flex-row gap-5">
//                 <button>Login</button>
//                 <button>Signup</button>
//               </div>
//           </div>
//         </div>
//     )
// }


import { useState } from "react";
import { LogoComponent } from "../Logo";

export function HeaderComponent() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center border-b-0 border-zinc-700 bg-black">
      <div className="flex w-11/12 max-w-maxContent p-4 items-center justify-between bg-gradient-to-r from-black via-neutral-700 to-black">
        
        <LogoComponent />

        {/* NavBar Elements */}
        <div className="text-white flex flex-row gap-6 relative">
          <div>Home</div>

          {/* ───── Catalog with Dropdown ───── */}
          <div className="relative">
            <div
              className="cursor-pointer select-none"
              onClick={() => setOpen((v) => !v)}
            >
              Catalog ▾
            </div>

            {open && (
              <div className="absolute top-full left-0 mt-2 bg-neutral-900 rounded-lg shadow-lg w-40 border border-neutral-700 z-50">
                <a href="#" className="block px-4 py-2 hover:bg-neutral-800">Web Development</a>
                <a href="#" className="block px-4 py-2 hover:bg-neutral-800">App Development</a>
                <a href="#" className="block px-4 py-2 hover:bg-neutral-800">UI / UX Design</a>
              </div>
            )}
          </div>
          {/* ─────────────────────────────── */}

          <div>About us</div>
          <div>Contact us</div>
        </div>

        {/* Login & Signup Buttons */}
        <div className="text-white flex flex-row gap-5">
          <button>Login</button>
          <button>Signup</button>
        </div>

      </div>
    </div>
  );
}
