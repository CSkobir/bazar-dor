import GuardedLink from '@/components/GuardedLink';
import { TProduct } from '@/types/product';
import { formatTaka, formatUnit, toBengaliNumber } from '@/utils/formatters';

type TProductCardProps = {
  product: TProduct;
};

export default function ProductCard({ product }: TProductCardProps) {
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';
  const isFlat = !isUp && !isDown;

  const pct = product.change?.pct ?? 0;
  const pctBn = toBengaliNumber(pct.toFixed(1));

  return (
    <GuardedLink
      href={`/product/${product.id}`}
      className="group block h-full focus:outline-hidden"
    >
      <div className="bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl p-4 sm:p-5 h-full flex flex-col justify-between relative overflow-hidden">
        <div
          className={`absolute top-0 left-0 right-0 h-1 transition-colors ${
            isUp
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
              : isDown
              ? 'bg-gradient-to-r from-rose-500 to-amber-400'
              : 'bg-slate-300'
          }`}
        ></div>

        <div>
          <div className="flex items-start justify-between gap-2 mb-3 pt-1">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-108 group-hover:bg-emerald-50/70 transition-all duration-300 shadow-2xs shrink-0">
              {product.image || product.categoryIcon || '🛒'}
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full group-hover:bg-emerald-100 group-hover:text-emerald-800 transition-colors">
                {product.categoryNameBn || product.category}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">১২ বাজার ভেরিফাইড</span>
            </div>
          </div>

          <h3 className="font-black text-slate-900 group-hover:text-emerald-700 transition-colors text-base sm:text-lg leading-snug line-clamp-1">
            {product.nameBn}
          </h3>

          <p className="text-xs text-slate-400 font-medium mt-1">
            {formatUnit(product.unit)} • <span className="text-slate-500">জাতীয় গড় রেট</span>
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-end justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">
              আজকের দাম
            </span>
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              {formatTaka(product.today)}
            </span>
          </div>

          <div
            className={`text-xs font-black px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-2xs whitespace-nowrap ${
              isUp
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : isDown
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-slate-50 text-slate-600 border border-slate-200'
            }`}
          >
            {isUp && <span>▲</span>}
            {isDown && <span>▼</span>}
            {isFlat && <span>—</span>}
            <span>{pctBn}%</span>
          </div>
        </div>
      </div>
    </GuardedLink>
  );
}
