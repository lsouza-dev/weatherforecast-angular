export class News {
  nome:string;
  autor:string;
  titulo:string;
  descricao:string;
  url:string;
  urlImagem:string;
  dataDePublicacao:string;
  conteudo:string;

  constructor(news:News){
    this.nome = news.nome;
    this.autor = news.autor;
    this.titulo = news.titulo;
    this.descricao = news.descricao;
    this.url = news.url;
    this.urlImagem = news.urlImagem;
    this.dataDePublicacao = news.dataDePublicacao.toString();
    this.conteudo = news.conteudo;
  }
}
