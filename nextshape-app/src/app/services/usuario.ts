import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  // READ: Buscar todos ou filtrar por login
  getUsuarios(email?: string, senha?: string): Observable<any[]> {
    let url = this.apiUrl;
    if (email && senha) url += `?email=${email}&senha=${senha}`;
    return this.http.get<any[]>(url);
  }

  // CREATE: Salvar novo usuário
  createUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  // UPDATE: Atualizar dados
  updateUsuario(id: string, dados: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, dados);
  }

  // DELETE: Remover conta
  deleteUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}