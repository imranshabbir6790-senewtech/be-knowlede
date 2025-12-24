import { connectDB, disconnectDB } from '../config/database.js';
import carouselSeeder from './carouselSeeder.js';
import dashboardSeeder from './dashboardSeeder.js';
import pdfSeeder from './pdfSeeder.js';

const runAllSeeders = async () => {
  try {
    console.log('\n🌱 Starting database seeders...\n');

    await connectDB();

    await carouselSeeder();
    await dashboardSeeder();
    await pdfSeeder();

    console.log('\n✓ All seeders completed successfully!\n');
    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Seeder failed:', error.message);
    await disconnectDB();
    process.exit(1);
  }
};

runAllSeeders();
