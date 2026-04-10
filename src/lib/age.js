// Birth date of the developer — used to compute age at any reference date
export const BIRTH_DATE = new Date('2009-03-01');

/**
 * Returns age as "XyYm" string.
 * @param {string|Date|null} referenceDate — defaults to today
 */
export function getAge(referenceDate = null, isFr = false) {
  const ref = referenceDate
    ? (typeof referenceDate === 'string' ? new Date(referenceDate + 'T12:00:00') : referenceDate)
    : new Date();

  let years  = ref.getFullYear() - BIRTH_DATE.getFullYear();
  let months = ref.getMonth()    - BIRTH_DATE.getMonth();

  if (ref.getDate() < BIRTH_DATE.getDate()) months--;
  if (months < 0) { years--; months += 12; }

  const yLabel = isFr ? (years <= 1 ? ' an ' : ' ans ') : (years === 1 ? ' year ' : ' years ');
  const mLabel = isFr ? ' mois' : (months === 1 ? ' month' : ' months');
  return `${years}${yLabel}${months}${mLabel}`.trim();
}
