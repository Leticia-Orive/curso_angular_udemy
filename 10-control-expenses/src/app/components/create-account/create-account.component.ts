
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss'
})
export class CreateAccountComponent {

  private formBuilder = inject(FormBuilder)

  public formCreateAccount: FormGroup = new FormGroup({})

  ngOnInit(){
    this.formCreateAccount = this.formBuilder.group({
      
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    })
  }
  createAccount(){}

}
