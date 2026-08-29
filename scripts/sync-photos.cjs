const https = require('https');
const fs = require('fs');
const path = require('path');

const ALBUM_FOLDERS = {
  'degree-distribution': '1xAbTfEoEojO-mByrszg85xF73UfMuXk7',
  'convocation-evening': '1y3MvFvY2KYi7TogjZeeCPb7u7IBfCsZk',
  'alumni-meet': '1ic2XwUD-DcSQOB-f8ZjBde01D9OgJWSv',
  'speaker-session': '1eA9osd542-FO_he4UOJf20EQpviATCKm'
};

async function fetchFolderFiles(folderId) {
  const url = `https://drive.google.com/embeddedfolderview?id=${folderId}#grid`;
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const fileRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/g;
        const driveItemRegex = /data-id="([a-zA-Z0-9_-]+)"/g;

        const files = [];
        let m;
        while ((m = fileRegex.exec(data)) !== null) files.push(m[1]);
        while ((m = driveItemRegex.exec(data)) !== null) files.push(m[1]);

        const uniqueFiles = [...new Set(files)];
        resolve(uniqueFiles);
      });
    }).on('error', (err) => {
      console.error(`Error fetching folder ${folderId}:`, err);
      resolve([]);
    });
  });
}

async function syncAll() {
  console.log('🔄 Syncing Google Drive Photo Albums...');
  const result = {};

  for (const [slug, folderId] of Object.entries(ALBUM_FOLDERS)) {
    console.log(`Fetching album: ${slug} (${folderId})...`);
    const fileIds = await fetchFolderFiles(folderId);
    console.log(`-> Found ${fileIds.length} photos for ${slug}`);
    result[slug] = fileIds.map((id, index) => ({
      id: index + 1,
      driveId: id,
      url: `https://lh3.googleusercontent.com/d/${id}`,
      viewUrl: `https://drive.google.com/file/d/${id}/view?usp=sharing`
    }));
  }

  const outDir = 'd:\\CODING\\Development\\PROJECTS\\ConvocationIIITBH\\src\\data';
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'drivePhotos.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log(`✅ Saved all extracted Google Drive photos to ${outPath}`);
}

syncAll();
