export type TMarket = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type TProductChange = {
  dir: 'up' | 'down' | 'flat' | 'unchanged';
  pct: number;
};

export type TProduct = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: TProductChange;
  markets: TMarket[];
};
