import express from 'express';
import carouselRoutes from './carouselRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import pdfRoutes from './pdfRoutes.js';

const router = express.Router();

// API version prefix: /api/v1
router.use('/carousels', carouselRoutes);
router.use('/dashboards', dashboardRoutes);
router.use('/pdfs', pdfRoutes);

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
