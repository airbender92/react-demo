export type Identifier = string | number;

export type Translate = (key: string, options?: any) => string;

export type Locale = {
  locale: string;
  name: string;
}
export type I18nProvider = {
  translate: Translate;
  changeLocale: (locale: string, options?: any) => Promise<void>;
  getLocale: () => string;
  getLocales?: () => Locale[];
  [key: string]: any;
}

export interface UserIdentity {
  id: Identifier;
  fullName?: string;
  avatar?: string;
  [key: string]: any;
}

/**
 * authProvider types
 */
export type AuthProvider = {
  login: (params: any) => Promise<{ redirectTo?: string | boolean } | void | any>;
  logout: (params: any) => Promise<void | false | string>;
  checkAuth: (params: any) => Promise<void>;
  checkError: (error: any) => Promise<void>;
  getIdentity?: () => Promise<UserIdentity>;
  getPermissions: (params: any) => Promise<any>;
  [key: string]: any;
}