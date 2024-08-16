export class Product {
  _id?: string = '';
  name: string = '';
  description: string = '';
  price: number = 0;
  currency: string = 'EUR';
  category: string = '';
  stock: number = 100;
  sold: number = 0;
  imageFilename: string = '';
  tags: string[] = [];
  rating: number = 0;
  reviews: {
    userId: string;
    rating: number;
    comment: string;
    date: Date;
  }[] = [];
  variants: Variant[] = [];
}

export interface Variant {
  name?: string; // Može biti naziv
  color?: string; // Može biti boja
  model?: string; // Može biti model
}
