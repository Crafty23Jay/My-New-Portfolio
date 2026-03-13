import { useEffect, useRef } from "react";
// eslint-disable-next-line @typescript-eslint/no-var-requires
// @ts-ignore
import TubesCursorLib from "threejs-components/build/cursors/tubes1.min.js";

const TubesCursorAny = TubesCursorLib as any;

import "./TubesCursor.css";

export default function TubesCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const appRef = useRef<any>(null);

  const randomColors = (count: number): string[] => {
    return new Array(count).fill(0).map(() => {
      return (
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
      );
    });
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const isMobile = window.innerWidth < 768;

    appRef.current = TubesCursorAny(canvasRef.current, {
      speed: isMobile ? 0.6 : 1,
      density: isMobile ? 0.6 : 1,
      tubes: {
        colors: ["#ff00ff", "#00ff9f", "#6c5ce7"],
        lights: {
          intensity: isMobile ? 120 : 200,
          colors: ["#ff008a", "#00ffe1", "#ffd000", "#60aed5"]
        }
      }
    });

    const handleInteraction = () => {
      if (!appRef.current) return;

      const colors = randomColors(3);
      const lights = randomColors(4);

      appRef.current.tubes.setColors(colors);
      appRef.current.tubes.setLightsColors(lights);
    };

    const section = sectionRef.current;
    const canvas = canvasRef.current;

    // listen on BOTH so nothing blocks the click
    section?.addEventListener("pointerdown", handleInteraction);
    canvas?.addEventListener("pointerdown", handleInteraction);

    const resize = () => {
      appRef.current?.resize?.();
    };

    window.addEventListener("resize", resize);

    return () => {
      section?.removeEventListener("pointerdown", handleInteraction);
      canvas?.removeEventListener("pointerdown", handleInteraction);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="tubes-hero">
      <canvas ref={canvasRef} className="tubes-canvas" />

      <div className="tubes-content">
        <h1 className="tubes-title">Pro Builder</h1>
        <h2 className="tubes-subtitle">Let's make some MagiK!</h2>

        <a
          href="#contact"
          className="tubes-link"
        >
          Reach Us Now!
        </a>
      </div>
    </section>
  );
}