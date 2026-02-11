"use client";

import { useId } from "react";

type ChaosSliderProps = {
  value: number;
  onChange: (v: number) => void;
  label?: string;
};

export default function ChaosSlider({ value, onChange, label = "Chaos" }: ChaosSliderProps) {
  const id = useId();
  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between font-pixel text-[10px] text-zinc-400">
        <label htmlFor={id}>{label}</label>
        <span className="text-cyan-400">{value}%</span>
      </div>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="chaos-track h-2 w-full appearance-none rounded-full [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:shadow-[0_0_12px_rgba(34,211,238,0.4)]"
      />
    </div>
  );
}
