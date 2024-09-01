import { Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { Comment } from '../models/comments';
import { NewsService } from '../news.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-one-news',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './one-news.component.html',
  styleUrl: './one-news.component.css',
})
export class OneNewsComponent implements OnInit {
  news: News;
  comments: Comment[] = [];
  commentForm = new FormGroup({
    comment: new FormControl(''),
  });

  constructor(private newsService: NewsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.newsService.getNewsById(id).subscribe((data) => {
      this.news = data;
      this.fetchComments();
    });
  }
  fetchComments() {
    this.newsService.getCommentsById(this.news._id).subscribe((data) => {
      this.comments = data;
    });
  }

  submitComment() {}
}
