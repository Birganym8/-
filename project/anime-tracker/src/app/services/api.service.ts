import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://127.0.0.1:8000/api';
  // Базовый URL Django
  private url = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

 

  // Получить все аниме
  getAnime(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/anime/`);
  }

  // АВТОРИЗАЦИЯ

  login(data: any): Observable<any> {
    return this.http.post(`${this.url}/login/`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.url}/register/`, data);
  }

  // ЛИЧНЫЙ СПИСОК (MY LIST)

  // Получить список пользователя
  getMyList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/my-list/`);
  }

  // Добавить аниме в список
  addToList(data: { anime: number }): Observable<any> {
    return this.http.post(`${this.url}/my-list/`, data);
  }

  // Обновить статус аниме в списке 
  updateList(id: number, data: any): Observable<any> {
    return this.http.put(`${this.url}/my-list/${id}/`, data);
  }

  // Удалить из списка
  deleteFromList(id: number): Observable<any> {
    return this.http.delete(`${this.url}/my-list/${id}/`);
  }

  // Метод для страницы деталей 
  getAnimeById(id: number | string): Observable<any> {
    return this.http.get(`${this.baseUrl}/anime/${id}/`);
  }

  // Для добавления отзыва 
  addReview(animeId: number, reviewData: any): Observable<any> {
    const payload = {
      anime: animeId,
      text: reviewData.text
    };
    return this.http.post(`${this.baseUrl}/reviews/`, payload);
  }
}
