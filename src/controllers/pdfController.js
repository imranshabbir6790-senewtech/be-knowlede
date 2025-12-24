import { PDF } from '../models/PDF.js';
import fs from 'fs/promises';
import path from 'path';

export const getPDFs = async (req, res, next) => {
  try {
    const { language, page = 1, limit = 10 } = req.query;

    const filter = { isActive: true };
    if (language) filter.language = language;

    const skip = (page - 1) * limit;

    const pdfs = await PDF.find(filter)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await PDF.countDocuments(filter);

    res.json({
      success: true,
      data: pdfs,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPDFById = async (req, res, next) => {
  try {
    const pdf = await PDF.findById(req.params.id);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: 'PDF not found',
      });
    }

    res.json({
      success: true,
      data: pdf,
    });
  } catch (error) {
    next(error);
  }
};

export const createPDF = async (req, res, next) => {
  try {
    const { language, title, description } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: 'PDF file is required',
      });
    }

    const pdf = new PDF({
      language,
      title,
      description,
      fileName: file.originalname,
      filePath: file.path,
      fileSize: file.size,
    });

    await pdf.save();

    res.status(201).json({
      success: true,
      message: 'PDF uploaded successfully',
      data: pdf,
    });
  } catch (error) {
    // Clean up uploaded file if there's an error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (err) {
        console.warn('Failed to clean up uploaded file:', err.message);
      }
    }
    next(error);
  }
};

export const updatePDF = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const file = req.file;

    let pdf = await PDF.findById(id);

    if (!pdf) {
      if (file) {
        try {
          await fs.unlink(file.path);
        } catch (err) {
          console.warn('Failed to clean up uploaded file:', err.message);
        }
      }
      return res.status(404).json({
        success: false,
        message: 'PDF not found',
      });
    }

    // If new file is uploaded, delete old one
    if (file) {
      try {
        await fs.unlink(pdf.filePath);
      } catch (err) {
        console.warn('Failed to delete old PDF file:', err.message);
      }

      pdf.fileName = file.originalname;
      pdf.filePath = file.path;
      pdf.fileSize = file.size;
    }

    if (title) pdf.title = title;
    if (description) pdf.description = description;

    await pdf.save();

    res.json({
      success: true,
      message: 'PDF updated successfully',
      data: pdf,
    });
  } catch (error) {
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (err) {
        console.warn('Failed to clean up uploaded file:', err.message);
      }
    }
    next(error);
  }
};

export const deletePDF = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pdf = await PDF.findById(id);

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: 'PDF not found',
      });
    }

    // Delete file from storage
    try {
      await fs.unlink(pdf.filePath);
    } catch (err) {
      console.warn('Failed to delete PDF file:', err.message);
    }

    await PDF.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'PDF deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const downloadPDF = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pdf = await PDF.findByIdAndUpdate(
      id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );

    if (!pdf) {
      return res.status(404).json({
        success: false,
        message: 'PDF not found',
      });
    }

    // Check if file exists
    try {
      await fs.access(pdf.filePath);
    } catch {
      return res.status(404).json({
        success: false,
        message: 'PDF file not found on server',
      });
    }

    res.download(pdf.filePath, pdf.fileName);
  } catch (error) {
    next(error);
  }
};
