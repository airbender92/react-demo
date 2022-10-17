# English Messages for react-admin

## Installation

```sh
npm install --save ra-language-english
```

## Usage
```jsx
import { Admin } from 'react-admin';
import englishMessages from 'ra-language-english';
import polyglotI18nProvider from 'ra-i18n-polyglot';

const message = {
  'en': englishMessages
};

const i18nProvider = polyglotI18nProvider(locale => message[locale]);

<Admin locale='en' i18nProvider={i18nProvider}>
...
</Admin>
```