import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class CadastroComponent {
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  mensagem = '';
  tipoMensagem = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  cadastrar() {
    if (!this.nome || !this.email || !this.senha) {
      this.mensagem = 'Preencha todos os campos!';
      this.tipoMensagem = 'mensagem-erro';
      return;
    }
    if (this.senha !== this.confirmarSenha) {
      this.mensagem = 'As senhas não coincidem!';
      this.tipoMensagem = 'mensagem-erro';
      return;
    }

    const novoUsuario = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

    this.usuarioService.cadastrar(novoUsuario).subscribe({
      next: (resposta: any) => {
        // Salva os dados no navegador para a tela de Perfil saber quem está logado
        localStorage.setItem('usuarioLogado', JSON.stringify(resposta));
        this.router.navigate(['/perfil']); // Vai direto pro perfil!
      },
      error: () => {
        this.mensagem = 'Erro ao conectar com o JSON Server.';
        this.tipoMensagem = 'mensagem-erro';
      }
    });
  }
}