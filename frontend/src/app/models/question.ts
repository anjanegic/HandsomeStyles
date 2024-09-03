export class Question {
  _id?: string = '';
  question: string;
  options: Option[];
}

export class Option {
  text: string;
  isCorrect: boolean;
}
