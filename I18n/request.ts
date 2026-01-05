import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Se o locale não existir, ele não tenta carregar e não quebra o servidor
  if (!locale) return {};

  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});