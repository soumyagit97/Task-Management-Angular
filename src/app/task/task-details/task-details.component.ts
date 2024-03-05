import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  title: string | undefined;
  description: string | undefined;
  duedate: string | undefined;
  status: string | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const itemId = params['id'];

      if (localStorage.getItem("taskList") !== null) {
        try {
          const tempTasklist = JSON.parse(localStorage.getItem("taskList")!);
          const task: any = tempTasklist.find((x: any) => x.id == itemId);

          if (task) {
            this.title = task.title;
            this.description = task.description;
            this.duedate = task.duedate;
            this.status = task.status;
          }
        } catch (error) {
          // console.error('Invalid JSON string:', error.message);
        }
      }
    });
  }

}
