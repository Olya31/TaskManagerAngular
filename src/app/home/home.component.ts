import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskModelDto } from '../shared/task.model';
import { TaskService } from '../shared/task.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public tasks!: Array<TaskModelDto>;

  constructor(
    private router: Router,
    public userService : UserService,
    private toastr: ToastrService,
    public taskService: TaskService) { 
      this.tasks = new Array<TaskModelDto>();
    }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.refreshList().subscribe((data: Array<TaskModelDto>) => {
      if(data != null)
      {        
        this.tasks = data;         
      }
       });
  }

  Logout() {
    this.userService.logout().subscribe((data: any) => {
      if(data == true)
      {        
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);        
      }
       });
    
  }

  onUpdate(task: TaskModelDto) {
    this.router.navigate(['/edit', task.id]);
  }

  onDelete(id: number) {
    console.log(id);
      this.taskService.deleteTask(id).subscribe(res => {
        if(res == true)
        {
          this.taskService.refreshList();
          this.toastr.success('Deleted successfully');
        }
        else{
          this.toastr.error('Deleted unsuccessful');
        }
      });    
  }
}
