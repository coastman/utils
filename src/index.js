const base = require('./base/base');

const _utils = obj => {
  if (obj instanceof _utils) return obj;
  if (!(this instanceof _utils)) return new _utils(obj);
};

/**
 * 遍历数组，对象 
 */
_utils.each = (obj, func) => {
  if (base.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      func(obj[i], i, obj);
    }
  } else {
    const keys = base.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      func(obj[keys[i]], keys[i], obj)
    }
  }
  return obj;
};

/**
 * 映射数组，对象
 */
_utils.map = (obj, func) => {
  const keys = !base.isArray(obj) && base.keys(obj);
  const length = (keys || obj).length;
  const results = Array(length);

  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    results[i] = func(obj[currentKey], currentKey, obj);
  }
  return results;
};

/**
 * reduce 求值
 */
const createReduce = dir => {
  const reducer = (obj, func, memo) => {
    const keys = !base.isArray(obj) && base.keys(obj);
    const length = (keys || obj).length;
    let index = dir > 0 ? 0 : length - 1;
  
    for (;index >= 0 && index < length; index += dir) {
      const currentKey = keys ? keys[index] : index;
      memo = func(memo, obj[currentKey], currentKey, obj)
    }
    return memo;
  };

  return (obj, func, memo) => {
    return reducer(obj, func, memo);
  };
};

_utils.reduce = createReduce(1);
_utils.reduceRight = createReduce(-1);

const createPredicateIndexFinder = dir => {
  return (array, func) => {
    const length = base.getLength(array);
    const index = dir > 0 ? 0 : length - 1;

    for (; index >= 0 && index < length; index += dir) {
      if (func(array[index], index, array)) return index;
    }
    return -1;
  };
};
_utils.findIndex = createPredicateIndexFinder(1);
_utils.findKey = (obj, func) => {
  const keys = base.keys(obj);
  let key;
  for (let i = 0; i < array.length; i++) {
    key = keys[i];
    if (func(obj[key], key, obj)) return key;
  }
};
_utils.find = (obj, func) => {
  const keyFinder = base.isArray(obj) ? _utils.findIndex : _utils.findKey;
  const key = keyFinder(obj, func);
  if (key !== void 0 && key !== -1) return obj[key];
};

_utils.filter = (obj, func) => {
  const results = [];

  _utils.each(obj, (value, index, list) => {
    if (func(value, index, list)) results.push(value);
  });
  return results;
};

_utils.every = (obj, func) => {
  const keys = !base.isArray(obj) && base.keys(obj);
  const length = (keys || obj).length;

  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    if (!func(obj[currentKey], currentKey, obj)) return false;
  }
  return true;
};

_utils.some = (obj, func) => {
  const keys = !base.isArray(obj) && base.keys(obj);
  const length = (keys || obj).length;

  for (let i = 0; i < length; i++) {
    const currentKey = keys ? keys[i] : i;
    if (func(obj[currentKey], currentKey, obj)) return true;
  }
  return false;
};

_utils.values = obj => {
  const keys = base.keys(obj);
  const length = keys.length;
  const values = Array(length);

  for (let i = 0; i < length; i++) {
    values[i] = obj[keys[i]]
  }
  return values;
};

const createIndexFinder = (dir, predicateFind, sortedIndex) => {
  return (array, item, idx) => {
    let i = 0;
    const length = getLength(array);
    if (typeof idx == 'number') {
      if (dir > 0) {
        i = idx >= 0 ? idx : Math.max(idx + length, i);
      } else {
        length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
      } 
    } else if (sortedIndex && idx && length) {
      idx = sortedIndex(array, item)
      return array[index] === item ? idx : -1;
    }
    for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
      if (array[idx] === item) return idx;
    }
    return -1;
  };
};

_utils.indexOf = createIndexFinder(1, _utils.findIndex, _utils.sortedIndex);

_utils.contains = (obj, item, fromIndex) => {
  if (!base.isArray(obj)) obj = _utils.values(obj);
  if (typeof fromIndex != 'number') fromIndex = 0;

  return _utils.indexOf(obj, item, fromIndex) >= 0;
};

_utils.isMatch = (object, attrs) => {
  const keys = base.keys(attrs);
  const length = keys.length;
  if (object == null) return !length;
  const obj = Object(object);
  for (let i = 0; i < length; i++) {
    const key = keys[i];
    if (attrs[key] !== obj[key] || !(key in obj)) return false;
  }
  return true;
};

const createAssigner = (keysFunc, defaults) => {
  return obj => {
    const length = arguments.length;
    if (defaults) obj = Object(obj);
    if (length < 2 || obj == null) return obj;
    for (let index = 1; index < length; index++) {
      const source = arguments[index];
      const keys = keysFunc(source);
      const l = keys.length;
      for (let i = 0; i < l; i++) {
        const key = keys[i];
        if (!defaults || obj[key] === void 0) obj[key] = source[key];
      }
    }
    return obj;
  };
};

_utils.extendOwn = createAssigner(base.keys);

_utils.matcher = attrs => {
  attrs = _utils.extendOwn({}, attrs);
  return obj => _utils.isMatch(obj, attrs);
};

_utils.where = (obj, attrs) => _utils.filter(obj, _utils.matcher(attrs)); 
