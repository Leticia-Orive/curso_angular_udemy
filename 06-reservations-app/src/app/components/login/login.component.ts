import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IAuth } from '../../models/auth.model';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);

  public formGroup: FormGroup = new FormGroup({});

  ngOnInit(){

    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

  }

  login(){
    const auth: IAuth = this.formGroup.value;
    console.log(auth);
  }

}
