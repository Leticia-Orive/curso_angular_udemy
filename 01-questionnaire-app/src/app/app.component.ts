import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';

@Component({
  selector: 'app-root',
  /*En angular 19 ya no se pone ya que por defecto es true
  *standalone:true */
  imports: [RouterOutlet, QuestionnaireComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '01-questionnaire-app';
}
