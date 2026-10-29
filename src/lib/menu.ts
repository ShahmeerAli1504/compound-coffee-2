/* The Playlist = signature drinks (all topped with cold foam).
   `top` / `bottom` are the two liquid colors shown in the animated cup. */
export type Track = { name: string; feat: string; top: string; bottom: string };

export const SPECIALTY_PRICE = "$7 / $8";

export const playlist: Track[] = [
  { name: "LV", feat: "Vanilla, espresso", top: "#f3e4cc", bottom: "#c49a6c" },
  { name: "Monet", feat: "Caramel, espresso", top: "#f1dcb8", bottom: "#b6763a" },
  { name: "Take Care", feat: "Hazelnut, chocolate, espresso", top: "#e8cfae", bottom: "#6f4128" },
  { name: "Ferxxo 151", feat: "Vanilla creme matcha", top: "#f5f0dc", bottom: "#8fbf5a" },
  { name: "C.R.E.A.M", feat: "Caramel frappuccino", top: "#fff4e2", bottom: "#d39a5c" },
  { name: "Tragedy", feat: "Mocha frappuccino", top: "#f4e6d4", bottom: "#5c3a28" },
  { name: "Clouded", feat: "Vanilla, caramel, chai", top: "#f3e5cf", bottom: "#bf9468" },
  { name: "Love Galore", feat: "Strawberry matcha", top: "#9ccc65", bottom: "#ef7fa8" },
  { name: "White Ferrari", feat: "White chocolate mocha", top: "#fffaf0", bottom: "#e9d6bb" },
  { name: "Corso", feat: "Chocolate, caramel, espresso", top: "#ead2b2", bottom: "#7e4a2a" },
  { name: "Bound 2", feat: "Vanilla, lavender, espresso", top: "#efe6f6", bottom: "#a68fcf" },
];

export type Item = { name: string; price: string; note?: string };
export type Section = { title: string; note?: string; items: Item[]; extra?: Item[] };

/* The Setlist = classics, non-coffee and food */
export const setlist: Section[] = [
  {
    title: "Basic Coffee",
    items: [
      { name: "Americano", price: "$5" },
      { name: "Cappuccino", price: "$5" },
      { name: "Macchiato", price: "$5" },
      { name: "Espresso", price: "$3" },
      { name: "Latte", price: "$6" },
    ],
  },
  {
    title: "Cold Coffee",
    items: [
      { name: "Iced Americano", price: "$5" },
      { name: "Iced Latte", price: "$6" },
      { name: "Iced Mocha", price: "$6" },
      { name: "Cold Brew", price: "$5" },
    ],
  },
  {
    title: "Non-Coffee",
    note: "Medium / Large",
    items: [
      { name: "Dakiti", price: "$7 / $8" },
      { name: "Off-White", price: "$7 / $8" },
      { name: "Starry Night", price: "$7 / $8" },
    ],
  },
];

export const food: Section = {
  title: "Breakfast Sandwiches + Pastries",
  note: "Choice of plain bagel, cheese bagel or croissant.",
  items: [
    { name: "Wham", note: "Egg, ham, avocado, tomato, chipotle mayo", price: "$7" },
    { name: "Illmatic", note: "Sausage, egg and bacon", price: "$7" },
    { name: "American Gothic", note: "Ham, pepperjack, avocado, tomato", price: "$7" },
    { name: "Da Vinci", note: "Ham & cheese croissant", price: "$6" },
  ],
  extra: [
    { name: "Bagel", note: "Cream cheese", price: "$4" },
    { name: "Croissant", price: "$4" },
    { name: "Strawberry Cheesecake Croissant", price: "$6" },
  ],
};
