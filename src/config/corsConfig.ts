/**
 * CORS: which *browser* origins may call this API from JavaScript.
 * Values come from env in production so we do not hardcode client URLs.
 */
export const getCorsOptions = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment) {
    return {
      // Allow any origin in dev so Postman / Vite / random ports all work without editing .env every time.
      origin: true,

      // If we ever send cookies cross-origin, this must be true (we keep it on to match common setups).
      credentials: true,

      // How long (seconds) the browser may cache the preflight OPTIONS result — short in dev.
      maxAge: 500,
    };
  }

  // production / staging: only origins listed in ALLOWED_ORIGINS (comma-separated in .env)
  let raw = process.env.ALLOWED_ORIGINS || "";
  let allowedList = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return {
    origin: allowedList,

    methods: ["GET", "POST", "PUT", "DELETE"],

    // Headers browsers may send on actual requests (Authorization for future JWT, etc.).
    allowedHeaders: ["Content-Type", "Authorization"],

    // Cache preflight for 1 hour so the browser does not spam OPTIONS on every request.
    maxAge: 3600,

    credentials: true,
  };
};
