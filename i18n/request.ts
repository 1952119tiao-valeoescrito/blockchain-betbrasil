// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';

const locales = ['en', 'pt', 'es'];

export default getRequestConfig(async ({ locale }) => {
  // Garantir que a locale não seja undefined e seja suportada
  if (!locale || !locales.includes(locale)) {
    console.log('Locale not provided or not supported, using en');
    locale = 'en';
  }

  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    console.log(`Loaded messages for locale: ${locale}`);
    
    return {
      locale: locale, // ← ESTA LINHA ESTAVA FALTANDO!
      messages
    };
  } catch (error) {
    console.error(`Failed to load messages for ${locale}, falling back to en:`, error);
    const messages = (await import('../messages/en.json')).default;
    
    return {
      locale: 'en', // ← E ESTA TAMBÉM!
      messages
    };
  }
});