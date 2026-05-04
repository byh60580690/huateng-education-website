import cors from 'cors';

/**
 * Creates a CORS middleware configured from the ALLOWED_ORIGINS environment variable.
 * Falls back to allowing localhost:5173 in development.
 */
export function createCorsMiddleware() {
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
    : ['http://localhost:5173'];

  return cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  });
}
