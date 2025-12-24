import express from 'express';
import {
  getCarousels,
  getCarouselById,
  createCarousel,
  updateCarousel,
  deleteCarousel,
  addCarouselImage,
  removeCarouselImage,
} from '../controllers/carouselController.js';
import { validateCarousel, validationHandler } from '../validators/index.js';

const router = express.Router();

// GET all carousels with filters
router.get('/', getCarousels);

// GET carousel by ID
router.get('/:id', getCarouselById);

// CREATE new carousel
router.post('/', validateCarousel, validationHandler, createCarousel);

// UPDATE carousel
router.put('/:id', updateCarousel);

// DELETE carousel
router.delete('/:id', deleteCarousel);

// ADD image to carousel
router.post('/:id/images', addCarouselImage);

// REMOVE image from carousel
router.delete('/:id/images/:imageId', removeCarouselImage);

export default router;
