import mongoose from 'mongoose';

const pdfSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: [true, 'Language is required'],
      enum: ['en', 'ar', 'fr', 'es', 'de', 'zh', 'hi'],
      index: true,
    },
    title: {
      type: String,
      required: [true, 'PDF title is required'],
      trim: true,
      maxlength: [255, 'Title cannot exceed 255 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    fileName: {
      type: String,
      required: [true, 'File name is required'],
    },
    filePath: {
      type: String,
      required: [true, 'File path is required'],
    },
    fileSize: {
      type: Number,
      required: [true, 'File size is required'],
    },
    uploadedBy: {
      type: String,
      default: 'admin',
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
pdfSchema.index({ language: 1, isActive: 1 });
pdfSchema.index({ createdAt: -1 });

// Pre-save validation
pdfSchema.pre('save', function (next) {
  if (!this.fileName.toLowerCase().endsWith('.pdf')) {
    return next(new Error('Only PDF files are allowed'));
  }
  next();
});

export const PDF = mongoose.model('PDF', pdfSchema);
