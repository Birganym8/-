import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router'; // 👈 1. Добавь этот импорт

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [CommonModule, RouterLink], // 👈 2. Добавь RouterLink сюда
  templateUrl: './popular.html',
  styleUrls: ['./popular.css']
})
export class PopularComponent implements OnInit {
  allAnimes: any[] = []; 
  private apiUrl = 'http://127.0.0.1:8000/api/anime/'; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAnimeFromDjango();
  }

  getAnimeFromDjango() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.allAnimes = data;
      },
      error: (err) => {
        console.error('Django не отвечает:', err);
      }
    });
  }
}