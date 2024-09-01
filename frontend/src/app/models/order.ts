export class Order {
  _id?: string = '';
  userId: string = '';
  orderItems: {
    productId: string;
    name: string;
    variant: string;
    price: number;
    quantity: number;
    image: string;
  }[] = [];
  shipping: {
    address: string;
    city: string;
    country: string;
    email: string;
    firstname: string;
    lastname: string;
    phone: string;
    zip: string;
  };
  paymentMethod: string;
  subtotalPrice: number;
  shippingPrice: number;
  totalPrice: number;
  dateAndTime: Date;
  status: string;
}
