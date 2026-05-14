import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  // Create (Cadastrar)
  cadastrar(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  // Read (Fazer Login) - Busca se existe um usuário com aquele email e senha
  login(email: string, senha: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}&senha=${senha}`);
  }

  // Update (Alterar Senha)
  atualizar(id: string, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario);
  }

  // Delete (Deletar Conta)
  deletar(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}