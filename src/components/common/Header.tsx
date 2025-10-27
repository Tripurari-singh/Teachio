import { LogoComponent } from "../Logo";

export function HeaderComponent(){
    return(
        <div className="flex items-center justify-center  border-b-0 border-zinc-700 bg-black ">
          <div className="flex w-11/12 max-w-maxContent p-4 items-center justify-between  bg-gradient-to-r from-black via-neutral-700 to-black">
              {/* Logo Element */}
              <LogoComponent/>
              {/* NavBar Elements */}
              <div className="text-white flex flex-row gap-4">
                <div>Home</div>
                <div>catalog</div>
                <div>About us</div>
                <div>Contact us</div>
              </div>
              {/* Login and signup Buttons */}
              <div className="text-white flex flex-row gap-5">
                <button>Login</button>
                <button>Signup</button>
              </div>
          </div>
        </div>
    )
}


