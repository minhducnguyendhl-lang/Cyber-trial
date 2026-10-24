import { toast } from 'sonner';

const databaseName = 'cyber-m-character-art';
const listeners = new Set();
const images = new Map();
const builtInImages = {
  'An': { key_c: 'An', name_c: 'An', url_c: '/characters/an.png', built_in_c: true },
  'Bảo Linh': { key_c: 'Bảo Linh', name_c: 'Bảo Linh', url_c: '/characters/Bảo Linh.png', built_in_c: true },
  'Phúc': { key_c: 'Phúc', name_c: 'Phúc', url_c: '/characters/Phúc.png', built_in_c: true },
  'Đức': { key_c: ' Đức', name_c: ' Đức', url_c: '/characters/Đức.png', built_in_c: true },
  'Hạ Vy': { key_c: 'Hạ Vy', name_c: 'Hạ Vy', url_c: '/characters/Hạ Vy.png', built_in_c: true },
  'Mai': { key_c: 'Mai', name_c: 'Mai', url_c: '/characters/Mai.png', built_in_c: true },
  'Minh Khoa': { key_c: 'Minh Khoa', name_c: 'Minh Khoa', url_c: '/characters/Minh Khoa.png', built_in_c: true },
  'Quân': { key_c: 'Quân', name_c: 'Quân', url_c: '/characters/Quân.png', built_in_c: true },
  'Trâm': { key_c: 'Trâm', name_c: 'Trâm', url_c: '/characters/Trâm.png', built_in_c: true },
  'Vũ Khải': { key_c: 'Vũ Khải', name_c: 'Vũ Khải', url_c: '/characters/Vũ Khải.png', built_in_c: true },
  'Yến': { key_c: 'Yến', name_c: 'Yến', url_c: '/characters/Yến.png', built_in_c: true },
  'Cyber-M': { key_c: 'Cyber-M', name_c: 'Cyber-M', url_c: '/characters/Cyber-M.png', built_in_c: true }
};
let loading;
let backgroundRemover;

async function cutout(file) {
  backgroundRemover ??= import('@imgly/background-removal');
  const { removeBackground } = await backgroundRemover;
  return removeBackground(file);
}

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

async function preparePortraits(rows) {
  const pending = rows.filter(row => !row.cutout_c);
  if (!pending.length) return;
  const notification = toast.loading('Đang tách nền chân dung… Lần đầu cần tải mô hình xử lý ảnh.');
  let failed = 0;
  for (const row of pending) {
    try {
      const prepared = { ...row, file_c: await cutout(row.file_c), cutout_c: true };
      await storePortrait(prepared);
      const previous = images.get(row.key_c);
      images.set(row.key_c, { ...prepared, url_c: URL.createObjectURL(prepared.file_c) });
      if (previous) URL.revokeObjectURL(previous.url_c);
      listeners.forEach(listener => listener());
    } catch {
      failed += 1;
    }
  }
  toast.dismiss(notification);
  if (failed) toast.error(`Chưa tách được nền ${failed} chân dung. Ảnh gốc được giữ nguyên; tải lại khi có kết nối để thử lại.`);
  else toast.success('Đã tách nền và lưu các chân dung trên thiết bị này.');
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
      request.result.forEach(row => images.set(row.key_c, { ...row, url_c: URL.createObjectURL(row.file_c) }));
      db.close();
      listeners.forEach(listener => listener());
      resolve();
      void preparePortraits(request.result);
    };
    request.onerror = () => { db.close(); reject(request.error); };
  }));
  return loading;
}

export function getCharacterImage(name) { return images.get(name) || builtInImages[name]; }
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
    const prepared = await cutout(file);
    const row = { key_c: key, name_c: file.name.replace(/\.[^.]+$/, ''), file_c: prepared, cutout_c: true };
    await storePortrait(row);
    const previous = images.get(key);
    if (previous) URL.revokeObjectURL(previous.url_c);
    images.set(key, { ...row, url_c: URL.createObjectURL(prepared) });
    URL.revokeObjectURL(url);
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