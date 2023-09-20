import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'
import { EmployeeModel } from './employeedashboard/employeedashboard.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  updateEmployee(employeeModelObj: EmployeeModel, id: number) {
    throw new Error('Method not implemented.');
  }

  constructor(private http:HttpClient) { }

    postEmployee(data:any){
      return this.http.post<any>("http://localhost:3000/posts", data)
      .pipe(map((res:any)=>{
        return res;
      }))
  }
getEmployee(){
  return this.http.get<any>("http://localhost:3000/posts")
.pipe(map((res:any)=>{
return res;
}))
}

deleteEmployee(id : number){
return this.http.delete<any>("http://localhost:3000/posts"+id)
.pipe(map((res:any)=>{
  return res;
}))
}

}
