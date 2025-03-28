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
        this.articles.forEach((art) => {
            art.dataDePublicacao = new Date(art.dataDePublicacao).toLocaleString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: '2-digit',
              hour: '2-digit',
              minute: '2-digit'
            });
        })
        console.log(news);
      },
      error: (error) => console.error('Erro ao buscar dados da API:', error),
    });
  };
}
