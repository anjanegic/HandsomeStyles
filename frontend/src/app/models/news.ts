export class News {
  _id?: string = '';
  title: string;
  description: string;
  image: string;
  date: Date;
  videoLink: string;
  comments: Comment[];
}
