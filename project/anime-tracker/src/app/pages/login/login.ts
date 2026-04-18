import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

declare var google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class LoginComponent implements OnInit {
  // Изменим название переменной на username, чтобы она совпадала с ожиданиями Django
  username = ''; 
  password = '';
  isLoading = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.initGoogle();
    // Рендеринг кнопки Google (твой код остается)
    if (typeof google !== 'undefined') {
      google.accounts.id.renderButton(
        document.getElementById("googleBtn"),
        { theme: "outline", size: "large", width: 320 }
      );
    }
  }

  initGoogle() {
    if (typeof google !== 'undefined') {
      google.accounts.id.initialize({
        client_id: '818339186100-48c4r7ivmnv71bv5trg2go6p2630qipu.apps.googleusercontent.com',
        callback: (response: any) => this.handleGoogleResponse(response)
      });
    }
  }

  handleGoogleResponse(response: any) {
    console.log('Google токен получен:', response.credential);
    localStorage.setItem('token', response.credential); // Сохраняем как основной токен
    this.router.navigate(['/dashboard']);
  }

  login() {
    if (!this.username || !this.password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    this.isLoading = true;

    // Отправляем данные на бэкенд
    // Мы передаем username, даже если в инпуте ввели почту
    const credentials = {
      username: this.username, 
      password: this.password
    };

    this.api.login(credentials).subscribe({
      next: (response: any) => {
        console.log('Успешный вход!', response);
        
        // КРИТИЧЕСКИ ВАЖНО: Сохраняем токен, который прислал Django
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.user.username);
        
        this.router.navigate(['/dashboard']); // Или на /profile
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Ошибка логина:', err);
        alert('Неверный логин или пароль');
      }
    });
  }
}