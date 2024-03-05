import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators }  from '@angular/forms';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  statusArr=['Pending','Completed'];
  editForm: FormGroup;
  task:any;
  itemId: number | undefined;
  // taskForm: FormGroup | undefined;
  title:any;
  description:any;
  duedate:any;
  status:any;
  confirmSubmitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { 

    this.editForm = this.fb.group({
      formcontroltitle: ['', Validators.required],
      formcontroldescription: ['', Validators.required],
      formcontrolduedate: ['',Validators.required],
      formcontrolstatus: ['', Validators.required],
    });
  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10);
  }
  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.itemId = params['id'];
    });

    if (localStorage.getItem("taskList") !== null) {
      try {
        let tempTasklist = JSON.parse(localStorage.getItem("taskList")!);
       let task:any=tempTasklist.find((x:any)=>x.id==this.itemId);

       if(task)
       console.table(task)
       this.title=task.title;
       this.description =task.description;
       this.duedate=task.duedate;
       this.status=task.status;
       const formattedDate = this.formatDateForInput(task.duedate);
       this.editForm.patchValue({
        formcontroltitle: task.title,
        formcontroldescription: task.description,
        formcontrolduedate:this.formatDateForInput(task.duedate),
        formcontrolstatus: task.status,
      });
      

       console.log(this.duedate)
    
        // Now, TypeScript assumes that localStorage.getItem("taskList") is not null
        // console.log(tempTasklist);
      } catch (error:any) {
        console.error('Invalid JSON string:', error.message);
      }
    }
  }
 

  onSubmit(): void {
    this.confirmSubmitted = true;

    console.log(this.editForm.controls);
    let task={
      
      "id":this.itemId,
     "title": this.editForm.get("formcontroltitle")?.value,
     "description": this.editForm.get("formcontroldescription")?.value,
     "status": this.editForm.get("formcontrolstatus")?.value,
     "duedate": this.editForm.get("formcontrolduedate")?.value,
    }
    if ( this.confirmSubmitted && this.editForm.valid && localStorage.getItem("taskList") !== null) {
      try {
    //lets find the index where obj is present 
    let tmpTasklist:any=localStorage.getItem("taskList");
    let arr:any[]= JSON.parse(tmpTasklist);

    let index=arr.findIndex(ele=>ele?.id==task.id);
    if(index>-1){
      arr[index]=task;
      localStorage.setItem("taskList",JSON.stringify(arr));
    
      this.router.navigate(['']);
      // Swal.fire({
      //   title: 'Success!',
      //   text: 'Successfully updated',
      //   icon: 'success',
      //   confirmButtonText: 'Cool'
      // })
    }
  }
 catch (error:any) {
  console.error('Invalid JSON string:', error.message);
}

}
  }
}