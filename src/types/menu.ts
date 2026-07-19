export type MenuItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  desc: string;
  images: string[];
};

export type Cart = Record<number, number>;

export type EventInfo = {
  name: string;
  address: string;
  guests: string;
  note: string;
};

export type EventInfoErrors = {
  name: boolean;
  address: boolean;
  guests: boolean;
};

export type ServingCourse = {
  title: string;
  categories: string[];
};

export type CartLineItem = MenuItem & {
  qty: number;
  total: number;
};

export type QuoteLineItem = {
  name: string;
  desc: string;
  price: number;
  qty: number;
  total: number;
};
