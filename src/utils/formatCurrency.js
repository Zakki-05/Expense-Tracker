export const formatCurrency = (amount) => {
  const currency = localStorage.getItem('settings_currency') || 'INR';
  const locale = currency === 'INR' ? 'en-IN' : (currency === 'EUR' ? 'de-DE' : 'en-US');

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
};
