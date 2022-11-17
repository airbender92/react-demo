
type Source = object | null;

function objectWithoutPropertiesLoose(source: Source, excluded: any):object {
  if (source === null) return {};
  
  let target: Record<string | symbol, any> = {};
  let sourceKeys = Object.keys(source);
  let key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];

    if (excluded.indexOf(key) >= 0) continue;

    target[key] = source[key as keyof Source];
  }

  return target;
};

// 过滤对象的属性，且仅保留可枚举的属性，包含symbol
function objectWithoutProperties(source: Source, excluded: any):object {
  if (source === null) return {};

  let target = objectWithoutPropertiesLoose(source, excluded);

  let key, i;
  if (Object.getOwnPropertySymbols) {
    let sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key as keyof Source] = source[key as keyof Source];
    }
  }
  return target;
}

function arrayWithHoles(arr : any) {
  if (Array.isArray(arr)) return arr;
}

function iterableToArrayLimit(arr: any, i: number) {
  if (typeof Symbol === 'undefined' || !(Symbol.iterator in Object(arr))) {
    return;
  }

  let _arr = [];
  let _n = true;
  let _d = false;
  let _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] !== null) {
        _i["return"]();
      }
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function slicedToArray(arr: any, i:any) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i)
}
