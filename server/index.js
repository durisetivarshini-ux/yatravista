import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./db.js";

// Routes
import authRoutes from "./routes/auth.js";
import destinationRoutes from "./routes/destinations.js";
import listingRoutes from "./routes/listings.js";
import providerRoutes from "./routes/providers.js";
import bookingRoutes from "./routes/bookings.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database on server start
initDB();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    platform: "YatraVista API (SIH 2026 Student Prototype #26204)",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal server error occurred." });
});

app.listen(PORT, () => {
  console.log(`🚀 YatraVista API Server running on http://localhost:${PORT}`);
});
