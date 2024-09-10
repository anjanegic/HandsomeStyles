import { Component, OnInit } from '@angular/core';
import { News } from '../models/news';
import { Comment } from '../models/comments';
import { NewsService } from '../../services/news.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { User } from '../models/user';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-one-news',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './one-news.component.html',
  styleUrls: ['./one-news.component.css'],
})
export class OneNewsComponent implements OnInit {
  news: News;
  comments: Comment[] = [];
  commentForm: FormGroup;
  user: User;

  constructor(private newsService: NewsService, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.newsService.getNewsById(id).subscribe((data) => {
      this.news = data;
      this.fetchComments();
    });
    this.user = this.authService.getUser();

    this.commentForm = new FormGroup({
      comment: new FormControl({ value: '', disabled: !this.user }),
    });
  }

  fetchComments() {
    this.newsService.getCommentsById(this.news._id).subscribe((data) => {
      this.comments = data;
      this.comments = this.comments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      console.log(this.comments);
    });
  }

  isInputDisabled(): boolean {
    return !this.user;
  }

  submitComment() {
    const comment = {
      userId: this.user._id,
      firstname: this.user.firstname,
      comment: this.commentForm.value.comment,
      date: new Date(),
      newsId: this.news._id,
    };
    this.newsService.submitComment(comment).subscribe((data) => {
      this.comments.push(data);
      this.comments = this.comments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.commentForm.reset();
    });
  }

  formatTimeAgo(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000); // years
    if (interval >= 1) return `${interval} year${interval > 1 ? 's' : ''} ago`;

    interval = Math.floor(seconds / 2592000); // months
    if (interval >= 1) return `${interval} month${interval > 1 ? 's' : ''} ago`;

    interval = Math.floor(seconds / 86400); // days
    if (interval >= 1) return `${interval} day${interval > 1 ? 's' : ''} ago`;

    interval = Math.floor(seconds / 3600); // hours
    if (interval >= 1) return `${interval} hour${interval > 1 ? 's' : ''} ago`;

    interval = Math.floor(seconds / 60); // minutes
    if (interval >= 1) return `${interval} minute${interval > 1 ? 's' : ''} ago`;

    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  }

  deleteComment(commentId: string) {
    this.newsService.deleteComment(commentId).subscribe(() => {
      this.fetchComments();
    });
  }
}
