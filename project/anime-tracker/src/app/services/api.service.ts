import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  // Вспомогательная функция для заголовков с токеном
  private getHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      headers: new HttpHeaders({
        'Authorization': token ? `Token ${token}` : ''
      })
    };
  }

  // АВТОРИЗАЦИЯ
  login(data: any): Observable<any> {
    return this.http.post(`${this.url}/login/`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.url}/register/`, data);
  }

  // СПИСОК ПОЛЬЗОВАТЕЛЯ (теперь с заголовками!)
  getMyList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/my-list/`, this.getHeaders());
  }

  // АНИМЕ (публичные запросы, заголовки не обязательны, но не помешают)
  getAnime(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/anime/`);
  }

  getAnimeById(id: number | string): Observable<any> {
    return this.http.get(`${this.url}/anime/${id}/`);
  }
}