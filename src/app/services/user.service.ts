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

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  register(email: string, password: string) {
  return createUserWithEmailAndPassword(this.auth, email, password);
  }
    
  getLocalData(): Observable<any> {
    return this.http.get('assets/database.json');
  }
  
  login(email: string, password: string) {
    if (email && password) {
      this.loggedIn.next(true);
    }
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
  logout() {
    this.loggedIn.next(false);
    return signOut(this.auth);
  }
}