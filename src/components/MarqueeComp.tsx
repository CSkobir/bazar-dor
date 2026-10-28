import GuardedLink from '@/components/GuardedLink';

const TICKER_ITEMS = [
  { id: '1', nameBn: 'স্বর্ণমাছি চাল', today: 148, unit: 'kg', pct: '+২.১%', isUp: true, icon: '🍚' },
  { id: '2', nameBn: 'মিনিকেট চাল', today: 99, unit: 'kg', pct: '-২.৯%', isUp: false, icon: '🍚' },
  { id: '4', nameBn: 'মসুর ডাল', today: 142, unit: 'kg', pct: '+২.৯%', isUp: true, icon: '🫘' },
  { id: '5', nameBn: 'ছোলা', today: 120, unit: 'kg', pct: '-২.৪%', isUp: false, icon: '🫘' },
  { id: '8', nameBn: 'সরিষার তেল', today: 192, unit: 'liter', pct: '+২.১%', isUp: true, icon: '🛢️' },
  { id: '9', nameBn: 'আলু', today: 30, unit: 'kg', pct: '-৬.২%', isUp: false, icon: '🥔' },
  { id: '10', nameBn: 'পেঁয়াজ', today: 54, unit: 'kg', pct: '+১২.৫%', isUp: true, icon: '🧅' },
  { id: '13', nameBn: 'ব্রয়লার মুরগি', today: 185, unit: 'kg', pct: '-১.৮%', isUp: false, icon: '🍗' },
  { id: '15', nameBn: 'ফার্মের ডিম', today: 135, unit: 'dozen', pct: '+১.৫%', isUp: true, icon: '🥚' },
  { id: '16', nameBn: 'রুই মাছ', today: 320, unit: 'kg', pct: '-২.০%', isUp: false, icon: '🐟' },
];

export default function MarqueeComp() {
  return (
    <div className="bg-slate-950 text-white border-b border-slate-800 text-xs py-2 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>লাইভ রেট</span>
          </div>
        </div>

        <div className="relative flex overflow-x-hidden flex-1">
          <div className="flex items-center gap-8 animate-[marquee_35s_linear_infinite] whitespace-nowrap text-xs font-medium text-slate-300">
            {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, idx) => (
              <GuardedLink
                key={`${item.id}-${idx}`}
                href={`/product/${item.id}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <span className="text-base">{item.icon}</span>
                <span className="text-slate-300 font-semibold">{item.nameBn}</span>
                <span className="font-bold text-white">
                  {item.today} ৳/{item.unit === 'kg' ? 'কেজি' : item.unit === 'liter' ? 'লিটার' : item.unit === 'dozen' ? 'ডজন' : item.unit}
                </span>
                <span
                  className={`font-black text-[10px] px-1.5 py-0.5 rounded-md ${
                    item.isUp
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60'
                      : 'bg-rose-950/80 text-rose-400 border border-rose-800/60'
                  }`}
                >
                  {item.isUp ? '▲ ' : '▼ '}
                  {item.pct}
                </span>
                <span className="text-slate-700 ml-2">•</span>
              </GuardedLink>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>বাজার উন্মুক্ত</span>
        </div>
      </div>
    </div>
  );
}
