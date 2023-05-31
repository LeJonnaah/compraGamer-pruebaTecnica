import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onClick() {
    this.userService.logout();
    this.router.navigate(['/']);
    alert('You have been logged out');
  }
}