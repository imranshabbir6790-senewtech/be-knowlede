import { Dashboard } from '../models/Dashboard.js';

const dashboardSeeder = async () => {
  try {
    // Clear existing data
    await Dashboard.deleteMany({});

    const dashboards = [
      {
        language: 'en',
        pdfFile: null,
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        socialLinks: {
          discord: 'https://discord.gg/example',
          reddit: 'https://reddit.com/r/books',
        },
        isActive: true,
      },
      {
        language: 'ar',
        pdfFile: null,
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        socialLinks: {
          discord: 'https://discord.gg/example',
          reddit: 'https://reddit.com/r/books',
        },
        isActive: true,
      },
      {
        language: 'fr',
        pdfFile: null,
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        socialLinks: {
          discord: 'https://discord.gg/example',
          reddit: 'https://reddit.com/r/books',
        },
        isActive: true,
      },
      {
        language: 'es',
        pdfFile: null,
        youtubeUrl: null,
        socialLinks: {
          discord: 'https://discord.gg/example',
          reddit: null,
        },
        isActive: true,
      },
      {
        language: 'de',
        pdfFile: null,
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        socialLinks: {
          discord: null,
          reddit: 'https://reddit.com/r/books',
        },
        isActive: true,
      },
    ];

    await Dashboard.insertMany(dashboards);
    console.log('✓ Dashboard seeder completed');
  } catch (error) {
    console.error('✗ Dashboard seeder failed:', error.message);
    throw error;
  }
};

export default dashboardSeeder;
