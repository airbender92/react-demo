import { createContext } from 'react';
import { I18nProvider } from '../types'
import { substituteTokens } from './subtituteTokens'

export type I18nContextProps = I18nProvider;

const defaultI18nProvider = {
  translate: (key: string, options: { _: string; }) => 
    options?._
      ? substituteTokens(options._, options)
      : substituteTokens(key, options),
  changeLocale: () => Promise.resolve(),
  getLocale: () => 'en',
};

export const I18nContext = createContext<I18nProvider>(defaultI18nProvider);

I18nContext.displayName = 'I18nContext';