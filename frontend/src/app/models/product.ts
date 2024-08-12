export class Product {
  name: string = '';
  description: string = '';
  price: number = 0;
  currency: string = 'EUR';
  category: string = '';
  stock: number = 100;
  imageUrl: string = '';
  tags: string[] = [];
  rating: number = 0;
  reviews: {
    userId: string;
    rating: number;
    comment: string;
    date: Date;
  }[] = [];
  variants: {
    color: string;
  }[] = [];
}
