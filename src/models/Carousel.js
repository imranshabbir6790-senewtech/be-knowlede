import mongoose from 'mongoose';

const carouselSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: [true, 'Language is required'],
      enum: ['en', 'ar', 'fr', 'es', 'de', 'zh', 'hi'],
      index: true,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      enum: ['top', 'bottom'],
      index: true,
    },
    images: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
        },
        imageUrl: {
          type: String,
          required: [true, 'Image URL is required'],
          match: [/^https?:\/\/.+/, 'Please provide a valid image URL'],
        },
        clickUrl: {
          type: String,
          required: [true, 'Click URL is required'],
          match: [/^https?:\/\/.+/, 'Please provide a valid click URL'],
        },
        altText: {
          type: String,
          default: 'Carousel image',
        },
        order: {
          type: Number,
          required: true,
        },
      },
    ],
    rotationInterval: {
      type: Number,
      default: 60000, // 60 seconds in milliseconds
      min: 5000,
      max: 300000,
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
carouselSchema.index({ language: 1, position: 1, isActive: 1 });

// Pre-save validation
carouselSchema.pre('save', function (next) {
  if (this.images.length === 0) {
    return next(new Error('At least one image is required'));
  }

  // Ensure images are sorted by order
  this.images.sort((a, b) => a.order - b.order);

  next();
});

export const Carousel = mongoose.model('Carousel', carouselSchema);
