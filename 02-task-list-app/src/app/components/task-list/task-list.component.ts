import { Component } from '@angular/core';
import { ITask } from '../../models/task.model';
import { TaskComponent } from "./components/task/task.component";

@Component({
  selector: 'app-task-list',
  imports: [TaskComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  public taskListPending: ITask[] = [];
  public taskListCompleted: ITask[] = [];
  public showInputTask: boolean = false;
  public errorInputTask: boolean = false;

  showInputTextTask(){
    this.showInputTask = true;
  }
  createTask(description: string){
    if(description.trim()){
      const task: ITask ={
        date: new Date(),//La fecha de ahora mismo
        description: description.trim(), //description: description es lo mismo
        completed: false
      }
      this.taskListPending.push(task);
      this.showInputTask = false;
      //Mostramos las tareas pendientes
      console.log(this.taskListPending);
      this.errorInputTask = false;//cuando la queremos elimiar sin que halla ningun problema
    }else{
      this.errorInputTask = true;
    }
    }
    removeTask(index: number){
      console.log(index);
    }
    completeTask(index: number){
      console.log(index);
      //Para saber que tarea se ha completado
      const task = this.taskListPending[index];
      //decir que la tarea esta completada
      task.completed = true;
      //podemos actualizar la fecha
      task.date = new Date();
      //la eliminamos de la lista de pendientes
      //splice es para eliminar elementos de un array
      this.taskListPending.splice(index, 1);
      //añadimos la tarea a la lista de completadas
      this.taskListCompleted.push(task);
    }
    

}
