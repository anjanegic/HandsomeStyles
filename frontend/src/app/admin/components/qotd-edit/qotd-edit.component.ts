import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuestionService } from '../../../../services/question.service';
import { Question } from '../../../models/question';
import { CommonModule } from '@angular/common';
import { MatRadioChange, MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QotdEditDialogComponent } from '../qotd-edit-dialog/qotd-edit-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-qotd-edit',
  standalone: true,
  imports: [CommonModule, MatRadioModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './qotd-edit.component.html',
  styleUrl: './qotd-edit.component.css',
})
export class QotdEditComponent implements OnInit {
  @Input() question: Question;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<Question>();

  selectedOption: string;

  constructor(private qotdService: QuestionService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.selectedOption = this.question.options.find((option) => option.isCorrect)?.text;
  }

  changeOption($event: MatRadioChange, option: Question['options'][number]) {
    option.isCorrect = $event.value === option.text;
    this.qotdService.changeAnswer(this.question, option.text).subscribe((data) => {});
  }

  deleteQuestion(question: Question) {
    this.qotdService.deleteQuestion(question._id).subscribe(() => {
      this.close.emit();
    });
  }

  updateQuestion(question: Question) {
    const dialogRef = this.dialog.open(QotdEditDialogComponent, {
      width: '600px',
      data: {
        question: question,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result) {
        this.qotdService.updateQuestion(question._id, result).subscribe((data) => {
          this.close.emit();
        });
      }
    });
  }
}
