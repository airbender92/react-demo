## Usage

```jsx
import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import polyglotI18nProvider from '@react-demo/ra-i18n-polyglot';
import englishMessages from '@react-demo/ra-language-english';
import frenchMessages from '@react-demo/ra-language-french';

const messages = {
  fr: frenchMessages,
  en: englishMessages
};
const i18nProvider = polyglotI18nProvider(locale => messages[locale]);

const App = () => (
  <Admin locale='en' i18nProvider={i18nProvider}>
    ...
  </Admin>
);
export default App;

```js
const messages = {
    'hello_name': 'Hello, %{name}',
    'count_beer': 'One beer |||| %{smart_count} beers',
};

// interpolation
translate('hello_name', { name: 'John Doe' });
=> 'Hello, John Doe.'

// pluralization
translate('count_beer', { smart_count: 1 });
=> 'One beer'

translate('count_beer', { smart_count: 2 });
=> '2 beers'

// default value
translate('not_yet_translated', { _: 'Default translation' });
=> 'Default translation'
```