import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { TripProvider } from "./context/TripContext";
import { AuthProvider } from "./context/AuthContext";
import { PageLayout } from "./components/layout/PageLayout";
import { AuthModal } from "./components/auth/AuthModal";
import { DemoRoleSwitcher } from "./components/ui/DemoRoleSwitcher";

// Pages
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { DestinationDetails } from "./pages/DestinationDetails";
import { Stays } from "./pages/Stays";
import { StayDetails } from "./pages/StayDetails";
import { Experiences } from "./pages/Experiences";
import { ExperienceDetails } from "./pages/ExperienceDetails";
import { TripPlanner } from "./pages/TripPlanner";
import { SavedTrips } from "./pages/SavedTrips";
import { MyBookings } from "./pages/MyBookings";
import { ProviderDashboard } from "./pages/ProviderDashboard";
import { ProviderProfile } from "./pages/ProviderProfile";
import { AdminDashboard } from "./pages/AdminDashboard";
import { About } from "./pages/About";
import { ProjectShowcase } from "./pages/ProjectShowcase";
import { NotFound } from "./pages/NotFound";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Temples from "./pages/Temples";
import BrowseStates from "./pages/BrowseStates";
import Nearby from "./pages/Nearby";

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TripProvider>
          <PageLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/temples" element={<Temples />} />
              <Route path="/states" element={<BrowseStates />} />
              <Route path="/nearby" element={<Nearby />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/destinations/:slug" element={<DestinationDetails />} />
              <Route path="/stays" element={<Stays />} />
              <Route path="/stays/:id" element={<StayDetails />} />
              <Route path="/experiences" element={<Experiences />} />
              <Route path="/experiences/:id" element={<ExperienceDetails />} />
              <Route path="/planner" element={<TripPlanner />} />
              <Route path="/saved" element={<SavedTrips />} />
              <Route path="/bookings" element={<MyBookings />} />
              <Route path="/providers/:id" element={<ProviderProfile />} />
              <Route path="/provider/dashboard" element={<ProviderDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/showcase" element={<ProjectShowcase />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageLayout>
          
          {/* Global Auth Modal & Demo Role Switcher Bar */}
          <AuthModal />
          <DemoRoleSwitcher />
        </TripProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
