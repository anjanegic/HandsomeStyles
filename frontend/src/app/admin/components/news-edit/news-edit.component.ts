import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from '../../../models/news';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NewsService } from '../../../../services/news.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NewsEditDialogComponent } from '../news-edit-dialog/news-edit-dialog.component';

@Component({
  selector: 'app-news-edit',
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, CommonModule, FormsModule, MatButtonModule, MatIconModule, MatDialogModule],

  templateUrl: './news-edit.component.html',
  styleUrl: './news-edit.component.css',
})
export class NewsEditComponent implements OnInit {
  @Input() news: News;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<News>();

  constructor(private newsService: NewsService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  deleteNews(news: News) {
    this.newsService.deleteNews(news._id).subscribe(() => {
      this.close.emit();
    });
  }

  updateNews(news: News) {
    const dialogRef = this.dialog.open(NewsEditDialogComponent, {
      width: '600px',
      data: {
        news: news,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);

      if (result) {
        this.newsService.updateNews(news._id, result).subscribe((data) => {
          this.close.emit();
        });
      }
    });
  }

  formatDate(dateOfNews: Date) {
    const date = new Date(dateOfNews);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
