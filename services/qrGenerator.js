// qrGenerator.js
const QRCode = require('qrcode');
const path = require('path');
const fs = require('fs');

/**
 * Generate a QR code with embedded text over it.
 * @param {string} data - The data to encode in the QR code.
 */
async function generateQRWithText(data) {


  const tempPath = path.join(__dirname, 'qr-files');
   if (!fs.existsSync(tempPath)) {
      fs.mkdirSync(tempPath, { recursive: true });
    }
    
  const filePath = path.join(tempPath, `${data.timestamp}.png`)
  try {
    
    await QRCode.toFile(filePath, JSON.stringify(data));

  } catch (error) {
    console.error('Error generating QR with text:', error);
    throw error;
  }
}

module.exports = generateQRWithText;
