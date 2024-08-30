export class Review {
  _id?: string = '';
  userId: string = '';
  productId: string = '';
  rating: number = 0;
  comment: string = '';
  date: Date = new Date();
  orderId: string = '';
}
