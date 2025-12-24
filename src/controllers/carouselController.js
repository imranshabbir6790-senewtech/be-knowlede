import { Carousel } from '../models/Carousel.js';

export const getCarousels = async (req, res, next) => {
  try {
    const { language, position } = req.query;
    
    // Build filter
    const filter = { isActive: true };
    if (language) filter.language = language;
    if (position) filter.position = position;

    const carousels = await Carousel.find(filter).sort({ 'images.order': 1 });

    res.json({
      success: true,
      data: carousels,
      count: carousels.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getCarouselById = async (req, res, next) => {
  try {
    const carousel = await Carousel.findById(req.params.id);

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: 'Carousel not found',
      });
    }

    res.json({
      success: true,
      data: carousel,
    });
  } catch (error) {
    next(error);
  }
};

export const createCarousel = async (req, res, next) => {
  try {
    const { language, position, images, rotationInterval } = req.body;

    // Check if carousel already exists for this language and position
    const existing = await Carousel.findOne({ language, position });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Carousel already exists for ${language} language at ${position} position`,
      });
    }

    const carousel = new Carousel({
      language,
      position,
      images,
      rotationInterval,
    });

    await carousel.save();

    res.status(201).json({
      success: true,
      message: 'Carousel created successfully',
      data: carousel,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCarousel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { images, rotationInterval, isActive } = req.body;

    const carousel = await Carousel.findByIdAndUpdate(
      id,
      {
        images,
        rotationInterval,
        isActive,
      },
      { new: true, runValidators: true }
    );

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: 'Carousel not found',
      });
    }

    res.json({
      success: true,
      message: 'Carousel updated successfully',
      data: carousel,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCarousel = async (req, res, next) => {
  try {
    const carousel = await Carousel.findByIdAndDelete(req.params.id);

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: 'Carousel not found',
      });
    }

    res.json({
      success: true,
      message: 'Carousel deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const addCarouselImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { imageUrl, clickUrl, altText, order } = req.body;

    const carousel = await Carousel.findByIdAndUpdate(
      id,
      {
        $push: {
          images: {
            imageUrl,
            clickUrl,
            altText,
            order,
          },
        },
      },
      { new: true, runValidators: true }
    );

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: 'Carousel not found',
      });
    }

    res.json({
      success: true,
      message: 'Image added successfully',
      data: carousel,
    });
  } catch (error) {
    next(error);
  }
};

export const removeCarouselImage = async (req, res, next) => {
  try {
    const { id, imageId } = req.params;

    const carousel = await Carousel.findByIdAndUpdate(
      id,
      {
        $pull: {
          images: { _id: imageId },
        },
      },
      { new: true }
    );

    if (!carousel) {
      return res.status(404).json({
        success: false,
        message: 'Carousel not found',
      });
    }

    res.json({
      success: true,
      message: 'Image removed successfully',
      data: carousel,
    });
  } catch (error) {
    next(error);
  }
};
