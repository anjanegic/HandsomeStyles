import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { Question } from '../models/question';
import { Answer } from '../models/answer';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [MatCardModule, MatRadioModule, MatButtonModule, CommonModule, MatSnackBarModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css',
})
export class QuestionComponent implements OnInit {
  questions: Question[] = [];
  currentQuestion: Question | null = null;
  selectedOption: string = '';

  constructor(private questionService: QuestionService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe((data) => {
      this.questions = data;
      this.currentQuestion = this.questions.length > 0 ? this.questions[0] : null;
      console.log(this.currentQuestion);
    });
  }

  onOptionChange(event: MatRadioChange): void {
    this.selectedOption = event.value;
  }

  submitAnswer(): void {
    if (this.currentQuestion) {
      const answer: Answer = {
        questionId: this.currentQuestion._id!,
        selectedOption: this.selectedOption,
        isCorrect: this.currentQuestion.options.some((option) => option.text === this.selectedOption && option.isCorrect),
        answeredAt: new Date(),
        used: false,
      };

      console.log(answer);

      this.questionService.answerQuestion(answer).subscribe(
        (response: any) => {
          console.log('Answer submitted:', response);

          if (response.message) {
            this.snackBar.open(response.message, 'Close', {
              duration: 5000,
              panelClass: ['snackbar-info'],
            });
          } else if (response.isCorrect) {
            this.snackBar.open('Right! Your discount code is: ' + response.discountCode, 'Close', {
              duration: 15000,
              panelClass: ['snackbar-success'],
            });
          } else if (response.used) {
            this.snackBar.open('You have already answered this question today!', 'Close', {
              duration: 5000,
              panelClass: ['snackbar-info'],
            });
          } else {
            this.snackBar.open('Incorrect answer. Try again!', 'Close', {
              duration: 5000,
              panelClass: ['snackbar-error'],
            });
          }
        },
        (error) => {
          console.error('Error submitting answer:', error);
          this.snackBar.open('An error occurred while submitting your answer.', 'Close', {
            duration: 5000,
            panelClass: ['snackbar-error'],
          });
        }
      );
    }
  }
}
