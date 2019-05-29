const ArrayProto = Array.prototype;
const ObjProto = Object.prototype;

const push = ArrayProto.push;
const slice = ArrayProto.slice;
const toString = ObjProto.toString;
const hasOwnProperty = ObjProto.hasOwnProperty;

const nativeIsArray = Array.isArray;
const nativeKeys = Object.keys;
const nativeCreate = Object.create;

const MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

const isArray = collection => {
  const length = getLength(collection);
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

const shallowProperty = key => {
  return obj => obj == null ? void 0 : obj[key];
};

const getLength = shallowProperty('length');

const keys = obj => {
  if (!isObect(obj)) return [];
  if (nativeKeys) return nativeKeys(obj);
};

const isObect = obj => {
  const type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
};

module.exports = {
  isArray,
  keys,
  getLength
}

