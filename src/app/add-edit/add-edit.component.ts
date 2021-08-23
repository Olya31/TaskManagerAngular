import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { ApiModelDto } from '../shared/api.model';
import { TaskModelDto } from '../shared/task.model';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class TaskComponent implements OnInit {
  id!: string;
  form!: FormGroup;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  task!: TaskModelDto;
  selectedValue: any;
  public minutes!: Array<number>;
  isForecastof48h!: boolean;
  isForecastof24h!: boolean;
  isForecastof3d!: boolean;
  urlApi!: string;
  Data: Array<any> = [
    { 
      id: 1,
      name: 'Forecast for the period of 48 hours', 
      value: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/hourly?'
    },
    { 
      id: 2,
      name: 'Upto next 3 day weather forecast ', 
      value: 'https://weatherapi-com.p.rapidapi.com/forecast.json?'
    },
    { 
      id: 3,
      name: 'Forecast for the period of 24 hours', 
      value: 'https://visual-crossing-weather.p.rapidapi.com/forecast?'
    }
  ];

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
      this.minutes = [];

      for (let i: number = 0; i <= 60; i++) {
        this.minutes[i] = i;
      }
      
    }

  ngOnInit(): void {     
      this.id = this.route.snapshot.params.id;
      this.isAddMode = !this.id;

      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        cronFormat: ['', Validators.required],
        city24h: [''],
        city3d: [''],
        latitude: [''],
        longitude: ['']
  });

  if (!this.isAddMode) {
      this.taskService.getTaskById(this.id)
          .pipe(first())
          .subscribe((data: any) => 
            {
              let minute = this.taskService.convertCronModelStringToString(data.cronFormat);
              
              this.form.patchValue(data)
              this.selectedValue = this.minutes[minute]
            });
  } 
}


onCheckboxChange(event: any) {
  this.Data.forEach(x=>{    
    if(event.target.value == x.value )
    {
      if(event.target.id == 1)
      {
        this.isForecastof48h = true;
        this.isForecastof24h = false;
        this.isForecastof3d = false;
        this.urlApi = event.target.value 
        
      }
      if(event.target.id == 2)
      {
        this.isForecastof3d = true;
        this.isForecastof48h = false;
        this.isForecastof24h = false;
        this.urlApi = event.target.value 
      }
      if(event.target.id == 3)
      {
        this.isForecastof24h = true;
        this.isForecastof3d = false;
        this.isForecastof48h = false;
        this.urlApi = event.target.value 
      }      
    }
  })
}

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createUser();
    } else {
        this.updateUser();
    }
  }

  private createUser() {
    this.taskService.createApiUrl(this.form.value, this.urlApi)
    this.task = this.form.value;
      this.taskService.postTask(this.task)
        .pipe(first())
        .subscribe({
            next: () => {
                this.toastr.success('Added a new task is successfull');
                this.router.navigate(['/home']);
            },
            error: error => {
              this.toastr.error(error);
                this.loading = false;
            }
        });
   }

  private updateUser() {
    this.task = this.form.value;
      this.taskService.putTask(this.id, this.task)
        .pipe(first())
        .subscribe({
            next: () => {
              this.toastr.success('Updated is successfull');
              this.router.navigate(['/home']);
            },
            error: error => {
              this.toastr.error(error);
              console.log(error);
                this.loading = false;
            }
        }); 
   } 
}
