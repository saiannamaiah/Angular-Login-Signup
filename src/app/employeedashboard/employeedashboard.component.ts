import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { EmployeeModel } from './employeedashboard.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'pp-emploayeedashboard',
  templateUrl: './employeedashboard.component.html',
  styleUrls: ['./employeedashboard.component.css']
})
export class EmployeedashboardComponent {

  formvalue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {

  }

  ngOnInit() {
    this.formvalue = this.formbuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      mobile: [''],
      salary: [''],
    })
    this.getAllEmployee();
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstname = this.formvalue.value.firstname;
    this.employeeModelObj.lastname = this.formvalue.value.lastname;
    this.employeeModelObj.email = this.formvalue.value.email;
    this.employeeModelObj.mobile = this.formvalue.value.mobile;
    this.employeeModelObj.salary = this.formvalue.value.salary;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Emplyoee Added Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formvalue.reset();
        this.getAllEmployee();
      },
        err => {
          alert("Something went wrong")
        })
  }
  getAllEmployee() {
    this.api.getEmployee()
      .subscribe(res => {
        this.employeeData = res;
      })
  }
  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id)
      .subscribe(res => {
        alert("Employee Deleted");
        this.getAllEmployee();
      })
  }
  onEdit(row: any) {
    this.employeeModelObj.id = row.id;
    this.formvalue.controls['firstname'].setValue(row.firstname)
    this.formvalue.controls['lastname'].setValue(row.lastname)
    this.formvalue.controls['email'].setValue(row.email)
    this.formvalue.controls['mobile'].setValue(row.mobile)
    this.formvalue.controls['salary'].setValue(row.salary)

  }
  updateEmployeeDetails() {
    this.employeeModelObj.firstname = this.formvalue.value.firstname;
    this.employeeModelObj.lastname = this.formvalue.value.lastname;
    this.employeeModelObj.email = this.formvalue.value.email;
    this.employeeModelObj.mobile = this.formvalue.value.mobile;
    this.employeeModelObj.salary = this.formvalue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
  }
}
