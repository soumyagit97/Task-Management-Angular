import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/task-interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private router: Router) { 

  }
  taskList:Task[]=[];
  ngOnInit(): void {
    if(localStorage.getItem('taskList')===null){ 
    let y=[1,2,3,4,5,6];
    let tempTasklist=[];
    for(let z of y){   //Creating this loop bcz it will be displayed without data in the page
      let task:Task={ title: "Titel-"+z,
        description: "Hrlloe Please Complete the task",
        duedate:new Date(),
        status:"Pending",
        id:z
      };
     tempTasklist.push(task);
    }
    localStorage.setItem("taskList",JSON.stringify(tempTasklist));
  }
    let data=localStorage.getItem("taskList");
    
    if (data) {
      this.taskList = JSON.parse(data);
      console.log('Retrieved Array:', this.taskList);
    } else {
      console.log('No array found in local storage');
    }
  }


  editTask(id:number){

    this.router.navigate(['/edit-task'], {
      queryParams: { id: id },
    });
  }
  viewTask(){

  }
  deleteTask(){

  }


}
