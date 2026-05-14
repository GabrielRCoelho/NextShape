import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class PerfilComponent implements OnInit {
  usuario: any = null;
  novaSenha = '';
  mensagem = '';
  tipoMensagem = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    // Ao carregar a página, ele busca quem está logado
    const userStr = localStorage.getItem('usuarioLogado');
    if (userStr) {
      this.usuario = JSON.parse(userStr);
    } else {
      this.router.navigate(['/login']); // Se não tiver ninguém, volta pro login
    }
  }

  alterarSenha() {
    if (!this.novaSenha) return;
    
    this.usuario.senha = this.novaSenha;
    
    this.usuarioService.atualizar(this.usuario.id, this.usuario).subscribe({
      next: () => {
        localStorage.setItem('usuarioLogado', JSON.stringify(this.usuario));
        this.mensagem = 'Senha alterada com sucesso!';
        this.tipoMensagem = 'mensagem-sucesso';
        this.novaSenha = '';
      }
    });
  }

  deletarConta() {
    const confirmacao = confirm('Tem certeza que deseja deletar sua conta? Essa ação não tem volta.');
    if (confirmacao) {
      this.usuarioService.deletar(this.usuario.id).subscribe({
        next: () => {
          localStorage.removeItem('usuarioLogado');
          alert('Sua conta foi excluída.');
          this.router.navigate(['/']); // Volta para a Home
        }
      });
    }
  }

  sair() {
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }
}