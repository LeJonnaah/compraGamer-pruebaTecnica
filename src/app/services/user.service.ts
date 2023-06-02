import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private auth: Auth,
    private http: HttpClient
  ) { }

  // Observador para comprobar si el usuario está conectado
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Registro de usuario
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }
    
  // Obtener datos locales desde un archivo JSON
  getLocalData(): Observable<any> {
    return this.http.get('assets/database.json');
  }
  
  // Inicio de sesión del usuario
  login(email: string, password: string) {
    if (this.auth.currentUser && email ) {
      console.log(this.auth.currentUser);
      this.loggedIn.next(true);
    }
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
  // Cierre de sesión del usuario
  logout() {
    this.loggedIn.next(false);
    return signOut(this.auth);
  }
}
