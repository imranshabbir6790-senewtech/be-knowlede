import express from 'express';
import {
  getDashboards,
  getDashboardByLanguage,
  createOrUpdateDashboard,
  updateDashboardLinks,
  deleteDashboard,
  downloadDashboardPDF,
} from '../controllers/dashboardController.js';
import { uploadPDF, handleUploadError } from '../middleware/upload.js';
import { validateDashboard, validationHandler } from '../validators/index.js';

const router = express.Router();

// GET all dashboards
router.get('/', getDashboards);

// GET dashboard by language
router.get('/:language', getDashboardByLanguage);

// CREATE or UPDATE dashboard with PDF upload
router.post(
  '/',
  uploadPDF.single('pdf'),
  handleUploadError,
  validateDashboard,
  validationHandler,
  createOrUpdateDashboard
);

// UPDATE dashboard links only (no file upload)
router.put('/:language', validateDashboard, validationHandler, updateDashboardLinks);

// DELETE dashboard
router.delete('/:language', deleteDashboard);

// DOWNLOAD dashboard PDF
router.get('/:language/download-pdf', downloadDashboardPDF);

export default router;
