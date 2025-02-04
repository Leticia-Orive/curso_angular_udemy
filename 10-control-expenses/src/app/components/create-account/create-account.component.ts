
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IAuthCredentials } from '../../models/auth-credentials';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

  private formBuilder = inject(FormBuilder)
  private authService = inject(AuthService)
  private toastrService = inject(ToastrService)
  private router = inject(Router)

  public formCreateAccount: FormGroup = new FormGroup({})

  ngOnInit(){
    this.formCreateAccount = this.formBuilder.group({
      
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required),
    })
  }

  // Obtención de controles
  get controlEmail(){
    return this.formCreateAccount.get('email')
  }
  
  get controlPassword(){
    return this.formCreateAccount.get('password')
  }

  get controlConfirmPassword(){
    return this.formCreateAccount.get('confirmPassword')
  }

  /**
   * Crea una cuenta en firebase
   */
  createAccount(){

    // obtenemos las credenciales
    const authCredentials = this.formCreateAccount.value as IAuthCredentials;

    // Creamos la cuenta
    this.authService.createAccount(authCredentials).then( () => {
      this.toastrService.success(
        'Cuenta creada',
        'Éxito'
      )
      this.router.navigateByUrl('/registries')
    }, error => {
      console.error(error);
      this.toastrService.error(
        'Ha habido un problema al crear la cuenta',
        'Error'
      )
    })
  }

}
