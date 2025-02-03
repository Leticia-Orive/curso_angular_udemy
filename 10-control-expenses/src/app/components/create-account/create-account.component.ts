
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

  private formBuilder = inject(FormBuilder)

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
  createAccount(){}

}
