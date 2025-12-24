import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import { connectDB } from './config/database.js';
import { config } from './config/index.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

const app = express();

// ==================== MIDDLEWARE ====================

// Security + CORS middleware
app.use(helmet());

// Configure CORS to support dev ports and preflight requests
const corsOptions = {
  origin: (origin, callback) => {
    // allow non-browser or same-origin requests (no origin header)
    if (!origin) return callback(null, true);
    const allowed = Array.isArray(config.cors.origin) ? config.cors.origin : [config.cors.origin];
    if (allowed.includes(origin)) return callback(null, true);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// ==================== ROUTES ====================

// API routes
app.use('/api/v1', routes);

// 404 handler
app.use('*', notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// ==================== SERVER ====================

const PORT = config.server.port;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on http://localhost:${PORT}`);
      console.log(`📚 API docs: http://localhost:${PORT}/api/v1/health`);
      console.log(`🌍 Environment: ${config.server.env}\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

export default app;
