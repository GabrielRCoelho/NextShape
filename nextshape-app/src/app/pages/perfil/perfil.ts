import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuarioLogado: any = null;
  novaSenha = '';
  
  mensagem = '';
  tipoMensagem = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    // Recupera os dados do usuário que fez o login
    const usuarioStore = localStorage.getItem('usuarioLogado');
    
    if (usuarioStore) {
      this.usuarioLogado = JSON.parse(usuarioStore);
    } else {
      // Se tentar acessar o perfil sem estar logado, joga de volta pro login
      this.router.navigate(['/login']);
    }
  }

  atualizarSenha() {
    if (!this.novaSenha) {
      this.mostrarMensagem('Digite a nova senha para atualizar!', 'mensagem-erro');
      return;
    }

    // Operação UPDATE: Atualiza apenas o campo "senha" do usuário logado
    this.usuarioService.updateUsuario(this.usuarioLogado.id, { senha: this.novaSenha }).subscribe({
      next: () => {
        this.mostrarMensagem('Senha atualizada com sucesso!', 'mensagem-sucesso');
        
        // Atualiza a informação no navegador também
        this.usuarioLogado.senha = this.novaSenha;
        localStorage.setItem('usuarioLogado', JSON.stringify(this.usuarioLogado));
        
        this.novaSenha = ''; // Limpa o campo
      },
      error: (erro) => {
        console.error("Erro na API:", erro);
        this.mostrarMensagem('Erro ao atualizar a senha.', 'mensagem-erro');
      }
    });
  }

  deletarConta() {
    // Alerta de confirmação antes de excluir
    if (confirm('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.')) {
      
      // Operação DELETE: Remove o usuário do banco de dados
      this.usuarioService.deleteUsuario(this.usuarioLogado.id).subscribe({
        next: () => {
          alert('Conta excluída com sucesso.');
          this.fazerLogout();
        },
        error: (erro) => {
          console.error("Erro na API:", erro);
          this.mostrarMensagem('Erro ao excluir a conta.', 'mensagem-erro');
        }
      });
    }
  }

  fazerLogout() {
    // Limpa a memória do navegador e volta pro login
    localStorage.removeItem('usuarioLogado');
    this.router.navigate(['/login']);
  }

  mostrarMensagem(texto: string, classeCSS: string) {
    this.mensagem = texto;
    this.tipoMensagem = classeCSS;
  }
}