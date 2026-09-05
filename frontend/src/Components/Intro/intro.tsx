import { useEffect, useState } from "react";
import "./intro.css";

interface IntroSplashProps {
  duration?: number;
  logoSrc?: string;
}

export default function IntroSplash({
  duration = 2400,
  logoSrc = "/images/intro_logo.png"
}: IntroSplashProps) {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => setHidden(true), duration);
    const removeTimer = setTimeout(() => setRemoved(true), duration + 500);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [duration]);

  if (removed) return null;

  return (
    <div className={`intro-overlay ${hidden ? "intro-hidden" : ""}`}>
      <div className="intro-glow" />
      <div className="intro-logo-wrap">
        <img src={logoSrc} alt="CR" className="intro-logo" />
        <div
          className="intro-shine"
          style={{ ["--intro-mask" as string]: `url(${logoSrc})` }}
        />
      </div>
    </div>
  );
}