"use client";

import React from "react";
import { motion } from "framer-motion";

export default function LoreSectionCyberNoir() {
  const lorePoints = [
    {
      title: "THE AWAKENING",
      text: "The $MATE Capybara rose when the gas fees were highest and the vibes were lowest.",
    },
    {
      title: "THE PHILOSOPHY",
      text: "$MATE is the only one that just wants to sit by the pool and watch the charts go green.",
    },
    {
      title: "THE UTILITY",
      text: "Beyond the memes lies a movement of ultimate chill. Our tools are built for the agents of the calm.",
    },
  ];

  return (
    <div className="border-t border-zinc-900 bg-[#050505] px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h3 className="mb-12 text-center font-mono text-sm font-bold uppercase tracking-[0.5em] text-orange-500">
          The $MATE Files
        </h3>
        <div className="grid gap-12">
          {lorePoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group flex gap-6"
            >
              <div className="font-black text-4xl text-zinc-800 group-hover:text-orange-500/20">0{i + 1}</div>
              <div>
                <h4 className="mb-2 font-black text-xl text-white">{point.title}</h4>
                <p className="font-mono text-sm text-zinc-500">{point.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
