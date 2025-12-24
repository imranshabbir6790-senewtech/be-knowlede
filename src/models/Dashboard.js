import mongoose from 'mongoose';

const dashboardSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: [true, 'Language is required'],
      enum: ['en', 'ar', 'fr', 'es', 'de', 'zh', 'hi'],
      unique: true,
      index: true,
    },
    pdfFile: {
      fileName: String,
      filePath: String,
      uploadedAt: Date,
      fileSize: Number, // in bytes
    },
    youtubeUrl: {
      type: String,
      match: [
        /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/.*$/,
        'Please provide a valid YouTube URL',
      ],
      default: null,
    },
    socialLinks: {
      discord: {
        type: String,
        match: [/^https?:\/\/discord\.gg\/.+/, 'Please provide a valid Discord invite URL'],
        default: null,
      },
      reddit: {
        type: String,
        match: [/^https?:\/\/(www\.)?reddit\.com\/.+/, 'Please provide a valid Reddit URL'],
        default: null,
      },
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

// Ensure one dashboard config per language
dashboardSchema.index({ language: 1, isActive: 1 });

export const Dashboard = mongoose.model('Dashboard', dashboardSchema);
