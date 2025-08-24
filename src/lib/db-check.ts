export function isDatabaseAvailable(): boolean {
  // Check if we're in a build environment
  if (process.env.NODE_ENV === "production" && !process.env.POSTGRES_URL) {
    return false;
  }

  // Check if we have the required environment variable
  if (!process.env.POSTGRES_URL) {
    return false;
  }

  return true;
}

export function getDatabaseErrorResponse() {
  return {
    error: "Database not configured or unavailable",
    status: 503,
  };
}
