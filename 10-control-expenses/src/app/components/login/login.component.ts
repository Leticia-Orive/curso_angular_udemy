import { Component, inject } from '@angular/core';
import { FormBuilder,  FormControl,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder)

  public formLogin: FormGroup = new FormGroup({});

  ngOnInit(){
    this.formLogin = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
      
  }

  login(){}

}
