import { food, setlist, type Item } from "@/lib/menu";

function Row({ item }: { item: Item }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b-2 border-dotted border-ink/35 py-2.5 last:border-b-0">
      <span className="font-bold uppercase tracking-[.03em]">
        {item.name}
        {item.note && <small className="mt-0.5 block text-[.84rem] font-normal normal-case tracking-normal opacity-75">{item.note}</small>}
      </span>
      <b className="whitespace-nowrap">{item.price}</b>
    </div>
  );
}

const card = "border-[3px] border-ink bg-cream px-[22px] py-6 text-ink shadow-hard";
const title = "m-0 mb-3.5 font-drip text-[2rem] font-normal leading-none text-blue";

/* "The Setlist" — classics, non-coffee and breakfast. */
export function Setlist() {
  return (
    <div className="grid gap-[22px] lg:grid-cols-3">
      {setlist.map((s) => (
        <article key={s.title} className={card}>
          <h3 className={title}>{s.title}</h3>
          {s.items.map((i) => (
            <Row key={i.name} item={i} />
          ))}
          {s.note && <p className="m-0 mt-3 text-[.85rem] font-semibold">{s.note}</p>}
        </article>
      ))}
      <article className={`${card} grid gap-x-10 lg:col-span-3 lg:grid-cols-2`}>
        <h3 className={`${title} lg:col-span-2`}>{food.title}</h3>
        {food.note && <p className="m-0 mb-2 -mt-1.5 text-[.85rem] font-semibold lg:col-span-2">{food.note}</p>}
        <div>
          {food.items.map((i) => (
            <Row key={i.name} item={i} />
          ))}
        </div>
        <div>
          {food.extra?.map((i) => (
            <Row key={i.name} item={i} />
          ))}
        </div>
      </article>
    </div>
  );
}
