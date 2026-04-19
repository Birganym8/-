import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anime-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './anime-list.html',
  styleUrl: './anime-list.css',
})
export class AnimeListComponent implements OnInit {



  animeList: any[] = [];
  search: string = '';

  constructor(private api: ApiService, private router: Router) {}

  navigateToAnime(id: number) {
  this.router.navigate(['/anime', id]);
  }

  ngOnInit(): void {
    this.loadAnime();
  }

  
  loadAnime() {
    this.api.getAnime().subscribe({
      next: (data: any) => {
        this.animeList = data;
        console.log('Данные успешно загружены с Django!');
      },
      error: (err) => {
        console.error('Ошибка связи с бэкендом. Проверь CORS или URL.', err);
      }
    });
  }


  selectedAnime: any = null;
  currentStatus: string = '';

  statuses = [
    { label: 'Смотрю',        value: 'watching'   },
    { label: 'Просмотрено',   value: 'completed'  },
    { label: 'Запланировано', value: 'planned'     },
    { label: 'Брошено',       value: 'dropped'     },
  ];

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
    this.api.addToList({ anime: this.selectedAnime.id, status: this.currentStatus }).subscribe({
      next: () => {
        this.selectedAnime.userStatus = this.currentStatus;
        this.selectedAnime = null;
      },
      error: (err) => console.error('Ошибка сохранения', err)

    });
  }

  removeFromList() {
    this.api.removeFromList(this.selectedAnime.id).subscribe({
      next: () => {
        this.selectedAnime.userStatus = '';
        this.selectedAnime = null;
      },
      error: (err) => console.error('Ошибка удаления', err)
    });
  }
}