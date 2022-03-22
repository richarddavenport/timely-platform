import isNil from "lodash/isNil.js";
import isString from "lodash/isString.js";

export function isNullOrEmpty(
  value: string | number | null | undefined
): boolean {
  return isNil(value) || (isString(value) && value?.trim() == "");
}
