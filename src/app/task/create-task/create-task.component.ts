import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  createForm: FormGroup;
  statusArr = ['Pending', 'Completed'];
  confirmSubmitted: boolean = false;
  currentUrl: any;
  subMenuName = '';


  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      formcontroltitle: ['', [Validators.required]],
      formcontroldescription: ['', [Validators.required]],
      formcontrolduedate: ['', [Validators.required]],
      formcontrolstatus: ['Pending', [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.currentUrl = this.router.url;
    console.log('Current URL:', this.currentUrl);
  }

  onSubmit(): void {
    this.confirmSubmitted = true;

    if (this.confirmSubmitted && this.createForm.valid && localStorage.getItem("taskList") !== null) {
      try {
        //lets find the index where obj is present 
        let tmpTasklist: any = localStorage.getItem("taskList");
        let arr: any[] = JSON.parse(tmpTasklist);



        let maxid = 1;
        for (let obj of arr) {
          if (obj.id > maxid)
            maxid = obj.id;
        }
        let task = {

          "id": maxid + 1,
          "title": this.createForm.get("formcontroltitle")?.value,
          "description": this.createForm.get("formcontroldescription")?.value,
          "status": this.createForm.get("formcontrolstatus")?.value,
          "duedate": this.createForm.get("formcontrolduedate")?.value,
        }
        arr.push(task);
        localStorage.setItem("taskList", JSON.stringify(arr));

        this.router.navigate(['']);
        // Swal.fire({
        //   title: 'Success!',
        //   text: 'Successfully updated',
        //   icon: 'success',
        //   confirmButtonText: 'Cool'
        // })


      }
      catch (error: any) {
        console.error('Invalid JSON string:', error.message);
      }

    }

  }

}
