const https = require('https');
const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'assets', 'js');

if (!fs.existsSync(jsDir)) {
    fs.mkdirSync(jsDir, { recursive: true });
}

const urls = [
    { url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js', name: 'gsap.min.js' },
    { url: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js', name: 'ScrollTrigger.min.js' }
];

urls.forEach(u => {
    const dest = path.join(jsDir, u.name);
    console.log(`Downloading ${u.url} -> ${dest}`);
    
    https.get(u.url, (res) => {
        if (res.statusCode !== 200) {
            console.error(`Failed to download ${u.name}: status code ${res.statusCode}`);
            return;
        }
        
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        
        fileStream.on('finish', () => {
            fileStream.close();
            console.log(`Successfully downloaded ${u.name}`);
        });
    }).on('error', (err) => {
        console.error(`Error downloading ${u.name}:`, err.message);
    });
});
