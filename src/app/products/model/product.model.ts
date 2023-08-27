export interface Product {
    id: number;
    category: string; 
    image: string;
    description: string;
    price: number;
    rating: {count:number , rate:number};
    imageUrl: string;
    title:string;
  }