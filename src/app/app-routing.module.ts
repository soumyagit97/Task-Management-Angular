import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { TaskDetailsComponent } from './task/task-details/task-details.component';
import { TaskListComponent } from './task/task-list/task-list.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'edit-task', component: EditTaskComponent },
  { path: 'task-details', component: TaskDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
