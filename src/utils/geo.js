// Geolocation & Navigation Utilities for YatraVista
// Provides straight-line distance calculations and external mapping directions

/**
 * Calculates straight-line distance (in kilometers) between two coordinates using the Haversine formula.
 * Clearly labeled as straight-line distance (not driving distance or live navigation time).
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371; // Earth's mean radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // 1 decimal place
}

/**
 * Formats distance with human readable metric label
 */
export function formatDistance(km) {
  if (km === null || km === undefined) return null;
  if (km < 1) return `${Math.round(km * 1000)} m (approx. straight-line)`;
  return `${km.toFixed(1)} km (approx. straight-line)`;
}

/**
 * Generates an external Google Maps Directions URL given destination coordinates or address
 */
export function getDirectionsUrl(coords, placeName, address) {
  if (coords && coords.lat && coords.lng) {
    return `https://www.google.com/maps/dir/?api=1&destination=${coords.lat},${coords.lng}&travelmode=driving`;
  }
  const query = encodeURIComponent(`${placeName || ''} ${address || ''}`.trim() || 'India');
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

/**
 * Generates an OpenStreetMap URL
 */
export function getOsmUrl(coords, zoom = 15) {
  if (coords && coords.lat && coords.lng) {
    return `https://www.openstreetmap.org/?mlat=${coords.lat}&mlon=${coords.lng}#map=${zoom}/${coords.lat}/${coords.lng}`;
  }
  return 'https://www.openstreetmap.org';
}

/**
 * Known Indian Major Hub Coordinates (for manual fallback selection when GPS is denied/unavailable)
 */
export const majorIndianHubs = [
  { name: 'Delhi (NCR)', state: 'Delhi', lat: 28.6139, lng: 77.2090 },
  { name: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777 },
  { name: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946 },
  { name: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867 },
  { name: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639 },
  { name: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 },
  { name: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714 },
  { name: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739 },
  { name: 'Visakhapatnam', state: 'Andhra Pradesh', lat: 17.6868, lng: 83.2185 },
  { name: 'Tirupati', state: 'Andhra Pradesh', lat: 13.6288, lng: 79.4192 },
  { name: 'Madurai', state: 'Tamil Nadu', lat: 9.9252, lng: 78.1198 },
  { name: 'Kochi', state: 'Kerala', lat: 9.9312, lng: 76.2673 },
  { name: 'Amritsar', state: 'Punjab', lat: 31.6340, lng: 74.8723 },
  { name: 'Guwahati', state: 'Assam', lat: 26.1445, lng: 91.7362 },
  { name: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lng: 85.8245 },
  { name: 'Shimla', state: 'Himachal Pradesh', lat: 31.1048, lng: 77.1734 },
  { name: 'Srinagar', state: 'Jammu & Kashmir', lat: 34.0837, lng: 74.7973 }
];
