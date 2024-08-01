// i18n middleware: sets the language of the request
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import path from 'path';

// Initialize i18next with the given configuration
i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}.json')
    },
    detection: {
      order: ['header', 'querystring', 'cookie'],
      caches: ['cookie']
    }
  });

// Export the i18next middleware 
export default i18nextMiddleware.handle(i18next);
