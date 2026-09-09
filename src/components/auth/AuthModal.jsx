import React, { useState } from "react";
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Building, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  X,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

export function AuthModal() {
  const { 
    authModalOpen, 
    closeAuthModal, 
    authModalTab, 
    setAuthModalTab, 
    login, 
    register, 
    switchDemoRole 
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("traveller"); // "traveller" | "provider"
  const [businessName, setBusinessName] = useState("");
  const [tagline, setTagline] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({
        name,
        email,
        password,
        phone,
        role,
        businessName: role === "provider" ? businessName : undefined,
        tagline: role === "provider" ? tagline : undefined
      });
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={authModalOpen}
      onClose={closeAuthModal}
      title={authModalTab === "login" ? "Welcome Back to YatraVista" : "Join YatraVista"}
      maxWidth="max-w-md"
    >
      <div className="space-y-6">
        
        {/* Fast 1-Click Demo Accounts Switcher */}
        <div className="p-3.5 rounded-xl bg-theme-bg/80 border border-theme-border">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-theme-primary mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-theme-accent" />
            <span>Fast Demo Sign-in (1-Click Switch)</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => switchDemoRole("traveller")}
              className="py-1.5 px-2 rounded-lg bg-theme-surface border border-theme-border text-xs font-medium hover:border-theme-primary hover:text-theme-primary transition-all text-center"
            >
              👤 Traveller
            </button>
            <button
              type="button"
              onClick={() => switchDemoRole("provider")}
              className="py-1.5 px-2 rounded-lg bg-theme-surface border border-theme-border text-xs font-medium hover:border-theme-primary hover:text-theme-primary transition-all text-center"
            >
              🏨 Host/Provider
            </button>
            <button
              type="button"
              onClick={() => switchDemoRole("admin")}
              className="py-1.5 px-2 rounded-lg bg-theme-surface border border-theme-border text-xs font-medium hover:border-theme-primary hover:text-theme-primary transition-all text-center"
            >
              🛡️ Admin
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-theme-border">
          <button
            type="button"
            onClick={() => { setAuthModalTab("login"); setError(""); }}
            className={`flex-1 py-2 text-sm font-semibold border-b-2 transition-colors ${
              authModalTab === "login"
                ? "border-theme-primary text-theme-primary"
                : "border-transparent text-theme-text-muted hover:text-theme-text"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setAuthModalTab("register"); setError(""); }}
            className={`flex-1 py-2 text-sm font-semibold border-b-2 transition-colors ${
              authModalTab === "register"
                ? "border-theme-primary text-theme-primary"
                : "border-transparent text-theme-text-muted hover:text-theme-text"
            }`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-600 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        {authModalTab === "login" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-theme-text-subtle" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. traveller@yatravista.demo"
                  className="w-full pl-9 pr-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-sm text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-theme-text-subtle" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-sm text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In to YatraVista"}
            </Button>
          </form>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                I want to join as:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole("traveller")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    role === "traveller"
                      ? "bg-theme-primary-light border-theme-primary text-theme-primary"
                      : "bg-theme-bg border-theme-border text-theme-text-muted"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Traveller</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("provider")}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    role === "provider"
                      ? "bg-theme-primary-light border-theme-primary text-theme-primary"
                      : "bg-theme-bg border-theme-border text-theme-text-muted"
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Host / Provider</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 w-4 h-4 text-theme-text-subtle" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Meenakshi Sharma"
                  className="w-full pl-9 pr-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-sm text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                />
              </div>
            </div>

            {role === "provider" && (
              <div>
                <label className="block text-xs font-medium text-theme-text-muted mb-1">
                  Business / Property / Guild Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-2.5 w-4 h-4 text-theme-text-subtle" />
                  <input
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Royal Haveli Stays & Craft Guild"
                    className="w-full pl-9 pr-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-sm text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-theme-text-subtle" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@example.com"
                  className="w-full pl-9 pr-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-sm text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-theme-text-subtle" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-sm text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full justify-center"
              disabled={loading}
            >
              {loading ? "Creating Account..." : role === "provider" ? "Apply as Host & Register" : "Create Traveller Account"}
            </Button>
          </form>
        )}

      </div>
    </Modal>
  );
}
