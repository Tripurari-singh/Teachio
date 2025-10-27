
export function LogoComponent(){
    return(
        <div>
           <div className="flex items-center gap-1 select-none bg-gradient-to-r from-black via-neutral-600 to-black shadow-2xl shadow-slate-300 rounded-2xl tracking-normal px-3 py-1">
                    {/* Capital Letter Icon */}
                    <div className="text-4xl font-extrabold bg-gradient-to-b from-white to-black text-transparent bg-clip-text ">
                        T
                    </div>

                    {/* Brand Name */}
                    <div className="text-2xl font-bold bg-gradient-to-b from-white to-neutral-400 text-transparent bg-clip-text">
                        eachio
                    </div>
            </div>
        </div>
    )
}