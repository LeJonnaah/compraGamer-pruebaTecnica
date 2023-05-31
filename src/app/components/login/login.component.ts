
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