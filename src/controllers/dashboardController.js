import { Dashboard } from '../models/Dashboard.js';
import fs from 'fs/promises';
import path from 'path';

export const getDashboards = async (req, res, next) => {
  try {
    const { language } = req.query;

    const filter = { isActive: true };
    if (language) filter.language = language;

    const dashboards = await Dashboard.find(filter);

    res.json({
      success: true,
      data: dashboards,
      count: dashboards.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardByLanguage = async (req, res, next) => {
  try {
    const { language } = req.params;

    const dashboard = await Dashboard.findOne({ language, isActive: true });

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        message: `Dashboard not found for language: ${language}`,
      });
    }

    res.json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};

export const createOrUpdateDashboard = async (req, res, next) => {
  try {
    const { language, youtubeUrl } = req.body;
    // Support both JSON object and bracket-form fields from multipart forms
    let socialLinks = undefined;
    if (req.body && (req.body['socialLinks[discord]'] || req.body['socialLinks[reddit]'])) {
      socialLinks = {
        discord: req.body['socialLinks[discord]'] || undefined,
        reddit: req.body['socialLinks[reddit]'] || undefined,
      };
    } else if (req.body && req.body.socialLinks) {
      try {
        socialLinks = typeof req.body.socialLinks === 'string'
          ? JSON.parse(req.body.socialLinks)
          : req.body.socialLinks;
      } catch {
        // ignore malformed JSON; validation will catch invalid URLs if any
      }
    }
    const pdfFile = req.file;

    // Check if dashboard exists
    let dashboard = await Dashboard.findOne({ language });

    if (dashboard && pdfFile) {
      // Delete old file if exists
      if (dashboard.pdfFile?.filePath) {
        try {
          await fs.unlink(dashboard.pdfFile.filePath);
        } catch (err) {
          console.warn('Failed to delete old PDF file:', err.message);
        }
      }
    }

    const updateData = {
      language,
      youtubeUrl,
      ...(socialLinks ? { socialLinks } : {}),
    };

    if (pdfFile) {
      updateData.pdfFile = {
        fileName: pdfFile.originalname,
        filePath: pdfFile.path,
        uploadedAt: new Date(),
        fileSize: pdfFile.size,
      };
    }

    dashboard = await Dashboard.findOneAndUpdate(
      { language },
      updateData,
      { new: true, upsert: true, runValidators: true }
    );

    res.status(dashboard.createdAt ? 201 : 200).json({
      success: true,
      message: dashboard.createdAt
        ? 'Dashboard created successfully'
        : 'Dashboard updated successfully',
      data: dashboard,
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

export const updateDashboardLinks = async (req, res, next) => {
  try {
    const { language } = req.params;
    const { youtubeUrl, socialLinks } = req.body;

    const dashboard = await Dashboard.findOneAndUpdate(
      { language },
      { youtubeUrl, socialLinks },
      { new: true, runValidators: true }
    );

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        message: `Dashboard not found for language: ${language}`,
      });
    }

    res.json({
      success: true,
      message: 'Dashboard links updated successfully',
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDashboard = async (req, res, next) => {
  try {
    const { language } = req.params;

    const dashboard = await Dashboard.findOne({ language });

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        message: `Dashboard not found for language: ${language}`,
      });
    }

    // Delete associated PDF file if exists
    if (dashboard.pdfFile?.filePath) {
      try {
        await fs.unlink(dashboard.pdfFile.filePath);
      } catch (err) {
        console.warn('Failed to delete PDF file:', err.message);
      }
    }

    await Dashboard.deleteOne({ language });

    res.json({
      success: true,
      message: 'Dashboard deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const downloadDashboardPDF = async (req, res, next) => {
  try {
    const { language } = req.params;

    const dashboard = await Dashboard.findOne({ language });

    if (!dashboard || !dashboard.pdfFile) {
      return res.status(404).json({
        success: false,
        message: 'PDF not found',
      });
    }

    const filePath = dashboard.pdfFile.filePath;

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return res.status(404).json({
        success: false,
        message: 'PDF file not found on server',
      });
    }

    res.download(filePath, dashboard.pdfFile.fileName);
  } catch (error) {
    next(error);
  }
};
