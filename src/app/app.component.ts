import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "./employee.service";
import {Employee} from "./employee";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  title = 'employeemanagerapp';
  public employees: Employee[] = [];
  public editEmployee: Employee ;
  public deleteEmployee: Employee ;
  constructor(private employeeService : EmployeeService ) {
    this.editEmployee = {
      employeeCode: "", id:1,
    name:"hadil",email:"hadil@gmail.com",
    phone:"55448077",jobTitle:"Software engineer",imageUrl:"hhczyucycyuecgyuegycu"};
    this.deleteEmployee = {
      employeeCode: "", id:1,
      name:"hadil",email:"hadil@gmail.com",
      phone:"55448077",jobTitle:"Software engineer",imageUrl:"hhczyucycyuecgyuegycu"};
  }

  public getEmployees() : void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response
        console.log(this.employees)
      }, (error : HttpErrorResponse) => {
        alert(error.message);

      }
    );
  }

  // AddEmployee
  public AddEmployee(addForm:NgForm ):void{
    document.getElementById("add-employee-form");
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response) =>
      {this.employees.push(response);
        addForm.reset();
        },
    (error:HttpErrorResponse) => {
      alert(error.message);
      addForm.reset();
    });
  }

  ngOnInit(): void {
    this.getEmployees();
  }
  public onOpenModal(employee: Employee, mode:string):void{

    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = "button";
    button.style.display = 'none';
    button.setAttribute('data-toggle','modal');
    if (mode === 'add'){
      button.setAttribute('data-target','#addEmployeeModal');

    }
    if (mode === 'edit'){
      this.editEmployee = employee;
      button.setAttribute('data-target','#editEmployeeModal');
    }
    if (mode === 'delete'){
      this.deleteEmployee=employee
      button.setAttribute('data-target','#deleteEmployeeModal');
    }

    if (container) {
      container.appendChild(button);
      button.click();
    } else {
      console.error('Container not found');
    }


  }

    EditEmployee(employee: Employee) {
    document.getElementById("closeButton");
    this.employeeService.updateEmployee(employee).subscribe(
      (result:Employee) => {
        this.getEmployees();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  DeleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
        (result:void) => {
          this.getEmployees();
        },
        (error:HttpErrorResponse) => {
          alert(error.message);
        }
    );
  }

  public searchEmployees(key:String):void{
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }
}
