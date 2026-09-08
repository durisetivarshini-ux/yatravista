import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageLayout({ children, title }) {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (title) {
      document.title = `${title} | YatraVista — Discover India`;
    } else {
      document.title = "YatraVista — Discover India | Curated Stays & Smart Trip Planner";
    }
  }, [title]);

  return (
    <div className="flex flex-col min-h-screen bg-theme-bg text-theme-text transition-colors duration-300 selection:bg-theme-accent/20">
      <Navbar />
      <main className="flex-1 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
