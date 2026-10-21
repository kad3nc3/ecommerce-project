import type { Product } from "../products";

export function ProductCard({ product, index, onAdd }: { product: Product; index: number; onAdd: () => void }) {
  const backgrounds = ["bg-[#e5e8fb]", "bg-[#f6ddd2]", "bg-[#dfe9dd]"];
  return <article className="min-w-0">
    <div className={`relative grid h-[290px] place-items-center overflow-hidden rounded-[24px] sm:h-[330px] ${backgrounds[index]}`}>
      <span className="absolute left-5 top-[18px] text-[10px] tracking-[1px] text-[#171b2e]/40">0{index + 1}</span>
      {index === 0 && <div className="relative h-[200px] w-[200px]"><div className="absolute left-[30px] top-[50px] h-[108px] w-[130px] rounded-[28px_28px_42px_42px] bg-gradient-to-br from-white to-[#b7bfe9] shadow-[inset_-12px_-10px_12px_rgba(104,110,163,.2)]"><div className="absolute -top-3 left-2.5 h-7 w-[110px] rounded-[50%] bg-[#c6cbe9]" /></div><div className="absolute right-1 top-[72px] h-[54px] w-12 rounded-r-[40px] border-[13px] border-l-0 border-[#aab4dd]" /></div>}
      {index === 1 && <div className="relative h-[200px] w-[200px]"><div className="absolute left-[26px] top-[58px] h-[115px] w-[145px] rotate-[-7deg] rounded-[12px_12px_24px_24px] bg-[#c88374] shadow-[inset_-15px_-13px_20px_rgba(106,48,48,.16)]" /><div className="absolute left-[60px] top-[27px] h-[65px] w-20 rotate-[-7deg] rounded-t-[50px] border-[12px] border-b-0 border-[#a76864]" /></div>}
      {index === 2 && <div className="relative h-[200px] w-[200px]"><div className="absolute bottom-[18px] left-[46px] h-[86px] w-28 rounded-[10px_10px_38px_38px] bg-[#b98268]" /><div className="absolute left-[82px] top-2 h-[90px] w-7 rotate-[-34deg] rounded-[100%_0_100%_0] bg-[#708a61]" /><div className="absolute left-[105px] top-5 h-[90px] w-7 rotate-[15deg] rounded-[100%_0_100%_0] bg-[#839d70]" /><div className="absolute left-[62px] top-[30px] h-[90px] w-7 rotate-[-58deg] rounded-[100%_0_100%_0] bg-[#5f7c57]" /></div>}
      <button className="absolute bottom-4 right-4 grid h-[38px] w-[38px] place-items-center rounded-[13px] border-0 bg-white/80 text-[22px] font-light text-[#171b2e] shadow-[0_5px_15px_rgba(43,44,70,.08)] transition hover:bg-[#171b2e] hover:text-white" onClick={onAdd} aria-label={`Add ${product.name} to bag`}>+</button>
    </div>
    <div className="mt-4 flex justify-between gap-4"><div><h3 className="mb-1 text-sm">{product.name}</h3><p className="m-0 text-xs text-[#9699a4]">{product.description}</p></div><span className="text-[13px] font-semibold">${product.price.toFixed(2)}</span></div>
  </article>;
}
