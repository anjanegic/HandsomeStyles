import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { News } from '../../../models/news';

@Component({
  selector: 'app-news-edit-dialog',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatOptionModule, MatSelectModule, MatButtonModule, MatIconModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './news-edit-dialog.component.html',
  styleUrl: './news-edit-dialog.component.css',
})
export class NewsEditDialogComponent {
  newsForm: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<NewsEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { news: News }) {
    this.newsForm = this.fb.group({
      title: [data.news.title, []],
      description: [data.news.description, []],
      videoLink: [data.news.videoLink, []],
    });
  }

  onSave(): void {
    if (this.newsForm.valid) {
      this.dialogRef.close(this.newsForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
