import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(): Observable<boolean> {
        // El método canActivate se llama cuando se intenta acceder a una ruta protegida

        return this.userService.isLoggedIn.pipe(
            // isLoggedIn es un BehaviorSubject en el servicio UserService que indica si el usuario ha iniciado sesión

            map(isLoggedIn => {
                // El operador map permite transformar el valor emitido por el BehaviorSubject

                if (isLoggedIn) {
                    // Si el usuario ha iniciado sesión, se permite el acceso a la ruta protegida
                    return true;
                } else {
                    // Si el usuario no ha iniciado sesión, se redirige al usuario a la página de inicio de sesión
                    this.router.navigate(['/login']);

                    // Se devuelve falso para indicar que el acceso a la ruta protegida no está permitido
                    return false;
                }
            })
        );
    }
}
