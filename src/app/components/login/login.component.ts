import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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

  // Crea el formulario y define las validaciones
  createForm() {
    this.formLogin = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Propiedad de conveniencia para verificar si el campo de email es inválido
  get isInvalidEmail() {
    return this.formLogin.get('email')?.invalid && this.formLogin.get('email')?.touched;
  }

  // Propiedad de conveniencia para verificar si el campo de contraseña es inválido
  get isInvalidPassword() {
    return this.formLogin.get('password')?.invalid && this.formLogin.get('password')?.touched;
  }

  onSubmit() {
    this.userService.login(this.formLogin.value.email, this.formLogin.value.password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Guarda el usuario en el localStorage
        localStorage.setItem('user', JSON.stringify(user));
        // Alerta de éxito
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Logueado correctamente!',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/']);
      })
      .catch((error) => {
        // Alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Usuario o contraseña incorrectos!',
        });
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
}
