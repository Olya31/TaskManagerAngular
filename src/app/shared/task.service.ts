import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { TaskModelDto } from './task.model';
import { CronModelDto } from './cron.model';

@Injectable({
    providedIn: 'root'
  })

export class TaskService {  
  formData!  : TaskModelDto;
  list! : TaskModelDto[];
  cron = new CronModelDto;
  cronString!: string;
  cronFormatString!: string[];
  urlApi!: string;
  header!: string;
  readonly rootUrl = 'http://localhost:56166/api/task';

  constructor(private http: HttpClient) { }

  postTask(formData : TaskModelDto){
    this.convertStringToCronString(formData.cronFormat);
    var reqHeader = new HttpHeaders({ 
      'Authorization': 'Bearer ' + localStorage.getItem('userToken'),
    });

    console.log(reqHeader)
    const body: TaskModelDto = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      url: this.urlApi,
      cronFormat: this.cronString,  
      header: this.header
      
    }
    console.log(body)
    return this.http.post(this.rootUrl+'/add',body, { headers: reqHeader });     
   }
   
  refreshList(){
    return this.http.get<Array<TaskModelDto>>(this.rootUrl+'/getAll');
  }

  putTask(id: string, form: TaskModelDto){     
     let idNumber = Number.parseInt(id);
     this.convertStringToCronString(form.cronFormat)

     const body = {
       id : idNumber,
       name: form.name,
       description: form.description,
       url: this.urlApi,
       cronFormat: this.cronString,
       header: this.header
     }
     
    return this.http.post(this.rootUrl+'/update', body);     
   }

  deleteTask(id : number){
    return this.http.post(this.rootUrl+'/delete',id);
   }

   getTaskById(id: string){     
     let idNumber = Number.parseInt(id);
    return this.http.post(this.rootUrl+'/getTaskById',idNumber);     
   } 

   convertStringToCronString(cronMinute: string)
   {        
      this.cronString = cronMinute + this.cron.Hours  +  this.cron.DayOfMonth + this.cron.Month  + this.cron.DayOfWeek;
   }

   convertCronModelStringToString(cronFormatString: string)
   {
    const usingSplit = cronFormatString.split(' ');
    let minute = Number.parseInt(usingSplit[0]);
    return minute;
   }

   createApiUrl(data: any, url: string)
   {
     console.log(data)
     if(data.city3d != "")
     {
      this.getStringUrlFromChangeForecat3d(url, data.city3d)
     }
     else if(data.city24h != "")
     {
      this.getStringUrlFromChangeForecat24h(url, data.city24h);
     }
     else if(data.latitude != "" && data.longitude != "")
     {
      this.getStringUrlFromChangeForecat48h(url, data.latitude, data.longitude)
     }
   }

   getStringUrlFromChangeForecat24h(url: string, city: string)
   {
    
    this.header = 'visual-crossing-weather.p.rapidapi.com';
    const item = 'location=' + city + '&aggregateHours=24&shortColumnNames=0&unitGroup=us&contentType=json';
    this.urlApi = url + item;
   }

   getStringUrlFromChangeForecat48h(url: string, lat: string, lon: string)
   {
    this.header = 'weatherbit-v1-mashape.p.rapidapi.com';
    const item = 'lat'+ lat +'&lon=' + lon +'&hours=48';
    this.urlApi = url + item;
   }

   getStringUrlFromChangeForecat3d(url: string, city: string)
   {
    this.header = 'weatherapi-com.p.rapidapi.com';
     const item = 'q='+ city + '&days=3';
     this.urlApi = url + item;
   } 
}
