import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  senha = '';
  mensagem = '';
  tipoMensagem = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  fazerLogin() {
    if (!this.email || !this.senha) {
      this.mensagem = 'Preencha e-mail e senha!';
      this.tipoMensagem = 'mensagem-erro';
      return;
    }

    this.usuarioService.login(this.email, this.senha).subscribe({
      next: (usuarios: any[]) => {
        if (usuarios.length > 0) {
          // Usuário encontrado! Salva no navegador e vai pro perfil
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarios[0]));
          this.router.navigate(['/perfil']);
        } else {
          this.mensagem = 'E-mail ou senha incorretos!';
          this.tipoMensagem = 'mensagem-erro';
        }
      },
      error: () => {
        this.mensagem = 'Erro ao conectar com o banco de dados.';
        this.tipoMensagem = 'mensagem-erro';
      }
    });
  }
}