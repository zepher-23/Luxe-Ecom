const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputPath = path.join(__dirname, '../frontend/public/favicon.png');
const tempPath = path.join(__dirname, '../frontend/public/favicon_temp.png');

async function cropImage() {
    try {
        const metadata = await sharp(inputPath).metadata();
        const width = metadata.width;
        const height = metadata.height;

        console.log(`Original dimensions: ${width}x${height}`);

        // Define crop region (center 50%)
        // Assuming 1024x1024, we want a 512x512 box in the center
        const extractWidth = Math.floor(width * 0.5);
        const extractHeight = Math.floor(height * 0.5);
        const left = Math.floor((width - extractWidth) / 2);
        const top = Math.floor((height - extractHeight) / 2);

        console.log(`Cropping to: ${extractWidth}x${extractHeight} starting at ${left},${top}`);

        await sharp(inputPath)
            .extract({ left: left, top: top, width: extractWidth, height: extractHeight })
            .toFile(tempPath);

        // Replace original
        fs.unlinkSync(inputPath);
        fs.renameSync(tempPath, inputPath);

        console.log('Favicon cropped successfully!');
    } catch (error) {
        console.error('Error cropping image:', error);
    }
}

cropImage();
