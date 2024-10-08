import { Injectable } from '@angular/core';
import { Question } from '../app/models/question';
import { Observable } from 'rxjs';
import { Answer } from '../app/models/answer';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  private baseUrl = 'http://localhost:4000/questions'; // Zameni sa tvojim URL-om

  constructor(private http: HttpClient) {}

  getAllQuestions() {
    return this.http.get<Question[]>(`${this.baseUrl}/getAllQuestions`);
  }

  getQuestions() {
    return this.http.get<Question[]>(`${this.baseUrl}/getQuestions`);
  }

  getQuestionById(id: string) {
    return this.http.get<Question>(`${this.baseUrl}/getQuestionById/${id}`);
  }

  answerQuestion(answer: Answer) {
    return this.http.post(`${this.baseUrl}/answerQuestion`, answer);
  }

  checkDiscountCode(code: string): Observable<{ valid: boolean; amount: number }> {
    return this.http.get<{ valid: boolean; amount: number }>(`${this.baseUrl}/check-discount-code?code=${code}`);
  }

  usedDiscountCode(code: string): Observable<{ success: boolean }> {
    return this.http.get<{ success: boolean }>(`${this.baseUrl}/used-discount-code?code=${code}`);
  }

  changeAnswer(question: Question, selectedOption: string) {
    return this.http.post(`${this.baseUrl}/change-answer`, { questionId: question._id, selectedOption });
  }

  deleteQuestion(id: string) {
    return this.http.post(`${this.baseUrl}/delete-question`, { id });
  }

  updateQuestion(id: string, question: Question) {
    return this.http.post(`${this.baseUrl}/update-question`, { id, question });
  }

  addQuestion(question: Question) {
    return this.http.post(`${this.baseUrl}/add-question`, question);
  }
}
