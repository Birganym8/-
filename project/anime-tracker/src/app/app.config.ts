import { Routes } from '@angular/router';
import { AnimeListComponent } from './pages/anime-list/anime-list';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { MyListComponent } from './pages/my-list/my-list';
import { PopularComponent } from './pages/popular/popular';
import { AnimeDetailComponent } from './pages/anime-detail/anime-detail'; 
import { ProfileComponent } from './pages/profile/profile';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings';
import { SearchOverlayComponent } from './pages/search-overlay/search-overlay';

export const routes: Routes = [
  { path: '', redirectTo: 'anime', pathMatch: 'full' }, 
  { path: 'anime', component: AnimeListComponent },
  { path: 'anime-detail/:id', component: AnimeDetailComponent },
  { path: 'anime/:id', component: AnimeDetailComponent }, 
  { path: 'popular', component: PopularComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'my-list', component: MyListComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search-overlay', component: SearchOverlayComponent},
  { path: 'profile-settings', component: ProfileSettingsComponent}

];