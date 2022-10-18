import defaultMessages from '@react-demo/ra-language-english';
import polyglotI18nProvider from '@react-demo/ra-i18n-polyglot';

export const defaultI18nProvider = polyglotI18nProvider(
    () => defaultMessages,
    'en',
    [{ locale: 'en', name: 'English' }],
    { allowMissing: true }
);
