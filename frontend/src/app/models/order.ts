export class Order {
  userId: string;
  orderItems: {
    productId: string;
    name: string;
    variant: string;
    price: number;
    quantity: number;
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
}
