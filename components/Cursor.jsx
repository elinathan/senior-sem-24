"use client";
import { useRef, useState, useEffect } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const device = useDeviceDetection();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (device !== "Mobile" && device !== "Tablet") {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        cursorRef.current.style.left = mouseX + "px";
        cursorRef.current.style.top = mouseY + "px";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [device]);

  if (device === "Mobile" || device === "Tablet") {
    return null;
  }

  return <div ref={cursorRef} id="cursor"></div>;
}

const useDeviceDetection = () => {
  const [device, setDevice] = useState("");

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile =
        /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
      const isTablet =
        /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);

      if (isMobile) {
        setDevice("Mobile");
      } else if (isTablet) {
        setDevice("Tablet");
      } else {
        setDevice("Desktop");
      }
    };

    handleDeviceDetection();
    window.addEventListener("resize", handleDeviceDetection);

    return () => {
      window.removeEventListener("resize", handleDeviceDetection);
    };
  }, []);

  return device;
};
