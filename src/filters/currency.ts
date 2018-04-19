const digitsRE = /(\d{3})(?=\d)/g;

// Any-typing this as it is not production code
export function currency(value: any, currencySymbol: any, decimals: any) {
  value = parseFloat(value);
  if (!isFinite(value) || (!value && value !== 0)) {
    return '';
  }
  currencySymbol = currencySymbol != null ? currencySymbol : '$';
  decimals = decimals != null ? decimals : 2;
  const stringified = Math.abs(value).toFixed(decimals);
  const intNum = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  const i = intNum.length % 3;
  const head = i > 0 ? intNum.slice(0, i) + (intNum.length > 3 ? ',' : '') : '';
  const floatNum = decimals ? stringified.slice(-1 - decimals) : '';
  const sign = value < 0 ? '-' : '';
  return (
    sign + currencySymbol + head + intNum.slice(i).replace(digitsRE, '$1,') + floatNum
  );
}
