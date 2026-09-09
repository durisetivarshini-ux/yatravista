import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("yatravista_token") || null);
  const [providerProfile, setProviderProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Auth modal global trigger
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login"); // "login" | "register"

  // Check existing session on boot
  useEffect(() => {
    async function loadUser() {
      if (!token) {
        // Auto-seed default traveller session if completely blank for seamless Hackathon demo
        try {
          const res = await api.demoLogin("traveller");
          if (res?.token && res?.user) {
            localStorage.setItem("yatravista_token", res.token);
            setToken(res.token);
            setUser(res.user);
            setProviderProfile(res.providerProfile || null);
          }
        } catch {
          // If server not yet running or offline, set a demo local user fallback
          setUser({
            id: "usr-traveller-01",
            name: "Aarav Sharma",
            email: "traveller@yatravista.demo",
            role: "traveller",
            avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
          });
        }
        setLoading(false);
        return;
      }

      try {
        const res = await api.getMe();
        setUser(res.user);
        setProviderProfile(res.providerProfile);
      } catch (err) {
        console.warn("Session expired or server unavailable, reverting to demo traveller:", err);
        // Fallback demo user
        setUser({
          id: "usr-traveller-01",
          name: "Aarav Sharma",
          email: "traveller@yatravista.demo",
          role: "traveller",
          avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
        });
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    localStorage.setItem("yatravista_token", res.token);
    setToken(res.token);
    setUser(res.user);
    setProviderProfile(res.providerProfile);
    setAuthModalOpen(false);
    return res;
  };

  const register = async (userData) => {
    const res = await api.register(userData);
    localStorage.setItem("yatravista_token", res.token);
    setToken(res.token);
    setUser(res.user);
    setProviderProfile(res.providerProfile || null);
    setAuthModalOpen(false);
    return res;
  };

  const switchDemoRole = async (targetRole) => {
    try {
      const res = await api.demoLogin(targetRole);
      localStorage.setItem("yatravista_token", res.token);
      setToken(res.token);
      setUser(res.user);
      setProviderProfile(res.providerProfile || null);
      setAuthModalOpen(false);
      return res;
    } catch (err) {
      console.error(`Failed to switch demo role to ${targetRole}:`, err);
      // Fallback local switch
      const fallbackUsers = {
        traveller: {
          id: "usr-traveller-01",
          name: "Aarav Sharma",
          email: "traveller@yatravista.demo",
          role: "traveller",
          avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
        },
        provider: {
          id: "usr-provider-01",
          name: "Rajendra Singh Rathore",
          email: "provider@yatravista.demo",
          role: "provider",
          avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
        },
        admin: {
          id: "usr-admin-01",
          name: "Platform Administrator",
          email: "admin@yatravista.demo",
          role: "admin",
          avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
        }
      };
      setUser(fallbackUsers[targetRole] || fallbackUsers.traveller);
      setAuthModalOpen(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("yatravista_token");
    setToken(null);
    setUser(null);
    setProviderProfile(null);
  };

  const openAuthModal = (tab = "login") => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || "traveller",
        token,
        isAuthenticated: !!user,
        providerProfile,
        loading,
        login,
        register,
        switchDemoRole,
        logout,
        authModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        setAuthModalTab
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
