import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IAuth } from '../../models/auth.model';
import { Store } from '@ngxs/store';
import { LoginAction } from '../../state/auth/auth.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private store = inject(Store);
  private toastrService = inject(ToastrService)

  public formLogin: FormGroup = new FormGroup({});

  ngOnInit(){
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  checkLogin(){
    // Obtenemos las credenciales
    const authCredentials: IAuth = this.formLogin.value;
    // Hacemos el login
    this.store.dispatch(new LoginAction({ authCredentials })).subscribe({
      next: () => {
        this.toastrService.success(
          'Logueado con éxito',
          'Éxito'
        );
      }, error: () => {
        this.toastrService.error(
          'Error al loguearse',
          'Error'
        );
      }
    })

  }
}
