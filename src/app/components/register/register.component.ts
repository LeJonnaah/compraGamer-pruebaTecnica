import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  formReg!: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  // Crea el formulario y define las validaciones
  createForm() {
    this.formReg = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dni: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validators: this.passwordsIguales('password', 'confirmPassword')
    });
  }

  // Validador personalizado para verificar si las contraseñas coinciden
  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    };
  }

  // Propiedades de conveniencia para verificar si los campos son inválidos
  get isInvalidName() {
    return this.formReg.get('name')?.invalid && this.formReg.get('name')?.touched;
  }
  get isInvalidLastName() {
    return this.formReg.get('lastName')?.invalid && this.formReg.get('lastName')?.touched;
  }
  get isInvalidEmail() {
    return this.formReg.get('email')?.invalid && this.formReg.get('email')?.touched;
  }
  get isInvalidDni() {
    return this.formReg.get('dni')?.invalid && this.formReg.get('dni')?.touched;
  }
  get isInvalidPhone() {
    return this.formReg.get('phone')?.invalid && this.formReg.get('phone')?.touched;
  }
  get isInvalidPassword() {
    return this.formReg.get('password')?.invalid && this.formReg.get('password')?.touched;
  }
  get isInvalidConfirmPassword() {
    const pass = this.formReg.get('password')?.value;
    const confirmPass = this.formReg.get('confirmPassword')?.value;

    return pass !== confirmPass;
  }

  onSubmit() {
    if (this.formReg.invalid) {
      // Marcar todos los controles como tocados si el formulario es inválido
      Object.values(this.formReg.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      // Realizar el registro
      this.userService.register(this.formReg.value.email, this.formReg.value.password)
        .then((userCredential) => {
          const userData = {
            email: this.formReg.value.email,
            uid: userCredential.user.uid
          };
          // Guardar datos en el arreglo de registros
          const formData = {
            userData: userData,
            formData: this.formReg.value
          };
          const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
          registrations.push(formData);
          localStorage.setItem('registrations', JSON.stringify(registrations));
          this.router.navigate(['/']);
          // Alerta de éxito
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: '¡Bienvenido!',
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch((error) => {
          // Alerta de error
          Swal.fire({
            icon: 'error',
            title: 'Error al registrar',
            text: error.message,
            confirmButtonText: 'Aceptar'
          });
        });
    }
  }
  
}
