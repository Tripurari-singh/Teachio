// import { FireworksBackground } from "@/components/ui/fireworks-background";

import { FireworksBackground } from "./ui/shadcn-io/fireworks-background";

export default function Celebration() {
  return (
    <div className="relative h-screen">
      <FireworksBackground
        population={3}
        color={["#ff0000", "#00ff00", "#0000ff", "#ffff00"]}
        fireworkSpeed={{min: 4, max: 8}}
        particleSize={{min: 2, max: 6}}
      />
      <div className="relative z-10 text-white p-8">
        <h1>Click anywhere to celebrate!</h1>
      </div>
    </div>
  );
}