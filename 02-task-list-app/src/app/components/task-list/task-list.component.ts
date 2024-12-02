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

}
