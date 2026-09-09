// Unified API Client with JWT authorization & robust error handling

const API_BASE = "/api";

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("yatravista_token");
  
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.error || `HTTP error! status: ${res.status}`);
    }

    return data;
  } catch (err) {
    console.warn(`API request to ${endpoint} failed:`, err.message);
    throw err;
  }
}

// API Methods
export const api = {
  // Auth
  login: (email, password) => apiRequest("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (userData) => apiRequest("/auth/register", { method: "POST", body: JSON.stringify(userData) }),
  demoLogin: (role) => apiRequest("/auth/demo-login", { method: "POST", body: JSON.stringify({ role }) }),
  getMe: () => apiRequest("/auth/me"),

  // Destinations
  getDestinations: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/destinations${qs ? `?${qs}` : ""}`);
  },
  getDestination: (slug) => apiRequest(`/destinations/${slug}`),

  // Listings
  getListings: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/listings${qs ? `?${qs}` : ""}`);
  },
  getListing: (id) => apiRequest(`/listings/${id}`),
  createListing: (data) => apiRequest("/listings", { method: "POST", body: JSON.stringify(data) }),
  updateListing: (id, data) => apiRequest(`/listings/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  updateListingStatus: (id, status, reason) => apiRequest(`/listings/${id}/status`, { 
    method: "PATCH", 
    body: JSON.stringify({ status, rejection_reason: reason }) 
  }),

  // Providers
  getProvider: (id) => apiRequest(`/providers/${id}`),
  updateProviderProfile: (data) => apiRequest("/providers/profile", { method: "PUT", body: JSON.stringify(data) }),

  // Bookings
  createBooking: (data) => apiRequest("/bookings", { method: "POST", body: JSON.stringify(data) }),
  getMyBookings: (status) => apiRequest(`/bookings/my-bookings${status ? `?status=${status}` : ""}`),
  getProviderRequests: () => apiRequest("/bookings/provider-requests"),
  respondToBooking: (id, action, notes, reason) => apiRequest(`/bookings/${id}/respond`, { 
    method: "PATCH", 
    body: JSON.stringify({ action, provider_notes: notes, decline_reason: reason }) 
  }),
  cancelBooking: (id, reason) => apiRequest(`/bookings/${id}/cancel`, { 
    method: "PATCH", 
    body: JSON.stringify({ cancellation_reason: reason }) 
  }),

  // Admin
  getAdminStats: () => apiRequest("/admin/stats"),
  getAdminListingsQueue: (status) => apiRequest(`/admin/listings-queue${status ? `?status=${status}` : ""}`),
  getAdminApplications: () => apiRequest("/admin/provider-applications"),
  moderateProviderApplication: (userId, status, notes) => apiRequest(`/admin/provider-applications/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ status, approval_notes: notes })
  }),
  getAdminBookings: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiRequest(`/admin/bookings${qs ? `?${qs}` : ""}`);
  },
  getAdminAuditLogs: () => apiRequest("/admin/audit-logs")
};
