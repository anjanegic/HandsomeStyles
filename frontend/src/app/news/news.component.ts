import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { NewsService } from '../../services/news.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  title = 'News';
  constructor(private newsService: NewsService, private router: Router) {}

  news: any[] = [];
  paginatedNews = new MatTableDataSource<any>(this.news);
  pageSize = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.fetchNews();
  }

  ngAfterViewInit(): void {
    this.paginatedNews.paginator = this.paginator;
  }

  fetchNews() {
    this.newsService.getNews().subscribe((data: any[]) => {
      this.news = data;
      this.news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.paginatedNews.data = this.news;
      this.paginatedNews.paginator = this.paginator;
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  getShortDescription(description: string): string {
    return description.length > 100 ? description.substring(0, 400) + '...' : description;
  }

  navigateToNews(id: string) {
    this.router.navigate(['/one-news', id]);
  }
}
