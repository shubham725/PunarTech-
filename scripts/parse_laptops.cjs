const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '../public/assets/aistudio/PunarTech_WhatsApp_Laptop_Posts_2026_f06d4650.txt'), 'utf8');
const blocks = content.split('======================================').map(b => b.trim()).filter(Boolean);

console.log('Processing', blocks.length, 'blocks...');

// Specific model photographic assets
function getModelImage(brand, model, rawTitle) {
  const t = rawTitle.toLowerCase();
  
  if (brand === 'Apple') {
    return '/assets/laptops/macbook_a1708.jpg';
  }
  
  if (brand === 'Dell') {
    if (t.includes('latitude 7400') || t.includes('touchscreen')) {
      return '/assets/laptops/dell_latitude_7400.jpg';
    }
    if (t.includes('latitude')) {
      return '/assets/laptops/dell_latitude_business.jpg';
    }
    if (t.includes('vostro')) {
      return '/assets/laptops/dell_vostro_business.jpg';
    }
    if (t.includes('xps')) {
      return '/assets/laptops/dell_latitude_7400.jpg';
    }
    // Inspiron
    return '/assets/laptops/dell_inspiron_15.jpg';
  }

  if (brand === 'Lenovo') {
    if (t.includes('thinkpad') || t.includes('ts30') || t.includes('x230')) {
      return '/assets/laptops/thinkpad_x230.jpg';
    }
    if (t.includes('thinkbook')) {
      return '/assets/laptops/thinkbook_14.jpg';
    }
    // IdeaPad
    return '/assets/laptops/ideapad_series.jpg';
  }

  if (brand === 'HP') {
    if (t.includes('elitebook') || t.includes('folio')) {
      return '/assets/laptops/hp_elitebook_840.jpg';
    }
    if (t.includes('probook')) {
      return '/assets/laptops/hp_probook.jpg';
    }
    // Pavilion / Notebook
    return '/assets/laptops/hp_notebook_general.jpg';
  }

  if (brand === 'Acer') {
    return '/assets/laptops/acer_aspire.jpg';
  }

  if (brand === 'MSI') {
    return '/assets/laptops/msi_modern.jpg';
  }

  if (brand === 'ASUS') {
    return '/assets/laptops/asus_x553.jpg';
  }

  return '/assets/laptops/dell_latitude_business.jpg';
}

const laptops = [];

blocks.forEach((block, index) => {
  // Extract Stock ID and Branch
  const branchStockMatch = block.match(/Branch:\*\s*(Pune|Delhi)\s*\|\s*\*Stock ID:\*\s*(PT\/[A-Z0-9]+)/);
  if (!branchStockMatch) {
    console.error('Failed to parse branch/stock in block', index, block);
    return;
  }
  const branch = branchStockMatch[1];
  const stockId = branchStockMatch[2];

  // Extract Title / Model
  const titleMatch = block.match(/✨\s*\*(.*?)\*/);
  const rawTitle = titleMatch ? titleMatch[1].trim() : 'Laptop';
  
  // Brand
  let brand = 'Other';
  if (/^Dell/i.test(rawTitle)) brand = 'Dell';
  else if (/^HP/i.test(rawTitle)) brand = 'HP';
  else if (/^Lenovo/i.test(rawTitle)) brand = 'Lenovo';
  else if (/^Acer/i.test(rawTitle)) brand = 'Acer';
  else if (/^Apple/i.test(rawTitle)) brand = 'Apple';
  else if (/^ASUS/i.test(rawTitle)) brand = 'ASUS';
  else if (/^MSI/i.test(rawTitle)) brand = 'MSI';

  // Model name without brand prefix
  const model = rawTitle.replace(new RegExp(`^${brand}\\s+`, 'i'), '').trim();

  // Processor
  const procMatch = block.match(/🔹\s*\*Processor:\*\s*(.*)/);
  const processor = procMatch ? procMatch[1].trim() : 'Not specified';

  // Processor classification
  let processorCategory = 'Other';
  if (/Core i7/i.test(processor) || /\bi7\b/i.test(processor)) processorCategory = 'Intel Core i7';
  else if (/Core i5/i.test(processor) || /\bi5\b/i.test(processor)) processorCategory = 'Intel Core i5';
  else if (/Core i3/i.test(processor) || /\bi3\b/i.test(processor)) processorCategory = 'Intel Core i3';
  else if (/Ryzen/i.test(processor)) processorCategory = 'AMD Ryzen';
  else if (/Athlon/i.test(processor)) processorCategory = 'AMD Athlon';
  else if (/AMD A\d+/i.test(processor) || /AMD/i.test(processor)) processorCategory = 'AMD A-Series';
  else if (/Pentium/i.test(processor)) processorCategory = 'Pentium';

  // Generation
  const genMatch = processor.match(/(\d+)(?:st|nd|rd|th)\s+Gen/i);
  const generation = genMatch ? parseInt(genMatch[1], 10) : null;

  // RAM
  const ramMatch = block.match(/🔹\s*\*RAM:\*\s*(.*)/);
  const ramText = ramMatch ? ramMatch[1].trim() : '8GB';
  const ramGbMatch = ramText.match(/(\d+)\s*GB/i);
  const ramGb = ramGbMatch ? parseInt(ramGbMatch[1], 10) : 8;

  // Storage
  const storageMatch = block.match(/🔹\s*\*Storage:\*\s*(.*)/);
  const storageRaw = storageMatch ? storageMatch[1].trim() : 'Not specified';
  
  let ssdGb = null;
  let ssdText = 'No SSD';
  if (!/No SSD listed/i.test(storageRaw)) {
    const ssdM = storageRaw.match(/(\d+)\s*GB\s*SSD/i);
    if (ssdM) {
      ssdGb = parseInt(ssdM[1], 10);
      ssdText = `${ssdGb}GB SSD`;
    }
  }

  let hddGb = null;
  let hddText = null;
  const hddTbM = storageRaw.match(/(\d+)\s*TB\s*HDD/i);
  if (hddTbM) {
    hddGb = parseInt(hddTbM[1], 10) * 1000;
    hddText = `${hddTbM[1]}TB HDD`;
  } else {
    const hddGbM = storageRaw.match(/(\d+)\s*GB\s*HDD/i);
    if (hddGbM) {
      hddGb = parseInt(hddGbM[1], 10);
      hddText = `${hddGb}GB HDD`;
    }
  }

  let storageType = 'SSD only';
  if (ssdGb && hddGb) {
    storageType = 'SSD + HDD';
  } else if (!ssdGb && hddGb) {
    storageType = 'HDD only';
  } else if (ssdGb && !hddGb) {
    storageType = 'SSD only';
  }

  // Graphics
  const graphicsMatch = block.match(/🔹\s*\*Graphics:\*\s*(.*)/);
  const graphicsRaw = graphicsMatch ? graphicsMatch[1].trim() : 'Graphics not specified';
  
  let hasDedicatedGraphics = false;
  let dedicatedGraphics = null;
  let graphicsBrand = 'Not specified';

  if (/dedicated/i.test(graphicsRaw) || /Radeon|NVIDIA/i.test(graphicsRaw)) {
    hasDedicatedGraphics = /dedicated/i.test(graphicsRaw);
    if (/NVIDIA/i.test(graphicsRaw)) {
      graphicsBrand = 'NVIDIA';
      const m = graphicsRaw.match(/(\d+GB\s+NVIDIA\s+dedicated)/i);
      dedicatedGraphics = m ? m[1] : 'NVIDIA Dedicated GPU';
      hasDedicatedGraphics = true;
    } else if (/Radeon/i.test(graphicsRaw)) {
      graphicsBrand = 'Radeon';
      const m = graphicsRaw.match(/(\d+GB\s+Radeon\s+dedicated)/i);
      dedicatedGraphics = m ? m[1] : 'Radeon Dedicated GPU';
      hasDedicatedGraphics = true;
    } else if (hasDedicatedGraphics) {
      dedicatedGraphics = 'Dedicated Graphics';
    }
  } else if (/Intel/i.test(graphicsRaw)) {
    graphicsBrand = 'Intel Integrated';
  }

  // Display
  const displayMatch = block.match(/🔹\s*\*Display:\*\s*(.*)/);
  const displayRaw = displayMatch ? displayMatch[1].trim() : 'Not listed';
  
  let displayClass = 'Not specified';
  if (/13/i.test(displayRaw)) displayClass = '13-inch class';
  else if (/15\.6/i.test(displayRaw)) displayClass = '15.6-inch class';
  else if (/15/i.test(displayRaw)) displayClass = '15-inch class';
  else if (/14/i.test(displayRaw)) displayClass = '14-inch class';

  // Price
  const priceMatch = block.match(/💰\s*\*Price:\s*(.*?)\*/);
  const priceRaw = priceMatch ? priceMatch[1].trim() : 'Please contact us';
  
  let sellingPrice = null;
  let hasPrice = false;
  if (/₹/i.test(priceRaw)) {
    const num = parseInt(priceRaw.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(num)) {
      sellingPrice = num;
      hasPrice = true;
    }
  }

  // Suitable for text
  const suitMatch = block.match(/✅\s*(.*)/);
  const suitableFor = suitMatch ? suitMatch[1].trim() : 'Suitable for work, study, and daily tasks.';

  // Image selection according to exact model family
  const imageUrl = getModelImage(brand, model, rawTitle);

  // Dynamic Badges (Rule-based)
  const badges = [];
  if (hasPrice && sellingPrice <= 15000 && ssdGb) {
    badges.push('Budget Pick');
  } else if (hasPrice && sellingPrice <= 23000 && (processorCategory === 'Intel Core i5' || processorCategory === 'Intel Core i7' || processorCategory === 'AMD Ryzen') && ssdGb) {
    badges.push('Best Value');
  }

  if (generation && generation >= 10) {
    badges.push('Latest Gen in Collection');
  }

  if (ramGb >= 16 || hasDedicatedGraphics) {
    badges.push('High-Performance Configuration');
  } else if (ramGb === 16) {
    badges.push('16GB RAM');
  }

  if (storageType === 'SSD + HDD') {
    badges.push('Dual Storage (SSD + HDD)');
  } else if (ssdGb && ssdGb >= 512) {
    badges.push('512GB Fast SSD');
  }

  // Highlights
  const highlights = [];
  highlights.push(`${ramGb}GB RAM for multitasking`);
  if (ssdGb) highlights.push(`${ssdGb}GB high-speed SSD`);
  if (hddGb) highlights.push(`${hddText} large secondary storage`);
  if (hasDedicatedGraphics && dedicatedGraphics) highlights.push(dedicatedGraphics);
  if (displayRaw !== 'Not listed') highlights.push(`${displayRaw} Display`);
  if (generation) highlights.push(`Intel ${generation}th Generation Processor`);
  highlights.push(`Available at ${branch} Branch`);

  laptops.push({
    id: stockId,
    stockId,
    branch,
    brand,
    model,
    fullName: rawTitle,
    processor,
    processorCategory,
    generation,
    ram: ramText,
    ramGb,
    storageRaw,
    storageType,
    ssdGb,
    ssdText,
    hddGb,
    hddText,
    graphicsRaw,
    hasDedicatedGraphics,
    dedicatedGraphics,
    graphicsBrand,
    display: displayRaw,
    displayClass,
    sellingPrice,
    hasPrice,
    originalPrice: null, // Never invent
    serialNumber: `SN-${stockId.replace('/', '-')}-INTERNAL`, // Kept strictly internal
    condition: 'Refurbished / Pre-owned (Verified Inventory)',
    availability: 'Available (Confirm before purchase)',
    badges,
    highlights,
    suitableFor,
    imageUrl,
    searchableText: `${stockId} ${rawTitle} ${brand} ${model} ${processor} ${ramText} ${storageRaw} ${graphicsRaw} ${displayRaw} ${branch} ${sellingPrice ? '₹' + sellingPrice : 'Contact for price'}`.toLowerCase()
  });
});

console.log('Total parsed laptops:', laptops.length);
const puneCount = laptops.filter(l => l.branch === 'Pune').length;
const delhiCount = laptops.filter(l => l.branch === 'Delhi').length;
const pricedCount = laptops.filter(l => l.hasPrice).length;
const unpricedCount = laptops.filter(l => !l.hasPrice).length;

console.log(`Pune: ${puneCount}, Delhi: ${delhiCount}, Priced: ${pricedCount}, Contact for Price: ${unpricedCount}`);

// Generate TypeScript file
const tsCode = `/**
 * PunarTech Verified Laptop Inventory
 * Total items: ${laptops.length} (Pune: ${puneCount}, Delhi: ${delhiCount})
 * Priced items: ${pricedCount}, Missing prices (Contact for Price): ${unpricedCount}
 * 
 * NOTE: This is the single source of truth for PunarTech inventory.
 * Update sellingPrice or add new items here directly.
 */

export interface Laptop {
  id: string;
  stockId: string;
  branch: 'Pune' | 'Delhi';
  brand: 'Dell' | 'HP' | 'Lenovo' | 'Acer' | 'Apple' | 'ASUS' | 'MSI' | 'Other';
  model: string;
  fullName: string;
  processor: string;
  processorCategory: 'Intel Core i3' | 'Intel Core i5' | 'Intel Core i7' | 'AMD Ryzen' | 'AMD Athlon' | 'AMD A-Series' | 'Pentium' | 'Other';
  generation: number | null;
  ram: string;
  ramGb: number;
  storageRaw: string;
  storageType: 'SSD only' | 'SSD + HDD' | 'HDD only';
  ssdGb: number | null;
  ssdText: string;
  hddGb: number | null;
  hddText: string | null;
  graphicsRaw: string;
  hasDedicatedGraphics: boolean;
  dedicatedGraphics: string | null;
  graphicsBrand: string;
  display: string;
  displayClass: '13-inch class' | '14-inch class' | '15-inch class' | '15.6-inch class' | 'Not specified';
  sellingPrice: number | null;
  hasPrice: boolean;
  originalPrice: number | null; // Strictly null unless genuine original invoice provided
  serialNumber: string; // Internal only, never render to customers
  condition: string;
  availability: string;
  badges: string[];
  highlights: string[];
  suitableFor: string;
  imageUrl: string;
  searchableText: string;
}

export interface InventoryStats {
  total: number;
  puneCount: number;
  delhiCount: number;
  pricedCount: number;
  unpricedCount: number;
  brands: { [brand: string]: number };
  priceRanges: {
    under12k: number;
    k12to15: number;
    k15to20: number;
    k20to25: number;
    k25to30: number;
    above30k: number;
    contactForPrice: number;
  };
}

export const WHATSAPP_CONFIG = {
  // Official PunarTech WhatsApp Community Group Link
  groupInviteUrl: 'https://chat.whatsapp.com/LGPhmaRzif3I91VUUa628L',
  // Direct business number
  businessNumber: '919834626078', 
  // PunarTech branding
  brandName: 'PunarTech',
  tagline: 'PunarTech On Top'
};

export function getLaptopWhatsAppUrl(laptop: Laptop): string {
  const priceText = laptop.hasPrice && laptop.sellingPrice !== null
    ? \`₹\${laptop.sellingPrice.toLocaleString('en-IN')}\`
    : 'Contact for Price';

  const message = \`Hello PunarTech, I want to enquire about this laptop:

📌 Model: \${laptop.fullName}
🏷️ Stock ID: \${laptop.stockId}
💰 Price: \${priceText}
📍 Branch: \${laptop.branch} Hub
⚙️ Processor: \${laptop.processor}
💾 RAM: \${laptop.ram}
📦 Storage: \${laptop.storageRaw}
🖥️ Display: \${laptop.display !== 'Not listed' ? laptop.display : 'Standard'}

Is this laptop currently available? Please share actual photos, battery health, and details.\`;

  return \`https://wa.me/919834626078?text=\${encodeURIComponent(message)}\`;
}

export const LAPTOP_INVENTORY: Laptop[] = ${JSON.stringify(laptops, null, 2)};

export const INVENTORY_STATS: InventoryStats = {
  total: ${laptops.length},
  puneCount: ${puneCount},
  delhiCount: ${delhiCount},
  pricedCount: ${pricedCount},
  unpricedCount: ${unpricedCount},
  brands: ${JSON.stringify(
    laptops.reduce((acc, cur) => {
      acc[cur.brand] = (acc[cur.brand] || 0) + 1;
      return acc;
    }, {})
  )},
  priceRanges: {
    under12k: ${laptops.filter(l => l.sellingPrice && l.sellingPrice < 12000).length},
    k12to15: ${laptops.filter(l => l.sellingPrice && l.sellingPrice >= 12000 && l.sellingPrice <= 15000).length},
    k15to20: ${laptops.filter(l => l.sellingPrice && l.sellingPrice > 15000 && l.sellingPrice <= 20000).length},
    k20to25: ${laptops.filter(l => l.sellingPrice && l.sellingPrice > 20000 && l.sellingPrice <= 25000).length},
    k25to30: ${laptops.filter(l => l.sellingPrice && l.sellingPrice > 25000 && l.sellingPrice <= 30000).length},
    above30k: ${laptops.filter(l => l.sellingPrice && l.sellingPrice > 30000).length},
    contactForPrice: ${unpricedCount}
  }
};
`;

const outDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.join(outDir, 'laptops.ts'), tsCode, 'utf8');
fs.writeFileSync(path.join(outDir, 'laptops.json'), JSON.stringify(laptops, null, 2), 'utf8');
console.log('Successfully wrote src/data/laptops.ts!');
