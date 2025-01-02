import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITask } from '../../../../models/task.model';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [DatePipe, NgClass],
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
//Output es para emitir eventos pero creados por nosotros, nos recomienda 
//que el nombre del evento sea el mismo que el nombre de la funcion y que sea un EventEmitter y que sea de tipo number
//Es mejor que lo llamemos con acciones
@Output() remove: EventEmitter<number> = new EventEmitter<number>();
@Output() complete: EventEmitter<number> = new EventEmitter<number>();

//Creamos una funcion que se encargue de emitir el evento
removeTask(): void {
  this.remove.emit(this.index);
}
completeTask(): void {
  this.complete.emit(this.index);
}
}
