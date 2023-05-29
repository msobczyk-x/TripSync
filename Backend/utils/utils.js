export function haversine(lat1, lon1, lat2, lon2) {
    // Convert latitude and longitude from degrees to radians
    const radLat1 = (lat1 * Math.PI) / 180;
    const radLon1 = (lon1 * Math.PI) / 180;
    const radLat2 = (lat2 * Math.PI) / 180;
    const radLon2 = (lon2 * Math.PI) / 180;
  
    // Haversine formula
    const dlat = radLat2 - radLat1;
    const dlon = radLon2 - radLon1;
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const r = 6371; // Radius of the Earth in kilometers
    const distance = c * r;
  
    return distance;
  }

export function calculateTimeElapsed(time) {
  const timeElapsed = Date.now() - time;
  const timeElapsedInMinutes = Math.floor(timeElapsed / 60000);
  return timeElapsedInMinutes;
}