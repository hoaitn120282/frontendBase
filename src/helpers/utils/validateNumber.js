/* eslint eqeqeq: off */
export default n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;
