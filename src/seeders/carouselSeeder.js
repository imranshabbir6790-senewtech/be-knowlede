import { Carousel } from '../models/Carousel.js';

const carouselSeeder = async () => {
  try {
    // Clear existing data
    await Carousel.deleteMany({});

    const carousels = [
      {
        language: 'en',
        position: 'top',
        images: [
          {
            imageUrl: 'https://via.placeholder.com/1200x400?text=English+Book+1',
            clickUrl: 'https://example.com/book-1',
            altText: 'English Book 1',
            order: 1,
          },
          {
            imageUrl: 'https://via.placeholder.com/1200x400?text=English+Book+2',
            clickUrl: 'https://example.com/book-2',
            altText: 'English Book 2',
            order: 2,
          },
          {
            imageUrl: 'https://via.placeholder.com/1200x400?text=English+Book+3',
            clickUrl: 'https://example.com/book-3',
            altText: 'English Book 3',
            order: 3,
          },
        ],
        rotationInterval: 60000,
        isActive: true,
      },
      {
        language: 'en',
        position: 'bottom',
        images: [
          {
            imageUrl: 'https://via.placeholder.com/1200x400?text=Featured+Book+1',
            clickUrl: 'https://example.com/featured-1',
            altText: 'Featured Book 1',
            order: 1,
          },
          {
            imageUrl: 'https://via.placeholder.com/1200x400?text=Featured+Book+2',
            clickUrl: 'https://example.com/featured-2',
            altText: 'Featured Book 2',
            order: 2,
          },
        ],
        rotationInterval: 60000,
        isActive: true,
      },
      {
        language: 'ar',
        position: 'top',
        images: [
          {
            imageUrl: 'https://via.placeholder.com/1200x400?text=Arabic+Book+1',
            clickUrl: 'https://example.com/ar/book-1',
            altText: 'كتاب عربي 1',
            order: 1,
          },
          {
            imageUrl: 'https://via.placeholder.com/1200x400?text=Arabic+Book+2',
            clickUrl: 'https://example.com/ar/book-2',
            altText: 'كتاب عربي 2',
            order: 2,
          },
        ],
        rotationInterval: 60000,
        isActive: true,
      },
      {
        language: 'fr',
        position: 'top',
        images: [
          {
            imageUrl: 'https://via.placeholder.com/1200x400?text=French+Book+1',
            clickUrl: 'https://example.com/fr/book-1',
            altText: 'Livre Français 1',
            order: 1,
          },
        ],
        rotationInterval: 60000,
        isActive: true,
      },
    ];

    await Carousel.insertMany(carousels);
    console.log('✓ Carousel seeder completed');
  } catch (error) {
    console.error('✗ Carousel seeder failed:', error.message);
    throw error;
  }
};

export default carouselSeeder;
