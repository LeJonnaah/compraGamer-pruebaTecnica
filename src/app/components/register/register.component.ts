import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

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
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  // Create form

  createForm() {
    this.formReg = this.fb.group({
      name: ['', Validators.required, Validators.minLength(3)],
      lastName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      dni: ['', Validators.required,],
      phone: ['', Validators.required,],
      password: ['', Validators.required, Validators.minLength(6)],
      confirmPassword: ['', Validators.required, Validators.minLength(6)]
    }, {
      validators: this.passwordsIguales('password', 'confirmPassword')
    });
  }

  // Validations

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

  get invalidName() {
    return this.formReg.get('name')?.invalid && this.formReg.get('name')?.touched;
  }

  get invalidLastName() {
    return this.formReg.get('lastName')?.invalid && this.formReg.get('lastName')?.touched;
  }

  get invalidEmail() {
    return this.formReg.get('email')?.invalid && this.formReg.get('email')?.touched;
  }

  get invalidDni() {
    return this.formReg.get('dni')?.invalid && this.formReg.get('dni')?.touched;
  }

  get invalidPhone() {
    return this.formReg.get('phone')?.invalid && this.formReg.get('phone')?.touched;
  }

  get invalidPassword() {
    return this.formReg.get('password')?.invalid && this.formReg.get('password')?.touched;
  }

  get invalidConfirmPassword() {
    const pass = this.formReg.get('password')?.value;
    const confirmPass = this.formReg.get('confirmPassword')?.value;

    return (pass === confirmPass) ? false : true;
  }

  // Handle submit

  onSubmit() {
    if (this.formReg.invalid) {
      return Object.values(this.formReg.controls).forEach(control => {
        control.markAsTouched();
      });
    } else {
      console.log(this.formReg.value);
      this.userService.register(this.formReg.value.email, this.formReg.value.password)
        .then((userCredential) => {
          this.router.navigate(['/']);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        }
        );
    }
  }
}