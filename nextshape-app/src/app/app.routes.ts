import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login'; // ou o caminho exato de onde está sua classe Login
import { CadastroComponent } from './pages/cadastro/cadastro'; 
import { PerfilComponent } from './pages/perfil/perfil';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Esta linha faz o sistema iniciar no Index!
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: '' } // Se digitar uma URL que não existe, volta pra Home
];