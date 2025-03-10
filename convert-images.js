import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, 'public');

async function convertImages() {
  try {
    // Convert logo to apple-touch-icon.png (180x180)
    await sharp(join(publicDir, 'wordpuzzles-logo.svg'))
      .resize(180, 180, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .png()
      .toFile(join(publicDir, 'apple-touch-icon.png'));

    // Convert logo to favicon.ico (32x32)
    await sharp(join(publicDir, 'wordpuzzles-logo.svg'))
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .toFile(join(publicDir, 'favicon.ico'));

    // Convert og-image.svg to og-image.png (1200x630)
    await sharp(join(publicDir, 'og-image.svg'))
      .resize(1200, 630)
      .png()
      .toFile(join(publicDir, 'og-image.png'));

    console.log('All images converted successfully!');
  } catch (error) {
    console.error('Error converting images:', error);
  }
}

convertImages(); 