import { body, validationResult } from 'express-validator';

export const validateCarousel = [
  body('language')
    .isIn(['en', 'ar', 'fr', 'es', 'de', 'zh', 'hi'])
    .withMessage('Invalid language. Must be: en, ar, fr, es, de, zh, hi'),
  body('position')
    .isIn(['top', 'bottom'])
    .withMessage('Position must be either "top" or "bottom"'),
  body('images')
    .isArray({ min: 1 })
    .withMessage('At least one image is required'),
  body('images.*.imageUrl')
    .isURL()
    .withMessage('Each image must have a valid image URL'),
  body('images.*.clickUrl')
    .isURL()
    .withMessage('Each image must have a valid click URL'),
  body('images.*.order')
    .isInt({ min: 0 })
    .withMessage('Order must be a non-negative integer'),
];

export const validateDashboard = [
  body('language')
    .isIn(['en', 'ar', 'fr', 'es', 'de', 'zh', 'hi'])
    .withMessage('Invalid language'),
  body('youtubeUrl')
    .optional()
    .matches(/^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/.*$/)
    .withMessage('Invalid YouTube URL'),
  // Accept any valid URLs for social links to reduce friction
  body(['socialLinks.discord', 'socialLinks[discord]'])
    .optional()
    .isURL()
    .withMessage('Invalid URL'),
  body(['socialLinks.reddit', 'socialLinks[reddit]'])
    .optional()
    .isURL()
    .withMessage('Invalid URL'),
];

export const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};
