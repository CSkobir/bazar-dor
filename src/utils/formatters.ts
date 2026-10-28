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

export function formatTaka(price: number | string): string {
  return `${toBengaliNumber(price)} টাকা`;
}

export function formatUnit(unit: string): string {
  if (!unit) return 'প্রতি একক';
  const u = unit.toLowerCase().trim();
  if (u === 'kg' || u === 'কেজি') return 'প্রতি কেজি';
  if (u === 'liter' || u === 'litre' || u === 'লিটার') return 'প্রতি লিটার';
  if (u === 'dozen' || u === 'ডজন') return 'প্রতি ডজন';
  if (u === 'piece' || u === 'পিস' || u === '100g' || u === '১০০ গ্রাম') return 'প্রতি পিস';
  return `প্রতি ${unit}`;
}

export function getBengaliDate(date: Date = new Date()): string {
  try {
    const formatted = date.toLocaleDateString('bn-BD', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    if (/[০-৯]/.test(formatted)) {
      return formatted;
    }
  } catch {}

  const weekdays = [
    'রবিবার',
    'সোমবার',
    'মঙ্গলবার',
    'বুধবার',
    'বৃহস্পতিবার',
    'শুক্রবার',
    'শনিবার',
  ];
  const months = [
    'জানুয়ারি',
    'ফেব্রুয়ারি',
    'মার্চ',
    'এপ্রিল',
    'মে',
    'জুন',
    'জুলাই',
    'আগস্ট',
    'সেপ্টেম্বর',
    'অক্টোবর',
    'নভেম্বর',
    'ডিসেম্বর',
  ];

  const d = date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
  const dayName = weekdays[d.getDay()];
  const dayNum = toBengaliNumber(d.getDate());
  const monthName = months[d.getMonth()];
  const yearNum = toBengaliNumber(d.getFullYear());

  return `${dayName}, ${dayNum} ${monthName}, ${yearNum}`;
}
