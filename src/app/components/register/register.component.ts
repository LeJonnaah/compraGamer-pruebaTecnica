import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
    this.formReg = new FormGroup({
      name: new FormControl(),
      lastName: new FormControl(),
      phone: new FormControl(),
      dni: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.userService.register(this.formReg.value.email, this.formReg.value.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
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
