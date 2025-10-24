"use client";

import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-black dark:bg-black dark:bg-grid-slate/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normal"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "This course completely changed the way I understand web development. The concepts were explained slowly and clearly, and the projects made sure I actually learned by doing instead of just watching. Easily the best course I have taken so far.",
    name: "Rahul Mehta",
    title: "Full-Stack Development Course",
  },
  {
    quote:
      "I had zero background in DevOps before this. The instructor teaches from absolute basics to industry tools like Docker and Kubernetes in a very practical way. The assignments and doubt support are top notch.",
    name: "Sneha Sharma",
    title: "DevOps & Cloud Bootcamp",
  },
  {
    quote:
      "I joined this to prepare for interviews and within 2 months I could solve problems that used to scare me. The explanations are detailed and the mock interviews helped me overcome nervousness.",
    name: "Aditya Verma",
    title: "DSA Interview Preparation",
  },
  {
    quote:
      "Blockchain always seemed too complex but the instructor breaks it down into simple language with clear code examples. The smart contract projects made me confident to build my own dApps.",
    name: "Priya Nair",
    title: "Blockchain Developer Track",
  },
  {
    quote:
      "As someone trying to switch careers, this course gave me the structure and confidence I needed. The resume and portfolio guidance alone was worth the price. Highly recommended for serious learners.",
    name: "Kunal Patil",
    title: "Career Switcher Program",
  },
];
