import { Component, OnInit } from '@angular/core';
import { GetNewsService } from '../../services/get-news.service';
import { News } from '../../models/news.model';

@Component({
  selector: 'app-news',
  imports: [],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  articles: News[] = [];
  constructor(private service: GetNewsService) {}

  ngOnInit(): void {
    this.getNews('us');
  }

  getNews = (country: string): void => {
    this.service.getNews(country).subscribe({
      next: (news) => {
        this.articles = news;
        console.log(news);
      },
      error: (error) => console.error('Erro ao buscar dados da API:', error),
    });
  };
}
