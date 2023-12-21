import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Film } from './model/Film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  apiUrl = "http://localhost:8080/films";

  constructor(private http: HttpClient) { }

  getAllFilm(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  searchByKeyword(keyword: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/search?keyword=" + keyword);
  }

  postFilm(film: Film): Observable<any> {
    console.log("postFilm : ", film);
    return this.http.post(this.apiUrl, film);
  }
  
}
