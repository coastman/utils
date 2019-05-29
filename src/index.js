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
  })
  return results;
};













