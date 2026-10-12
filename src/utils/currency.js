// Курсы валют относительно рубля (базовая валюта)
export const RATES = {
  '₽': 1,
  '$': 1 / 90,
  '€': 1 / 100,
};

// Сколько рублей в 1 единице валюты (для справки)
export const RUB_PER = {
  '₽': 1,
  '$': 90,
  '€': 100,
};

/**
 * Форматирует сумму в рублях в нужную валюту.
 * @param {number} rub — сумма в рублях
 * @param {string} currency — '₽' | '$' | '€'
 */
export function formatMoney(rub, currency = '₽') {
  const rate = RATES[currency] ?? 1;
  const value = rub * rate;

  return (
    value.toLocaleString('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }) + ' ' + currency
  );
}

/**
 * Возвращает читаемое описание курса.
 */
export function rateHint(currency) {
  if (currency === '₽') return 'базовая валюта';
  return `1 ${currency} ≈ ${RUB_PER[currency]} ₽`;
}