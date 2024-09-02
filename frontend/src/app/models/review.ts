export class Review {
  _id?: string = '';

  userId: string = '';
  firstname: string = '';
  productId: string = '';
  comment: string = '';
  date: Date = new Date();
  orderId: string = '';
}
