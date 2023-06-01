import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private auth: Auth) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  register(email: string, password: string) {
  return createUserWithEmailAndPassword(this.auth, email, password);
  }
    
  login(email: string, password: string) {
    this.loggedIn.next(true);
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  
  logout() {
    this.loggedIn.next(false);
    return signOut(this.auth);
  }

}
