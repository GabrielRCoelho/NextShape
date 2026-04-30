import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule], // Necessário para o ngModel funcionar
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  // Variáveis vinculadas ao HTML
  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  
  mensagem = '';
  tipoMensagem = ''; // Define se o CSS da mensagem será de erro ou sucesso

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  cadastrar() {
    this.mensagem = ''; // Limpa mensagens anteriores

    // 1. Validação do Frontend
    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      this.mostrarMensagem('Por favor, preencha todos os campos!', 'mensagem-erro');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mostrarMensagem('As senhas não coincidem!', 'mensagem-erro');
      return;
    }

    // 2. Operação READ: Verifica se o e-mail já existe na API
    this.usuarioService.getUsuarios(this.email).subscribe(usuariosEncontrados => {
      
      if (usuariosEncontrados.length > 0) {
        this.mostrarMensagem('Este e-mail já está em uso!', 'mensagem-erro');
      } else {
        
        // 3. Monta o objeto do novo usuário
        const novoUsuario = {
          nome: this.nome,
          email: this.email,
          senha: this.senha
        };

        // 4. Operação CREATE: Salva no banco de dados via API
        this.usuarioService.createUsuario(novoUsuario).subscribe({
          next: () => {
            this.mostrarMensagem('Conta criada com sucesso! Redirecionando...', 'mensagem-sucesso');
            
            // Aguarda 2 segundos e manda para o login
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          },
          error: (erro) => {
            console.error("Erro na API:", erro);
            this.mostrarMensagem('Erro ao conectar com o servidor.', 'mensagem-erro');
          }
        });
      }
    });
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }

  mostrarMensagem(texto: string, classeCSS: string) {
    this.mensagem = texto;
    this.tipoMensagem = classeCSS;
  }
}