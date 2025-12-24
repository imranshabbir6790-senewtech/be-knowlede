import { PDF } from '../models/PDF.js';

const pdfSeeder = async () => {
  try {
    // Clear existing data
    await PDF.deleteMany({});

    const pdfs = [
      {
        language: 'en',
        title: 'English Literature Guide',
        description: 'A comprehensive guide to English literature and reading.',
        fileName: 'english-guide.pdf',
        filePath: './uploads/sample-en.pdf',
        fileSize: 2048576,
        uploadedBy: 'admin',
        downloadCount: 0,
        isActive: true,
      },
      {
        language: 'ar',
        title: 'دليل الأدب العربي',
        description: 'دليل شامل للأدب العربي والقراءة.',
        fileName: 'arabic-guide.pdf',
        filePath: './uploads/sample-ar.pdf',
        fileSize: 2048576,
        uploadedBy: 'admin',
        downloadCount: 0,
        isActive: true,
      },
      {
        language: 'fr',
        title: 'Guide de la Littérature Française',
        description: 'Un guide complet de la littérature française et de la lecture.',
        fileName: 'french-guide.pdf',
        filePath: './uploads/sample-fr.pdf',
        fileSize: 2048576,
        uploadedBy: 'admin',
        downloadCount: 0,
        isActive: true,
      },
      {
        language: 'es',
        title: 'Guía de Literatura Española',
        description: 'Una guía completa de la literatura española y la lectura.',
        fileName: 'spanish-guide.pdf',
        filePath: './uploads/sample-es.pdf',
        fileSize: 2048576,
        uploadedBy: 'admin',
        downloadCount: 0,
        isActive: true,
      },
    ];

    await PDF.insertMany(pdfs);
    console.log('✓ PDF seeder completed');
  } catch (error) {
    console.error('✗ PDF seeder failed:', error.message);
    throw error;
  }
};

export default pdfSeeder;
