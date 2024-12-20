import { Component } from '@angular/core';
import { ITask } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  imports: [],
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
    

}
