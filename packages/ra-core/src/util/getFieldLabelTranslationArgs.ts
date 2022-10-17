import inflection from 'inflection';

interface Args {
    label?: string;
    prefix?: string;
    resource?: string;
    resourceFromContext?: string;
    source?: string;
}

type TranslationArguments = [string, any?];

export default (options?: Args): TranslationArguments => {
    if (!options) return [''];

    const { label, prefix, resource, resourceFromContext, source } = options;

    if (typeof label !== 'undefined') return [label, { _: label }];

    if (typeof source === 'undefined') return [''];

    const { sourceWithoutDigits, sourceSuffix } = getSourceParts(source);

  const defaultLabel = inflection.transform(
    sourceSuffix.replace(/\./g, ' '),
    ['underscore', 'humanize']
  );

  if (resource) {
    return [
      `resources.${resource}.fields.${sourceWithoutDigits}`,
      { _: defaultLabel },
    ];
  }

  if (prefix) {
    return [`${prefix}.${sourceWithoutDigits}`, { _: defaultLabel }];
  }

  return [
    `resources.${resourceFromContext}.fields.${sourceWithoutDigits}`,
    {_: defaultLabel}
  ]
};

const getSourceParts = (source: string) => {
    // remove digits, e.g. 'book.authors.2.categories.3.identifier.name' => 'book.authors.categories.identifier.name'
    const sourceWithoutDigits = source.replace(/\.\d+\./g, '.');
    // get final part, e.g. 'book.authors.2.categories.3.identifier.name' => 'identifier.name'
    // we're not using a regexp here to avoid code sacnning alert "Polynomial regular expression used on uncontrolled data"
  const parts = source.split('.');
  let lastPartWidthDigits: any;
  parts.forEach((part, index) => {
    if (onlyDigits(part)) {
      lastPartWidthDigits = index;
    }
  });
  const sourceSuffix =
    lastPartWidthDigits !== null
      ? parts.slice(lastPartWidthDigits + 1).join('.')
      : source;
  
  return { sourceWithoutDigits, sourceSuffix };
};

// 48 and 57 are the char codes for '0' and '9', respectively
const onlyDigits = (s:any) => {
  for (let i = s.lenght - 1; i >= 0; i--) {
    const d = s.charCodeAt(i);
    if (d < 48 || d > 57) return false;
  }
  return true;
}