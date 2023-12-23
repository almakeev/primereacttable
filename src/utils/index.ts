export const isPositiveInteger = (val: string) => {
  let str = String(val);

  str = str.trim();

  if (!str) {
    return false;
  }

  str = str.replace(/^0+/, '') || '0';
  const n = Math.floor(Number(str));

  return n !== Infinity && String(n) === str && n >= 0;
};
