import helmet from "helmet";

/**
 * Helmet: set security headers for this Express API.
 * We return JSON not HTML, so some browser-only options are off or relaxed.
 */
export const getHelmetConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  const baseConfig = {
    // CSP = rules for which scripts/styles a *page* may load. Our API is JSON only, so CSP does not really help and can confuse API clients.
    contentSecurityPolicy: false,

    // Remove X-Powered-By so we do not advertise "Express" and give attackers an easy hint.
    hidePoweredBy: true,

    // X-Content-Type-Options: nosniff — stop browsers from guessing wrong content types.
    noSniff: true,

    // Turn off aggressive DNS prefetching for responses from this app.
    dnsPrefetchControl: { allow: false },

    // Do not allow this API response to be embedded in an iframe on another site (clickjacking).
    frameguard: { action: "deny" as const },
  };

  if (isDevelopment) {
    return helmet({
      ...baseConfig,
      // Local dev is usually http://localhost — HSTS would be wrong here, so disable in development.
      hsts: false,
    });
  }

  return helmet({
    ...baseConfig,
    // Production: tell browsers to use HTTPS for this host for a long time (only makes sense behind TLS).
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    // Do not leak referrer URLs when following links from our API context.
    referrerPolicy: { policy: "no-referrer" },
  });
};
