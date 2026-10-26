const databaseName = 'cyber-m-character-art';
const listeners = new Set();
const images = new Map();

const builtInImages = {
  'An': { key: 'An', key_c: 'An', name: 'An', name_c: 'An', url: '/characters/An.png', url_c: '/characters/An.png', built_in_c: true },
  'Bảo Linh': { key: 'Bảo Linh', key_c: 'Bảo Linh', name: 'Bảo Linh', name_c: 'Bảo Linh', url: '/characters/Bảo Linh.png', url_c: '/characters/Bảo Linh.png', built_in_c: true },
  'Phúc': { key: 'Phúc', key_c: 'Phúc', name: 'Phúc', name_c: 'Phúc', url: '/characters/Phúc.png', url_c: '/characters/Phúc.png', built_in_c: true },
  'Đức': { key: 'Đức', key_c: 'Đức', name: 'Đức', name_c: 'Đức', url: '/characters/Đức.png', url_c: '/characters/Đức.png', built_in_c: true },
  'Hạ Vy': { key: 'Hạ Vy', key_c: 'Hạ Vy', name: 'Hạ Vy', name_c: 'Hạ Vy', url: '/characters/Hạ Vy.png', url_c: '/characters/Hạ Vy.png', built_in_c: true },
  'Mai': { key: 'Mai', key_c: 'Mai', name: 'Mai', name_c: 'Mai', url: '/characters/Mai.png', url_c: '/characters/Mai.png', built_in_c: true },
  'Minh Khoa': { key: 'Minh Khoa', key_c: 'Minh Khoa', name: 'Minh Khoa', name_c: 'Minh Khoa', url: '/characters/Minh Khoa.png', url_c: '/characters/Minh Khoa.png', built_in_c: true },
  'Quân': { key: 'Quân', key_c: 'Quân', name: 'Quân', name_c: 'Quân', url: '/characters/Quân.png', url_c: '/characters/Quân.png', built_in_c: true },
  'Trâm': { key: 'Trâm', key_c: 'Trâm', name: 'Trâm', name_c: 'Trâm', url: '/characters/Trâm.png', url_c: '/characters/Trâm.png', built_in_c: true },
  'Vũ Khải': { key: 'Vũ Khải', key_c: 'Vũ Khải', name: 'Vũ Khải', name_c: 'Vũ Khải', url: '/characters/Vũ Khải.png', url_c: '/characters/Vũ Khải.png', built_in_c: true },
  'Yến': { key: 'Yến', key_c: 'Yến', name: 'Yến', name_c: 'Yến', url: '/characters/Yến.png', url_c: '/characters/Yến.png', built_in_c: true },
  'Cyber-M': { key: 'Cyber-M', key_c: 'Cyber-M', name: 'Cyber-M', name_c: 'Cyber-M', url: '/characters/Cyber-M.png', url_c: '/characters/Cyber-M.png', built_in_c: true }
};

let loading;

async function storePortrait(row) {
  const db = await openDatabase();
  try {
    await new Promise((resolve, reject) => {
      const transaction = db.transaction('portraits', 'readwrite');
      transaction.objectStore('portraits').put(row);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    });
  } finally { db.close(); }
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(databaseName, 1);
    request.onupgradeneeded = () => request.result.createObjectStore('portraits', { keyPath: 'key_c' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function loadCharacterImages() {
  if (!loading) loading = openDatabase().then(db => new Promise((resolve, reject) => {
    const request = db.transaction('portraits').objectStore('portraits').getAll();
    request.onsuccess = () => {
      request.result.forEach(row => {
        const k = row.key_c || row.key;
        const fileObj = row.file_c || row.file;
        const u = fileObj ? URL.createObjectURL(fileObj) : (builtInImages[k]?.url || `/characters/${k}.png`);
        images.set(k, { ...row, url: u, url_c: u });
      });
      db.close();
      listeners.forEach(listener => listener());
      resolve();
    };
    request.onerror = () => { db.close(); reject(request.error); };
  }));
  return loading;
}

loadCharacterImages().catch(() => {});

export function getCharacterImage(name) {
  if (!name) return null;
  const targetKey = String(name).trim();
  const found = images.get(targetKey) || builtInImages[targetKey];
  
  if (found) {
    const finalUrl = found.url || found.url_c;
    const finalName = found.name || found.name_c;
    return {
      ...found,
      url: finalUrl,
      url_c: finalUrl,
      name: finalName,
      name_c: finalName
    };
  }

  return {
    key: targetKey,
    key_c: targetKey,
    name: targetKey,
    name_c: targetKey,
    url: `/characters/${targetKey}.png`,
    url_c: `/characters/${targetKey}.png`,
    built_in_c: true
  };
}

export function subscribeCharacterImages(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export async function saveCharacterImage(key, file) {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) throw new Error('Chọn ảnh định dạng PNG, JPG hoặc WebP.');
  if (file.size > 15 * 1024 * 1024) throw new Error('Ảnh cần nhỏ hơn 15 MB.');
  const tempUrl = URL.createObjectURL(file);
  try {
    await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = () => reject(new Error('Không đọc được ảnh.'));
      image.src = tempUrl;
    });
    await loadCharacterImages();
    const row = { key: key, key_c: key, name: file.name.replace(/\.[^.]+$/, ''), name_c: file.name.replace(/\.[^.]+$/, ''), file: file, file_c: file, cutout: true, cutout_c: true };
    await storePortrait(row);
    const previous = images.get(key);
    if (previous?.url) URL.revokeObjectURL(previous.url);
    const newUrl = URL.createObjectURL(file);
    images.set(key, { ...row, url: newUrl, url_c: newUrl });
    URL.revokeObjectURL(tempUrl);
    listeners.forEach(listener => listener());
  } catch (error) {
    URL.revokeObjectURL(tempUrl);
    throw error;
  }
}

export function characterName(name) { 
  const res = getCharacterImage(name);
  return res?.name || res?.name_c || name; 
}

export function characterText(text = '') {
  let result = text;
  const allEntries = [
    ...Object.entries(builtInImages),
    ...images.entries()
  ];

  allEntries.sort(([a], [b]) => b.length - a.length).forEach(([key, row]) => {
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const displayName = row.name || row.name_c || key;
    result = result.replace(new RegExp(`(^|[^\\p{L}])${escapedKey}(?=$|[^\\p{L}])`, 'gu'), (_, prefix) => `${prefix}${displayName}`);
  });

  return result;
}