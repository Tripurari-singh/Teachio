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
    <div className="border rounded-2xl shadow-2xl shadow-slate-700 border-black/[1] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text={`${Title}`} />

      <h2 className="dark:text-white text-white mt-4 text-sm font-light">
        {Subtitle}
      </h2>
      <p className="text-sm border font-light dark:border-white/[0.2] border-white/[0.7] rounded-full mt-4 text-white dark:text-white px-2 py-1">
        {ButtonTitle}
      </p>
    </div>
  );
}
