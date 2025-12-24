import dotenv from 'dotenv';

dotenv.config();

export const config = {
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/multilingual-books',
  },
  server: {
    port: process.env.PORT || 5000,
    env: process.env.NODE_ENV || 'development',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
    expire: process.env.JWT_EXPIRE || '7d',
  },
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '50000000', 10),
    uploadPath: process.env.UPLOAD_PATH || './uploads',
  },
  cors: {
    // Allow common local dev origins by default, including Vite (5173) and custom (8080)
    origin: (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:3000,http://localhost:8080,http://127.0.0.1:8080')
      .split(',')
      .map((o) => o.trim()),
  },
};

export default config;
