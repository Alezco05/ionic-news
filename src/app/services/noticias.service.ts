import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
})

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  headLinePage = 0;
  constructor(private http: HttpClient) { }
  //<T> De tipo generico
  private ejecutarQuery<T>(query: string){
    query = apiUrl + query;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadLines() {
    this.headLinePage++;
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.headLinePage}`);
    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`);
  }
  getTopHeadlineCategory(categoria: string){
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${categoria}`);
  }
}
