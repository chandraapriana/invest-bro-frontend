export function thousandsSeparator(num: number): string {
  // Pisahkan bagian integer dan desimal
  const [integerPart, decimalPart] = num.toString().split(".");

  // Format bagian integer dengan pemisah ribuan
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Jika ada bagian desimal, bulatkan ke satu digit desimal terdekat
  const roundedDecimal = decimalPart
    ? Math.round(Number(`0.${decimalPart}`) * 10)
    : null;

  // Gabungkan bagian integer yang sudah diformat dengan bagian desimal yang dibulatkan (satu digit)
  return roundedDecimal !== null
    ? `${formattedInteger}.${roundedDecimal}`
    : formattedInteger;
}
