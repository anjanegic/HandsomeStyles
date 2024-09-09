export class Question {
  _id?: string = '';
  question: string;
  options: Option[];
  isActive?: boolean = false;
}

export class Option {
  text: string;
  isCorrect: boolean;
}
