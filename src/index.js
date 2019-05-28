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
      func(obj[i], i, obj)
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

_utils.reduce = createReduce(1);






