import { TCategory } from '@/types/category';
import { TProduct } from '@/types/product';
import fallbackCategoriesData from './fallback-categories.json';
import fallbackProductsData from './fallback-products.json';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://openapi.programming-hero.com/api/bazardor';

// In-memory cache seeded with fallback data for instant zero-latency responses
let cachedCategories: { data: TCategory[]; timestamp: number } = {
  data: fallbackCategoriesData as TCategory[],
  timestamp: Date.now(),
};
let cachedProducts: { data: TProduct[]; timestamp: number } = {
  data: fallbackProductsData as unknown as TProduct[],
  timestamp: Date.now(),
};
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch from API with 2.5s timeout and automatic fallback
 */
async function fetchWithFallback<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const res = await fetch(url, {
      ...options,
      signal: AbortSignal.timeout(2500),
      next: { revalidate: 300 },
    });
    if (res.ok) {
      return (await res.json()) as T;
    }
  } catch {
    // fallback
  }
  return null;
}

/**
 * Fetch all categories with memory caching and fallback
 */
export async function getCategories(): Promise<TCategory[]> {
  const now = Date.now();
  if (now - cachedCategories.timestamp < CACHE_TTL && cachedCategories.data.length > 0) {
    return cachedCategories.data;
  }

  const data = await fetchWithFallback<TCategory[]>('/categories');
  if (data && Array.isArray(data) && data.length > 0) {
    cachedCategories = { data, timestamp: now };
    return data;
  }

  return cachedCategories.data;
}

/**
 * Fetch a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<TCategory | null> {
  const all = await getCategories();
  const match = all.find((c) => c.slug === slug || c.id === slug);
  if (match) return match;

  const data = await fetchWithFallback<TCategory>(`/categories/${slug}`);
  return data || null;
}

/**
 * Fetch all products, optionally filtered by category, with memory caching
 */
export async function getAllProducts(categorySlug?: string): Promise<TProduct[]> {
  const now = Date.now();
  let all: TProduct[] = [];

  if (now - cachedProducts.timestamp < CACHE_TTL && cachedProducts.data.length > 0) {
    all = cachedProducts.data;
  } else {
    const data = await fetchWithFallback<TProduct[]>('/products');
    if (data && Array.isArray(data) && data.length > 0) {
      cachedProducts = { data, timestamp: now };
      all = data;
    } else {
      all = cachedProducts.data;
    }
  }

  if (categorySlug && categorySlug !== 'all') {
    return all.filter((p) => p.category === categorySlug);
  }
  return all;
}

/**
 * Fetch a single product by numeric id or slug string
 */
export async function getProductByIdOrSlug(idOrSlug: string | number): Promise<TProduct | null> {
  const all = await getAllProducts();
  const match = all.find(
    (p) => String(p.id) === String(idOrSlug) || p.slug === String(idOrSlug)
  );
  if (match) return match;

  const isNumeric = !isNaN(Number(idOrSlug));
  if (isNumeric) {
    const single = await fetchWithFallback<TProduct>(`/products/${idOrSlug}`);
    if (single && single.nameBn) return single;
  }

  return null;
}

/**
 * Fetch top risers (দাম বেড়েছে ▲)
 */
export async function getTopRisers(limit = 6): Promise<TProduct[]> {
  const all = await getAllProducts();
  return all
    .filter((p) => p.change?.dir === 'up')
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, limit);
}

/**
 * Fetch top fallers (দাম কমেছে ▼)
 */
export async function getTopFallers(limit = 6): Promise<TProduct[]> {
  const all = await getAllProducts();
  return all
    .filter((p) => p.change?.dir === 'down')
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, limit);
}
