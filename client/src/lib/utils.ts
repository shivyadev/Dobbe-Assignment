import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomTailwind500Color() {
  const tailwind500Colors = [
    "#3b82f6", // blue-500
    "#10b981", // emerald-500
    "#f59e0b", // amber-500
    "#ef4444", // red-500
    "#8b5cf6", // violet-500
    "#ec4899", // pink-500
    "#22c55e", // green-500
    "#14b8a6", // teal-500
    "#0ea5e9", // sky-500
    "#eab308", // yellow-500
    "#6366f1", // indigo-500
    "#f97316", // orange-500
    "#a855f7", // purple-500
    "#06b6d4", // cyan-500
    "#84cc16", // lime-500
  ];

  const color =
    tailwind500Colors[Math.floor(Math.random() * tailwind500Colors.length)];

  return color;
}

export function firstWordUpper(str: string | undefined): string {
  const words = str!.split(" ");

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );

  return capitalizedWords.join(" ");
}
