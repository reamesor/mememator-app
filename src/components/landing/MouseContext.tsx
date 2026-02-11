"use client";

import { createContext, useContext, useState, useRef, useEffect } from "react";

export type MouseState = { mx: number; my: number }; // -1 to 1

const MouseContext = createContext<MouseState>({ mx: 0, my: 0 });

export function useMouse() {
  return useContext(MouseContext);
}

export function MouseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<MouseState>({ mx: 0, my: 0 });
  const rafRef = useRef<number | null>(null);
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      posRef.current = {
        x: (e.clientX / w) * 2 - 1,
        y: -((e.clientY / h) * 2 - 1),
      };
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          setState({ mx: posRef.current.x, my: posRef.current.y });
        });
      }
    };
    const handleLeave = () => setState({ mx: 0, my: 0 });
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <MouseContext.Provider value={state}>{children}</MouseContext.Provider>;
}
