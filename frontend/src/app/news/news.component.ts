import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  title = 'News';
  constructor(private newsService: NewsService, private router: Router) {}

  news: any[] = [];

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews() {
    this.newsService.getNews().subscribe((data: any[]) => {
      this.news = data;
      this.news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      console.log(this.news);
    });
  }

  getShortDescription(description: string): string {
    return description.length > 100 ? description.substring(0, 400) + '...' : description;
  }

  navigateToNews(id: string) {
    this.router.navigate(['/one-news', id]);
  }
}
