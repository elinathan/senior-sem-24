"use client";

import { useRef, useEffect } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      cursorRef.current.style.left = mouseX + "px";
      cursorRef.current.style.top = mouseY + "px";
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div ref={cursorRef} id="cursor"></div>;
}
