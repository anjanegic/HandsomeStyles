import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../app/models/news';
import { Comment } from '../app/models/comments';

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

  deleteNews(id: string) {
    return this.http.post<News>(`${this.uri}/deleteNews/${id}`, {});
  }

  updateNews(id: string, news: any) {
    return this.http.put(`${this.uri}/updateNews/${id}`, news);
  }

  addNews(news: any) {
    return this.http.post<News>(`${this.uri}/addNews`, news);
  }

  deleteComment(commentId: string) {
    return this.http.post<Comment>(`${this.uri}/deleteComment`, { commentId });
  }
}
