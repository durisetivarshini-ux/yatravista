import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { TripProvider } from "./context/TripContext";
import { PageLayout } from "./components/layout/PageLayout";

// Pages
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { DestinationDetails } from "./pages/DestinationDetails";
import { Stays } from "./pages/Stays";
import { StayDetails } from "./pages/StayDetails";
import { Experiences } from "./pages/Experiences";
import { TripPlanner } from "./pages/TripPlanner";
import { SavedTrips } from "./pages/SavedTrips";
import { About } from "./pages/About";
import { ProjectShowcase } from "./pages/ProjectShowcase";
import { NotFound } from "./pages/NotFound";

export function App() {
  return (
    <ThemeProvider>
      <TripProvider>
        <PageLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/destinations/:slug" element={<DestinationDetails />} />
            <Route path="/stays" element={<Stays />} />
            <Route path="/stays/:id" element={<StayDetails />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/planner" element={<TripPlanner />} />
            <Route path="/saved" element={<SavedTrips />} />
            <Route path="/showcase" element={<ProjectShowcase />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageLayout>
      </TripProvider>
    </ThemeProvider>
  );
}

export default App;
