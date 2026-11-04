const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '../public/assets/laptops');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const IMAGES_TO_FETCH = [
  {
    name: 'dell_latitude_7400.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Latitude.jpg'
  },
  {
    name: 'thinkpad_x230.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/ThinkPad_X230-9670.jpg'
  },
  {
    name: 'macbook_a1708.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Late_2016_MacBook_Pro.jpg'
  },
  {
    name: 'hp_elitebook_840.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/EliteBook850G3-Open%20Touch.jpg'
  },
  {
    name: 'dell_inspiron_15.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dell_Inspiron_7472.jpg'
  },
  {
    name: 'ideapad_series.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Lenovo_ideapad_300_300-14IBR.jpg'
  },
  {
    name: 'acer_aspire.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Acer_Aspire_3_Notebook.jpg'
  },
  {
    name: 'dell_inspiron_gaming.jpg',
    url: 'https://commons.wikimedia.org/wiki/Special:FilePath/Dell_Inspiron_15_7000_(7559)_(1).jpg'
  },
  {
    name: 'dell_latitude_business.jpg',
    url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'dell_vostro_business.jpg',
    url: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'hp_probook.jpg',
    url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'thinkbook_14.jpg',
    url: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'msi_modern.jpg',
    url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'asus_x553.jpg',
    url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80'
  }
];

function downloadFile(item) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, item.name);
    
    // Follow redirects
    const request = (currentUrl) => {
      https.get(currentUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          request(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          console.warn(`Failed to download ${item.name}: status ${res.statusCode}`);
          resolve(false);
          return;
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${item.name}`);
          resolve(true);
        });
      }).on('error', (err) => {
        console.warn(`Error downloading ${item.name}:`, err.message);
        resolve(false);
      });
    };

    request(item.url);
  });
}

async function run() {
  for (const item of IMAGES_TO_FETCH) {
    await downloadFile(item);
  }
  console.log('All downloads finished!');
}

run();
