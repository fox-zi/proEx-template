import { CURRENT_FORMAT } from './globalConstantUtil'

export const formatValue = (value) => {
  return new Intl.NumberFormat(CURRENT_FORMAT.VND).format(value);
};
