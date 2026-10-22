const databaseName = 'cyber-m-character-art';
const listeners = new Set();
const images = new Map();
let loading;

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
      request.result.forEach(row => images.set(row.key_c, { ...row, url_c: URL.createObjectURL(row.file_c) }));
      db.close();
      listeners.forEach(listener => listener());
      resolve();
    };
    request.onerror = () => { db.close(); reject(request.error); };
  }));
  return loading;
}

export function getCharacterImage(name) { return images.get(name); }
export function subscribeCharacterImages(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export async function saveCharacterImage(key, file) {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) throw new Error('Chọn ảnh PNG, JPG hoặc WebP.');
  if (file.size > 15 * 1024 * 1024) throw new Error('Ảnh cần nhỏ hơn 15 MB.');
  const url = URL.createObjectURL(file);
  try {
    await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = resolve;
      image.onerror = () => reject(new Error('Không đọc được ảnh đã chọn.'));
      image.src = url;
    });
    await loadCharacterImages();
    const row = { key_c: key, name_c: file.name.replace(/\.[^.]+$/, ''), file_c: file };
    const db = await openDatabase();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction('portraits', 'readwrite');
      transaction.objectStore('portraits').put(row);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error);
    }).finally(() => db.close());
    const previous = images.get(key);
    if (previous) URL.revokeObjectURL(previous.url_c);
    images.set(key, { ...row, url_c: url });
    listeners.forEach(listener => listener());
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

export function characterName(name) { return images.get(name)?.name_c || name; }
export function characterText(text = '') {
  let result = text;
  [...images.entries()].sort(([a], [b]) => b.length - a.length).forEach(([key, row]) => {
    result = result.replace(new RegExp(`(^|[^\\p{L}])${key}(?=$|[^\\p{L}])`, 'gu'), (_, prefix) => `${prefix}${row.name_c}`);
  });
  return result;
}