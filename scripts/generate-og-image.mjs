import sharp from "sharp";

// Create a 1200x630 OG image with brand colors and text
const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f0f5ff"/>
      <stop offset="50%" style="stop-color:#e0eaff"/>
      <stop offset="100%" style="stop-color:#ffffff"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <text x="80" y="260" font-family="sans-serif" font-weight="800" font-size="96" fill="#3B82F6" letter-spacing="-2">STUDIO</text>
  <text x="80" y="380" font-family="sans-serif" font-weight="800" font-size="96" fill="#3B82F6" letter-spacing="-2">SAITAMA</text>
  <text x="80" y="460" font-family="sans-serif" font-weight="400" font-size="28" fill="#64748b">AI × Creative で、スモールチームの突破口をつくる</text>
  <text x="80" y="560" font-family="sans-serif" font-weight="400" font-size="20" fill="#94a3b8">studiosaitama.com</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile("public/og-image.png");
console.log("OG image generated: public/og-image.png");
