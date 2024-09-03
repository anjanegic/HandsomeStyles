export class Answer {
  _id?: string = '';
  userId?: string = '';
  sessionId?: string = '';
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
  discountCode?: string;
  answeredAt?: Date;
  used?: boolean;
}
