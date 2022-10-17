
import { useCallback } from "react";

import { Translate } from "../types";
import { useI18nProvider } from "./useI18nProvider";

/**
 * Translate a string using the current locale and the translations from the i18nProvider
 * @see Polyglot.t()
 * @link https://airbnb.io/polyglot.js/#polyglotprototypetkey-interpolationoptions
 * @returns { Function } A translation function, accepting two arguments
 *  - a string used as key in the translations
 *  - an interpolationOptoins object
 * 
 * @example
 * import { useTranslate } from 'react-admin' 
 * const SettingsMenu = () => {
 *  const translate = useTranslate();
 *  return <MenuItem>{translate('settings')}</MenuItem>
 * }
 */
export const useTranslate = (): Translate => {
  const i18nProvider = useI18nProvider();
  const translate = useCallback(
    (key: string, options?: any) =>
      i18nProvider.translate(key, options) as string,
    // update the hook each time the locale change
    [i18nProvider]
  );
  return i18nProvider ? translate : identity;
}
const identity = (key: any) => key;