import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from './models/news';
import { Comment } from './models/comments';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  uri = 'http://localhost:4000/news';

  constructor(private http: HttpClient) {}

  getNews() {
    return this.http.get<News[]>(`${this.uri}/getAllNews`);
  }

  getNewsById(id: string) {
    return this.http.get<News>(`${this.uri}/getNewsById/${id}`);
  }

  getCommentsById(id: string) {
    return this.http.get<Comment[]>(`${this.uri}/getCommentsById/${id}`);
  }

  submitComment(comment: Comment) {
    return this.http.post<Comment>(`${this.uri}/submitComment`, comment);
  }
}
