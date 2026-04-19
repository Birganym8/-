import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular.html',
  styleUrls: ['./popular.css']
})
export class PopularComponent implements OnInit {
  allAnimes: any[] = [];
  private apiUrl = 'http://127.0.0.1:8000/api/anime/';

  selectedAnime: any = null;
  currentStatus: string = '';

  statuses = [
    { label: 'Смотрю',        value: 'watching'  },
    { label: 'Просмотрено',   value: 'completed' },
    { label: 'Запланировано', value: 'planned'   },
    { label: 'Брошено',       value: 'dropped'   },
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => this.allAnimes = data,
      error: (err) => console.error('Django не отвечает:', err)
    });
  }

  navigateToAnime(id: number) {
    this.router.navigate(['/anime-detail', id]);
  }

  openStatusModal(anime: any) {
    this.selectedAnime = anime;
    this.currentStatus = anime.userStatus || '';
  }

  closeModal(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('status-overlay')) {
      this.selectedAnime = null;
    }
  }

  selectStatus(status: string) {
    this.currentStatus = status;
  }

  saveStatus() {
    if (!this.currentStatus || !this.selectedAnime) return;
    this.http.post('http://127.0.0.1:8000/api/user-anime-list/', {
      anime: this.selectedAnime.id,
      status: this.currentStatus
    }).subscribe({
      next: () => {
        this.selectedAnime.userStatus = this.currentStatus;
        this.selectedAnime = null;
      },
      error: (err) => console.error('Ошибка', err)
    });
  }

  removeFromList() {
    this.http.delete(`http://127.0.0.1:8000/api/user-anime-list/${this.selectedAnime.id}/`).subscribe({
      next: () => {
        this.selectedAnime.userStatus = '';
        this.selectedAnime = null;
      },
      error: (err) => console.error('Ошибка', err)
    });
  }
}