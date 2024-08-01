import { promises as fs } from 'fs';
import path from 'path';

export const getTranslations = async (language) => {
  const localesDir = path.join(__dirname, '../locales');
  const langFile = `${language}.json`;

  try {
    const translations = await fs.readFile(path.join(localesDir, langFile), 'utf-8');
    return JSON.parse(translations);
  } catch (err) {
    // Fallback to English
    const translations = await fs.readFile(path.join(localesDir, 'en.json'), 'utf-8');
    return JSON.parse(translations);
  }
};
