export interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

export const products = [
  {
    id: 1,
    category: "phone",
    name: "Phone X",
    price: 200.0,
    description: "One of the best phones out yet",
    imageUrl: ""
  },
  {
    id: 2,
    category: "phone",
    name: "Phone Y",
    price: 350.0,
    description: "The second best if not the best phone",
    imageUrl: ""
  },
  {
    id: 3,
    category: "tv",
    name: "Tv 1",
    price: 260.0,
    description: "Large TV, good resolution, best quality",
    imageUrl: ""
  }
];
