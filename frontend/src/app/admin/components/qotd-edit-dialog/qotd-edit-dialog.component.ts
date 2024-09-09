import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Question } from '../../../models/question';
import { Option } from '../../../models/question';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-qotd-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatOptionModule, MatSelectModule, MatButtonModule, MatIconModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './qotd-edit-dialog.component.html',
  styleUrl: './qotd-edit-dialog.component.css',
})
export class QotdEditDialogComponent implements OnInit {
  question: Question;
  questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public dialogRef: MatDialogRef<QotdEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { question: Question }) {}

  ngOnInit(): void {
    this.question = this.data.question;
    this.questionForm = this.formBuilder.group({
      question: [this.question.question, []],
      options: this.formBuilder.array([]),
    });

    // Popunjavanje FormArray sa postojećim opcijama
    this.question.options.forEach((option) => {
      this.addOption(option);
    });
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  addOption(option: Option = { text: '', isCorrect: false }): void {
    this.options.push(
      this.formBuilder.group({
        text: [option.text, Validators.required],
        isCorrect: [option.isCorrect],
      })
    );
  }

  onSave(): void {
    if (this.questionForm.valid) {
      this.dialogRef.close(this.questionForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
