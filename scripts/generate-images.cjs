const fs = require('fs');
const path = require('path');

// Emoji mapping for each word
const emojiMap = {
  // Alphabet example words
  'apple': { emoji: '🍎', bg: '#FFE5E5', color: '#FF4444' },
  'ball': { emoji: '⚽', bg: '#E5F0FF', color: '#4488FF' },
  'cat': { emoji: '🐱', bg: '#FFF5E5', color: '#FF9933' },
  'dog': { emoji: '🐶', bg: '#F0E5FF', color: '#9944FF' },
  'elephant': { emoji: '🐘', bg: '#E5E5F0', color: '#7777AA' },
  'fish': { emoji: '🐟', bg: '#E5F5FF', color: '#33AAFF' },
  'grape': { emoji: '🍇', bg: '#F0E5FF', color: '#9933CC' },
  'hat': { emoji: '🎩', bg: '#F5F5F5', color: '#333333' },
  'ice-cream': { emoji: '🍦', bg: '#FFF0F5', color: '#FF77AA' },
  'juice': { emoji: '🧃', bg: '#FFFDE5', color: '#FFAA00' },
  'kite': { emoji: '🪁', bg: '#E5FFF0', color: '#33CC77' },
  'lion': { emoji: '🦁', bg: '#FFF5E0', color: '#CC8800' },
  'monkey': { emoji: '🐵', bg: '#F5EBE0', color: '#996633' },
  'nose': { emoji: '👃', bg: '#FFE8D5', color: '#CC7744' },
  'orange': { emoji: '🍊', bg: '#FFF0E0', color: '#FF8800' },
  'pig': { emoji: '🐷', bg: '#FFE5F0', color: '#FF77AA' },
  'queen': { emoji: '👑', bg: '#FFFDE0', color: '#FFD700' },
  'rabbit': { emoji: '🐰', bg: '#FFF5F5', color: '#FFAAAA' },
  'sun': { emoji: '☀️', bg: '#FFFDE0', color: '#FFD700' },
  'tiger': { emoji: '🐯', bg: '#FFF0E0', color: '#FF8833' },
  'umbrella': { emoji: '☂️', bg: '#E0E5FF', color: '#5555FF' },
  'van': { emoji: '🚐', bg: '#E5F5E5', color: '#44AA44' },
  'water': { emoji: '💧', bg: '#E0F0FF', color: '#3399FF' },
  'xylophone': { emoji: '🎵', bg: '#FFE5F5', color: '#FF55AA' },
  'yellow': { emoji: '💛', bg: '#FFFDE0', color: '#FFCC00' },
  'zebra': { emoji: '🦓', bg: '#F0F0F0', color: '#333333' },

  // Food-Ingredients (additional)
  'banana': { emoji: '🍌', bg: '#FFFDE0', color: '#FFD700' },
  'carrot': { emoji: '🥕', bg: '#FFF0E0', color: '#FF7722' },
  'egg': { emoji: '🥚', bg: '#FFFFF0', color: '#CCAA66' },
  'milk': { emoji: '🥛', bg: '#F5F5FF', color: '#AAAACC' },
  'rice': { emoji: '🍚', bg: '#FFFFF5', color: '#CCBB88' },
  'tomato': { emoji: '🍅', bg: '#FFE5E5', color: '#FF3333' },
  'bread': { emoji: '🍞', bg: '#FFF5E0', color: '#CC9944' },
  'cheese': { emoji: '🧀', bg: '#FFFDE0', color: '#FFCC00' },
  'chicken': { emoji: '🍗', bg: '#FFF0E0', color: '#CC8844' },
  'corn': { emoji: '🌽', bg: '#FFFDE0', color: '#FFCC33' },
  'lemon': { emoji: '🍋', bg: '#FFFFF0', color: '#CCCC00' },
  'meat': { emoji: '🥩', bg: '#FFE5E5', color: '#CC4444' },
  'potato': { emoji: '🥔', bg: '#F5EBD5', color: '#AA8844' },
  'salt': { emoji: '🧂', bg: '#F5F5F5', color: '#888888' },
  'sugar': { emoji: '🍬', bg: '#FFF0F5', color: '#FF88AA' },

  // Cooking
  'bowl': { emoji: '🥣', bg: '#F0F5FF', color: '#5577CC' },
  'cup': { emoji: '☕', bg: '#F5EBE0', color: '#996633' },
  'fork': { emoji: '🍴', bg: '#F0F0F0', color: '#888888' },
  'knife': { emoji: '🔪', bg: '#F0F0F0', color: '#777777' },
  'plate': { emoji: '🍽️', bg: '#F5F5FF', color: '#9999CC' },
  'pot': { emoji: '🍲', bg: '#FFE5D5', color: '#CC7733' },
  'spoon': { emoji: '🥄', bg: '#F5F0E5', color: '#AA9966' },
  'stove': { emoji: '🔥', bg: '#FFE5E0', color: '#FF5533' },
  'table': { emoji: '🪑', bg: '#F5EBD5', color: '#997744' },
  'chair': { emoji: '💺', bg: '#E5F0FF', color: '#5588CC' },
  'chopsticks': { emoji: '🥢', bg: '#FFE5D5', color: '#CC7733' },
  'glass': { emoji: '🥃', bg: '#F0F5FF', color: '#7799CC' },
  'kettle': { emoji: '🫖', bg: '#F5F0E5', color: '#AA9966' },
  'oven': { emoji: '♨️', bg: '#FFE5E0', color: '#CC4433' },
  'pan': { emoji: '🍳', bg: '#FFFDE0', color: '#CCAA33' },
  'bottle': { emoji: '🍼', bg: '#E5F5FF', color: '#55AACC' },
  'napkin': { emoji: '🧻', bg: '#FFFFF5', color: '#CCBB99' },
  'dish': { emoji: '🥘', bg: '#FFE5D5', color: '#CC7733' },
  'tray': { emoji: '🫕', bg: '#F0F0F5', color: '#888899' },
  'lid': { emoji: '⭕', bg: '#F5F5F5', color: '#999999' },

  // Animals (additional)
  'bird': { emoji: '🐦', bg: '#E5F5FF', color: '#5599CC' },
  'bear': { emoji: '🐻', bg: '#F5EBD5', color: '#996633' },
  'cow': { emoji: '🐮', bg: '#F5F5F5', color: '#666666' },
  'sheep': { emoji: '🐑', bg: '#F5F5F5', color: '#999999' },
  'horse': { emoji: '🐴', bg: '#F5EBD5', color: '#885522' },
  'duck': { emoji: '🦆', bg: '#E5FFF0', color: '#33AA66' },
  'frog': { emoji: '🐸', bg: '#E5FFE5', color: '#33CC33' },
  'giraffe': { emoji: '🦒', bg: '#FFFDE0', color: '#CCAA33' },
  'panda': { emoji: '🐼', bg: '#F0F0F0', color: '#333333' },
  'fox': { emoji: '🦊', bg: '#FFF0E0', color: '#FF7733' },
  'wolf': { emoji: '🐺', bg: '#E5E5F0', color: '#666688' },

  // Vehicles (additional)
  'car': { emoji: '🚗', bg: '#FFE5E5', color: '#FF4444' },
  'bus': { emoji: '🚌', bg: '#FFFDE0', color: '#FFAA00' },
  'train': { emoji: '🚂', bg: '#E5E5F0', color: '#555588' },
  'airplane': { emoji: '✈️', bg: '#E5F0FF', color: '#4488CC' },
  'bike': { emoji: '🚲', bg: '#E5FFE5', color: '#44AA44' },
  'boat': { emoji: '⛵', bg: '#E5F5FF', color: '#3399CC' },
  'truck': { emoji: '🚛', bg: '#E5F0E5', color: '#558855' },
  'taxi': { emoji: '🚕', bg: '#FFFDE0', color: '#FFCC00' },
  'ship': { emoji: '🚢', bg: '#E0E5F5', color: '#4466AA' },
  'helicopter': { emoji: '🚁', bg: '#E5F0FF', color: '#5588CC' },
  'motorcycle': { emoji: '🏍️', bg: '#F0E5E5', color: '#AA4444' },
  'subway': { emoji: '🚇', bg: '#E5E5F0', color: '#555577' },
  'scooter': { emoji: '🛴', bg: '#E5FFE5', color: '#55AA55' },
  'rocket': { emoji: '🚀', bg: '#E5E5FF', color: '#5555CC' },
  'ambulance': { emoji: '🚑', bg: '#FFE5E5', color: '#FF3333' },
  'police-car': { emoji: '🚓', bg: '#E5E5F5', color: '#4444AA' },
  'fire-truck': { emoji: '🚒', bg: '#FFE5E0', color: '#FF3322' },
  'tram': { emoji: '🚊', bg: '#E5F0E5', color: '#448844' },
  'yacht': { emoji: '🛥️', bg: '#E0F0FF', color: '#3388CC' },

  // Body Parts
  'head': { emoji: '🧑', bg: '#FFE8D5', color: '#CC8855' },
  'eye': { emoji: '👁️', bg: '#E5F0FF', color: '#4477CC' },
  'ear': { emoji: '👂', bg: '#FFE8D5', color: '#CC8855' },
  'mouth': { emoji: '👄', bg: '#FFE5E5', color: '#FF4455' },
  'hand': { emoji: '✋', bg: '#FFE8D5', color: '#CC8855' },
  'foot': { emoji: '🦶', bg: '#FFE8D5', color: '#CC8855' },
  'arm': { emoji: '💪', bg: '#FFE8D5', color: '#CC8855' },
  'leg': { emoji: '🦵', bg: '#FFE8D5', color: '#CC8855' },
  'hair': { emoji: '💇', bg: '#F5EBD5', color: '#885522' },
  'finger': { emoji: '☝️', bg: '#FFE8D5', color: '#CC8855' },
  'toe': { emoji: '🦶', bg: '#FFE8D5', color: '#CC8855' },
  'knee': { emoji: '🦵', bg: '#FFE8D5', color: '#CC8855' },
  'elbow': { emoji: '💪', bg: '#FFE8D5', color: '#CC8855' },
  'shoulder': { emoji: '🤷', bg: '#E5F0FF', color: '#5588CC' },
  'neck': { emoji: '🧣', bg: '#FFE5E5', color: '#FF5555' },
  'back': { emoji: '🔙', bg: '#E5F0FF', color: '#5588CC' },
  'chest': { emoji: '🫁', bg: '#FFE5F0', color: '#CC5577' },
  'stomach': { emoji: '🤰', bg: '#FFE8D5', color: '#CC8855' },
  'face': { emoji: '😊', bg: '#FFFDE0', color: '#FFAA00' },
};

function generateSVG(word, { emoji, bg, color }) {
  const displayWord = word.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="200" height="200" rx="20" fill="${bg}" stroke="${color}" stroke-width="3"/>
  <text x="100" y="95" text-anchor="middle" font-size="80" filter="url(#shadow)">${emoji}</text>
  <rect x="15" y="145" width="170" height="40" rx="10" fill="white" opacity="0.8"/>
  <text x="100" y="172" text-anchor="middle" font-family="Arial, sans-serif" font-size="${displayWord.length > 8 ? 16 : displayWord.length > 6 ? 18 : 22}" font-weight="bold" fill="${color}">${displayWord}</text>
</svg>`;
}

// Create output directory
const outputDir = path.join(__dirname, '..', 'public', 'assets', 'images');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate all SVG files
let count = 0;
for (const [word, config] of Object.entries(emojiMap)) {
  const svg = generateSVG(word, config);
  const filePath = path.join(outputDir, `${word}.svg`);
  fs.writeFileSync(filePath, svg, 'utf-8');
  count++;
}

console.log(`Generated ${count} SVG images in ${outputDir}`);
