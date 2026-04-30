import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Copie seu CSS para aqui
})
export class LoginComponent {
  email = '';
  senha = '';
  mensagem = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  fazerLogin() {
    this.usuarioService.getUsuarios(this.email, this.senha).subscribe(res => {
      if (res.length > 0) {
        localStorage.setItem('usuarioLogado', JSON.stringify(res[0]));
        this.router.navigate(['/perfil']); // Vai para o CRUD completo
      } else {
        this.mensagem = 'Usuário ou senha incorretos.';
      }
    });
  }

  irParaCadastro() {
    this.router.navigate(['/cadastro']);
  }
}