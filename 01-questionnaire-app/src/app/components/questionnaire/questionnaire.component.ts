import { Component } from '@angular/core';
import { IQuestion } from '../../models/question.model';
import { NgClass,  } from '@angular/common';


@Component({
  selector: 'app-questionnaire',
  imports: [NgClass,],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss'
})
export class QuestionnaireComponent {
//Creamos propiedades o atributos
//se puede poner un modificacor de acceso como private o public
//cuando hay que poner public o private: 
//public es cuando va estar expuesto a otros componentes 
// private es cuando no va a estar expuesto a otros componentes
public question: IQuestion = {
  text: '¿Cuál es la capital de España?',
  answerOptions: ['Madrid', 'Barcelona', 'Sevilla', 'Valencia'],
  correctAnswerIndex: 0
}
//vamos a añadir alguna propiedad mas
//podemos ponerlo asi pero siempre es mejor poner boolean :
//public answerChosed= false;
//o asi:
public answerChosed: boolean = false;
public answerCorrect: boolean = false;

//Funcion que se ejecuta cuando se selecciona una respuesta
checkAnswer(indexAnswer: number) {
  this.answerCorrect = this.question.correctAnswerIndex === indexAnswer;
  this.answerChosed = true;
  console.log(this.answerCorrect);

}
}
