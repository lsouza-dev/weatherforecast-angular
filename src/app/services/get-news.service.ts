import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News } from '../models/news.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetNewsService {
  private apiUrl = 'http://localhost:5122/NewsApi';
  constructor(private http: HttpClient) {}

  getNews(country: string): Observable<News[]> {
    return this.http.get<News[]>(`${this.apiUrl}/${country}`).pipe(
      map((data) =>
        data.map(
          (news) =>
            new News({
              nome: news.nome,
              autor: news.autor,
              titulo: news.titulo,
              descricao: news.descricao,
              url: news.url,
              urlImagem: news.urlImagem,
              dataDePublicacao: news.dataDePublicacao,
              conteudo: news.conteudo,
            })
        )
      )
    );
  }
}
