import express from 'express';
import dotenv from 'dotenv';
import { createCorsMiddleware } from './middleware/cors.js';
import contactRouter from './routes/contact.js';
import aiRouter from './routes/ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(createCorsMiddleware());

// Trust proxy for correct IP in rate limiting
app.set('trust proxy', 1);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/contact', contactRouter);

// Check for required environment variables and conditionally enable AI
if (!process.env.QWEN_API_KEY) {
  console.warn('⚠️  QWEN_API_KEY is not set. AI assistant feature will be disabled.');
} else {
  console.log('✅ AI assistant feature is enabled.');
}

// Always register AI route — the route itself checks for the key and returns 503 if missing
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
