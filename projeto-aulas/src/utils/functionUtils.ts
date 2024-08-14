import _isUndefined from "lodash/isUndefined";

export const removeUndefinedAttributes = (obj: Object) => {
  Object.keys(obj).forEach((key) => _isUndefined(obj[key]) && delete obj[key]);
};
