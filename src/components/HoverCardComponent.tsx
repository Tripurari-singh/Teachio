import React from "react";
import { EvervaultCard , Icon } from "./ui/evervault-card";
// import { EvervaultCard, Icon } from "../ui/evervault-card";

interface CardPropsInterface {
    Title : string,
    Subtitle : string,
    ButtonTitle : string
}

export function EvervaultCardDemo({Title , Subtitle , ButtonTitle} : CardPropsInterface) {
  return (
    <div className="border shadow-2xl shadow-slate-700 border-black/[1] flex flex-col items-start max-w-sm mx-auto p-10 relative h-[30rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text={`${Title}`} />

      <h2 className="dark:text-white text-white mt-4 text-sm font-light">
        {Subtitle}
      </h2>
      <p className="text-sm border font-light dark:border-white/[0.2] border-white/[1] rounded-full mt-4 text-white dark:text-white p-2">
        {ButtonTitle}
      </p>
    </div>
  );
}
