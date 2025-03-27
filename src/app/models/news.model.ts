export class News {
  nome:string;
  autor:string;
  titulo:string;
  descricao:string;
  url:string;
  urlImagem:string;
  dataDePublicacao:Date;
  conteudo:string;

  constructor(news:News){
    this.nome = news.nome;
    this.autor = news.autor;
    this.titulo = news.titulo;
    this.descricao = news.descricao;
    this.url = news.url;
    this.urlImagem = news.urlImagem;
    this.dataDePublicacao = news.dataDePublicacao;
    this.conteudo = news.conteudo;
  }
}
