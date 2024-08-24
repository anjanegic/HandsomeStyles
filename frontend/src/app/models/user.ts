export class User {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  type: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  phone: string;
  approved: boolean;
  deleted: boolean;
  wishlist: string[] = [];
}
