import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  formLogin!: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  // Create form

  createForm() {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required ]
    });
  }

  // Validations

  get invalidEmail() {
    return this.formLogin.get('email')?.invalid && this.formLogin.get('email')?.touched;
  }

  get invalidPassword() {
    return this.formLogin.get('password')?.invalid && this.formLogin.get('password')?.touched;
  }

  // Handle Submit

  onSubmit() {
    this.userService.login(this.formLogin.value.email, this.formLogin.value.password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('Usuario logueado');
        this.router.navigate(['/']);
      }
      )
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      }
      );
  }
}
