import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, Router, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  showSearch = false;
  isDropdownOpen = false;
  isProfileMenuOpen = false;
  videoUrl: SafeResourceUrl;

  constructor(public router: Router, private sanitizer: DomSanitizer) {
    // Настройка видео-пасхалки
    const videoId = 'T-qGlh4joXU';
    const rawUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=0`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  }

  /**
   * Проверка авторизации. 
   * Предполагаем, что при успешном логине ты сохраняешь токен под ключом 'access_token'
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  /**
   * Логика клика по иконке профиля
   */
  toggleProfileMenu(event: Event) {
    event.stopPropagation();
    
    if (this.isLoggedIn()) {
      // Если юзер залогинен — сразу переходим в профиль
      this.router.navigate(['/profile']);
      this.isProfileMenuOpen = false;
    } else {
      // Если не залогинен — переключаем выпадающее меню
      this.isDropdownOpen = false; 
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    }
  }

  /**
   * Логика клика по "Категории"
   */
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isProfileMenuOpen = false;
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  /**
   * Закрытие всех всплывающих панелей
   */
  closeAllMenus() {
    this.isDropdownOpen = false;
    this.isProfileMenuOpen = false;
  }

  /**
   * Пасхалка с яблоком
   */
  openEasterEgg(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.showVideo = true;
  }

  closeVideo() {
    this.showVideo = false;
  }
}