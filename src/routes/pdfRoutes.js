import express from 'express';
import {
  getPDFs,
  getPDFById,
  createPDF,
  updatePDF,
  deletePDF,
  downloadPDF,
} from '../controllers/pdfController.js';
import { uploadPDF, handleUploadError } from '../middleware/upload.js';

const router = express.Router();

// GET all PDFs with pagination
router.get('/', getPDFs);

// GET PDF by ID
router.get('/:id', getPDFById);

// CREATE new PDF
router.post('/', uploadPDF.single('pdf'), handleUploadError, createPDF);

// UPDATE PDF
router.put('/:id', uploadPDF.single('pdf'), handleUploadError, updatePDF);

// DELETE PDF
router.delete('/:id', deletePDF);

// DOWNLOAD PDF (with download counter)
router.get('/:id/download', downloadPDF);

export default router;
