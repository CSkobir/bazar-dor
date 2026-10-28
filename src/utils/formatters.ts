const BENGALI_NUMERALS: { [key: string]: string } = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

/**
 * Converts English number or string to Bengali numerals with comma separators.
 * Example: 1850 -> "১,৮৫০", 2.5 -> "২.৫"
 */
export function toBengaliNumber(num: number | string | null | undefined): string {
  if (num === null || num === undefined || isNaN(Number(num))) return '০';

  const parts = Number(num).toLocaleString('en-US').split('.');
  const integerPart = parts[0].replace(/\d/g, (d) => BENGALI_NUMERALS[d] || d);
  
  if (parts.length > 1) {
    const decimalPart = parts[1].replace(/\d/g, (d) => BENGALI_NUMERALS[d] || d);
    return `${integerPart}.${decimalPart}`;
  }

  return integerPart;
}

/**
 * Formats price in Taka with Bengali numerals.
 * Example: 148 -> "১৪৮ টাকা"
 */
export function formatTaka(price: number | string): string {
  return `${toBengaliNumber(price)} টাকা`;
}

/**
 * Formats unit name to Bengali standard.
 * Example: "kg" -> "প্রতি কেজি", "liter" -> "প্রতি লিটার"
 */
export function formatUnit(unit: string): string {
  if (!unit) return 'প্রতি একক';
  const u = unit.toLowerCase().trim();
  if (u === 'kg' || u === 'কেজি') return 'প্রতি কেজি';
  if (u === 'liter' || u === 'litre' || u === 'লিটার') return 'প্রতি লিটার';
  if (u === 'dozen' || u === 'ডজন') return 'প্রতি ডজন';
  if (u === 'piece' || u === 'পিস' || u === '100g' || u === '১০০ গ্রাম') return 'প্রতি পিস';
  return `প্রতি ${unit}`;
}

/**
 * Formats date into standard Bengali date format:
 * Example: "মঙ্গলবার, ৬ অক্টোবর, ২০২৬"
 */
export function getBengaliDate(): string {
  try {
    return new Date().toLocaleDateString('bn-BD', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return 'মঙ্গলবার, ৬ অক্টোবর, ২০২৬';
  }
}
