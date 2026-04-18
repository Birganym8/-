import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // 👈 Добавляем эт
import { SearchOverlayComponent } from './pages/search-overlay/search-overlay';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CommonModule, RouterOutlet, RouterLink, RouterModule, SearchOverlayComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  showVideo = false;
  videoUrl: SafeResourceUrl;

  constructor(public router: Router, private sanitizer: DomSanitizer) {
    // Формируем ссылку: 
    // autoplay=1 (сразу играть), loop=1 (повтор), playlist=ID (обязательно для loop в YouTube)
    const videoId = 'T-qGlh4joXU';
    const rawUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=0`;
    
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }

  // Метод для открытия видео
  openEasterEgg(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.showVideo = true;
  }

  // Метод для закрытия
  closeVideo() {
    this.showVideo = false;
  }

  isDropdownOpen = false;
  toggleDropdown(event: Event) {
    event.stopPropagation(); 
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  closeDropdown() {
    this.isDropdownOpen = false;
  }

  showSearch = false;
}