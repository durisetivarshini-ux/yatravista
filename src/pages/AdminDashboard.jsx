import React, { useState, useEffect } from "react";
import { 
  Shield, 
  Users, 
  Building, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Activity, 
  Search, 
  FileText, 
  AlertTriangle, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import { formatINR } from "../utils/currencyFormatter";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";

export function AdminDashboard() {
  const { user, role, switchDemoRole } = useAuth();

  const [activeTab, setActiveTab] = useState("overview"); // "overview", "listings", "providers", "bookings", "audit"
  const [stats, setStats] = useState(null);
  const [listingsQueue, setListingsQueue] = useState([]);
  const [applications, setApplications] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Moderation state
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionTarget, setActionTarget] = useState(null);
  const [actionType, setActionType] = useState("approve"); // "approve" | "reject"
  const [rejectionReason, setRejectionReason] = useState("");
  const [processing, setProcessing] = useState(false);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, listRes, appRes, bookRes, auditRes] = await Promise.all([
        api.getAdminStats().catch(() => ({ stats: null })),
        api.getAdminListingsQueue("all").catch(() => ({ listings: [] })),
        api.getAdminApplications().catch(() => ({ applications: [] })),
        api.getAdminBookings().catch(() => ({ bookings: [] })),
        api.getAdminAuditLogs().catch(() => ({ logs: [] }))
      ]);

      setStats(statsRes.stats);
      setListingsQueue(listRes.listings || []);
      setApplications(appRes.applications || []);
      setBookings(bookRes.bookings || []);
      setAuditLogs(auditRes.logs || []);
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === "admin") {
      fetchAdminData();
    } else {
      setLoading(false);
    }
  }, [role]);

  const handleModerateListing = async () => {
    if (!actionTarget) return;
    setProcessing(true);
    try {
      const newStatus = actionType === "approve" ? "approved" : "rejected";
      await api.updateListingStatus(actionTarget.id, newStatus, rejectionReason);
      setActionModalOpen(false);
      setActionTarget(null);
      setRejectionReason("");
      await fetchAdminData();
    } catch (err) {
      alert(err.message || "Failed to update listing status.");
    } finally {
      setProcessing(false);
    }
  };

  const handleModerateProvider = async (providerId, newStatus) => {
    try {
      await api.moderateProviderApplication(providerId, newStatus, "Platform administrative review completed.");
      await fetchAdminData();
    } catch (err) {
      alert(err.message || "Failed to moderate provider.");
    }
  };

  if (role !== "admin") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center mx-auto">
          <Shield className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-theme-text">Platform Admin Access Restricted</h2>
        <p className="text-sm text-theme-text-muted max-w-md mx-auto">
          Administrative control requires verified platform admin permissions. Use the 1-click switch below to preview the platform administrator dashboard.
        </p>
        <Button variant="primary" size="md" onClick={() => switchDemoRole("admin")}>
          Switch to Platform Admin Demo Account
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-theme-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">
              Platform Administration
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/10 text-red-700 border border-red-500/20">
              <Shield className="w-3 h-3 text-red-600" />
              <span>Full Oversight • SIH 2026</span>
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-theme-text mt-1">
            YatraVista Control Center
          </h1>
          <p className="text-sm text-theme-text-muted mt-1">
            Database-backed platform metrics, provider approvals, content moderation queue, and audit trail.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchAdminData}
          >
            Refresh Database
          </Button>
        </div>
      </div>

      {/* KPI Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-xs space-y-1">
            <div className="text-xs font-medium text-theme-text-muted">Total Registered Accounts</div>
            <div className="text-2xl font-serif font-bold text-theme-text">{stats.users?.total || 0}</div>
            <div className="text-[11px] text-theme-text-subtle">
              {stats.users?.travellers} Travellers • {stats.users?.providers} Providers
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-xs space-y-1">
            <div className="text-xs font-medium text-theme-text-muted">Destination Catalogue</div>
            <div className="text-2xl font-serif font-bold text-theme-primary">{stats.destinations || 60}</div>
            <div className="text-[11px] text-theme-text-subtle">Covering 28 States & 8 UTs</div>
          </div>

          <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-xs space-y-1">
            <div className="text-xs font-medium text-theme-text-muted">Bookable Listings</div>
            <div className="text-2xl font-serif font-bold text-emerald-700">{stats.listings?.approved || 0}</div>
            <div className="text-[11px] text-theme-text-subtle">
              {stats.listings?.pending_review || 0} in review queue
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-xs space-y-1">
            <div className="text-xs font-medium text-theme-text-muted">Confirmed Volume (Gross)</div>
            <div className="text-2xl font-serif font-bold text-theme-accent">
              {formatINR(stats.bookings?.confirmed_volume || 0)}
            </div>
            <div className="text-[11px] text-theme-text-subtle">
              {stats.bookings?.confirmed || 0} confirmed • {stats.bookings?.pending || 0} pending
            </div>
          </div>
        </div>
      )}

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-theme-border pb-2 overflow-x-auto">
        {[
          { id: "overview", label: "Overview & Analytics" },
          { id: "listings", label: `Listing Moderation (${listingsQueue.filter(l => l.status === "pending_review").length} pending)` },
          { id: "providers", label: `Host Applications (${applications.length})` },
          { id: "bookings", label: `Global Bookings Audit (${bookings.length})` },
          { id: "audit", label: `Audit Event Logs (${auditLogs.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "bg-theme-primary text-white shadow-soft"
                : "bg-theme-surface border border-theme-border text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Overview */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-theme-surface border border-theme-border space-y-4">
            <h3 className="text-base font-serif font-bold text-theme-text">Platform Integrity & Compliance</h3>
            <p className="text-xs text-theme-text-muted leading-relaxed">
              YatraVista operates on a real local SQLite transactional store with foreign keys and WAL concurrency. All listings and host accounts undergo moderation before public discovery.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-theme-bg">
                <span className="text-theme-text-muted">Data Schema Version:</span>
                <span className="font-mono font-bold text-theme-primary">v2.0-SIH2026</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-theme-bg">
                <span className="text-theme-text-muted">Server Status:</span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Online (Express Port 5000)
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-theme-surface border border-theme-border space-y-4">
            <h3 className="text-base font-serif font-bold text-theme-text">Quick Admin Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="secondary"
                size="sm"
                className="justify-center"
                onClick={() => setActiveTab("listings")}
              >
                Review Listings Queue
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="justify-center"
                onClick={() => setActiveTab("providers")}
              >
                Verify Host Accounts
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Listings Moderation Queue */}
      {activeTab === "listings" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-bold text-theme-text">Listings Moderation Queue</h3>
            <span className="text-xs text-theme-text-muted">{listingsQueue.length} total listings</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {listingsQueue.map((l) => (
              <div
                key={l.id}
                className="p-4 rounded-2xl bg-theme-surface border border-theme-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5 min-w-0 flex-1">
                  <img
                    src={l.image}
                    alt={l.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-theme-border"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        l.status === "approved"
                          ? "bg-emerald-500/10 text-emerald-700"
                          : l.status === "pending_review"
                          ? "bg-amber-500/10 text-amber-700 font-bold"
                          : "bg-red-500/10 text-red-700"
                      }`}>
                        {l.status?.replace("_", " ")}
                      </span>
                      <span className="text-xs text-theme-text-subtle capitalize">• {l.category} in {l.destination_slug}</span>
                    </div>

                    <h4 className="text-sm font-serif font-bold text-theme-text truncate">{l.title}</h4>
                    <p className="text-xs text-theme-text-muted line-clamp-1">
                      Host: <strong>{l.business_name || l.provider_name}</strong> ({l.provider_email})
                    </p>
                    <div className="text-xs font-semibold text-theme-primary">
                      {formatINR(l.price)} / {l.price_unit?.replace("_", " ")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {l.status !== "approved" && (
                    <button
                      type="button"
                      onClick={() => {
                        setActionTarget(l);
                        setActionType("approve");
                        setActionModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                    >
                      Approve Listing
                    </button>
                  )}
                  {l.status !== "rejected" && (
                    <button
                      type="button"
                      onClick={() => {
                        setActionTarget(l);
                        setActionType("reject");
                        setActionModalOpen(true);
                      }}
                      className="px-3 py-1.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors"
                    >
                      Reject with Reason
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Provider Applications */}
      {activeTab === "providers" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applications.map((app) => (
              <div
                key={app.user_id}
                className="p-5 rounded-2xl bg-theme-surface border border-theme-border space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={app.avatar_url}
                      alt={app.name}
                      className="w-12 h-12 rounded-xl object-cover border border-theme-border"
                    />
                    <div>
                      <h4 className="text-base font-serif font-bold text-theme-text">{app.business_name || app.name}</h4>
                      <p className="text-xs text-theme-text-muted">{app.name} • {app.email}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase ${
                    app.verified_status === "approved" ? "bg-emerald-500/10 text-emerald-700" : "bg-amber-500/10 text-amber-700"
                  }`}>
                    {app.verified_status}
                  </span>
                </div>

                {app.tagline && (
                  <p className="text-xs text-theme-accent italic">“{app.tagline}”</p>
                )}
                {app.bio && (
                  <p className="text-xs text-theme-text-muted line-clamp-2">{app.bio}</p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-theme-border text-xs">
                  <span className="text-theme-text-subtle">Location: {app.location || "India"}</span>
                  <div className="flex items-center gap-2">
                    {app.verified_status !== "approved" && (
                      <button
                        type="button"
                        onClick={() => handleModerateProvider(app.user_id, "approved")}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold"
                      >
                        Grant Platform Approval
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Global Bookings Audit */}
      {activeTab === "bookings" && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-theme-border bg-theme-surface">
            <table className="w-full text-left text-xs">
              <thead className="bg-theme-bg text-theme-text-muted border-b border-theme-border">
                <tr>
                  <th className="p-3.5 font-semibold">Reference</th>
                  <th className="p-3.5 font-semibold">Listing</th>
                  <th className="p-3.5 font-semibold">Traveller</th>
                  <th className="p-3.5 font-semibold">Host</th>
                  <th className="p-3.5 font-semibold">Amount</th>
                  <th className="p-3.5 font-semibold">Status</th>
                  <th className="p-3.5 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-theme-bg/40 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-theme-primary">{b.booking_reference}</td>
                    <td className="p-3.5 font-medium text-theme-text truncate max-w-[180px]">{b.listing_title}</td>
                    <td className="p-3.5 text-theme-text-muted">{b.traveller_name}</td>
                    <td className="p-3.5 text-theme-text-muted">{b.provider_business_name || b.provider_name}</td>
                    <td className="p-3.5 font-serif font-bold text-theme-text">{formatINR(b.total_amount)}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase ${
                        b.booking_status === "confirmed"
                          ? "bg-emerald-500/10 text-emerald-700"
                          : b.booking_status === "pending"
                          ? "bg-amber-500/10 text-amber-700"
                          : "bg-zinc-500/10 text-zinc-600"
                      }`}>
                        {b.booking_status}
                      </span>
                    </td>
                    <td className="p-3.5 text-theme-text-subtle">{b.check_in_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Audit Event Logs */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          <div className="overflow-x-auto rounded-2xl border border-theme-border bg-theme-surface">
            <table className="w-full text-left text-xs">
              <thead className="bg-theme-bg text-theme-text-muted border-b border-theme-border">
                <tr>
                  <th className="p-3.5 font-semibold">Timestamp</th>
                  <th className="p-3.5 font-semibold">Action</th>
                  <th className="p-3.5 font-semibold">Entity</th>
                  <th className="p-3.5 font-semibold">User</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-theme-border">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-theme-bg/40 transition-colors">
                    <td className="p-3.5 text-theme-text-subtle font-mono text-[11px]">{log.timestamp}</td>
                    <td className="p-3.5 font-mono font-semibold text-theme-primary">{log.action}</td>
                    <td className="p-3.5 text-theme-text">{log.entity_type} ({log.entity_id})</td>
                    <td className="p-3.5 text-theme-text-muted">{log.user_name || "System"} ({log.user_role || "SYSTEM"})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Moderation Action Modal */}
      {actionModalOpen && actionTarget && (
        <Modal
          isOpen={actionModalOpen}
          onClose={() => setActionModalOpen(false)}
          title={actionType === "approve" ? "Approve Listing" : "Reject Listing"}
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-xs text-theme-text-muted">
              {actionType === "approve"
                ? `Confirm publishing of listing "${actionTarget.title}" for public search and bookings.`
                : `Reject listing "${actionTarget.title}". Please specify moderation feedback for the host.`}
            </p>

            {actionType === "reject" && (
              <div>
                <label className="block text-xs font-medium text-theme-text-muted mb-1">
                  Rejection Reason / Required Edits
                </label>
                <textarea
                  rows={3}
                  required
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="e.g. Please upload higher resolution photos of the stay interior..."
                  className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                />
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setActionModalOpen(false)}
              >
                Cancel
              </Button>
              <button
                type="button"
                onClick={handleModerateListing}
                disabled={processing}
                className={`px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-xs transition-colors ${
                  actionType === "approve" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {processing ? "Processing..." : actionType === "approve" ? "Confirm Approval" : "Confirm Rejection"}
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
export default AdminDashboard;
