import { Component, Input } from '@angular/core';
import { ITask } from '../../../../models/task.model';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  //Si nos sale este error:Property 'task' has no initializer and is not definitely assigned in the constructor.ts
  //podemos hacer dos cosas:
  //podemos crear una especie de task vacio
   //@Input() task: ITask = {};
   // y otra solucion es poner el signo de explamacion al lado de la variable que nos dice que esto no es nulo

  @Input({required: true}) task!: ITask;
  @Input() index: number = 0;

}
