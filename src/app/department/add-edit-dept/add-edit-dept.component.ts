import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-add-edit-dept',
  templateUrl: './add-edit-dept.component.html',
  styleUrls: ['./add-edit-dept.component.css']
})
export class AddEditDeptComponent implements OnInit {

  constructor(private service:SharedService) { }

  @Input() dep:any;
  DepartmentId:string | undefined;
  DepartmentName:string | undefined

  ngOnInit(): void {
    this.DepartmentId = this.dep.DepartmentId;
    this.DepartmentName = this.dep.DepartmentName; 


  }

  addDepartment(){
    //JSON format
    let val = {
      DepartmentId: this.DepartmentId,
      DepartmentName: this.DepartmentName  
    }
    //call the API method and pass the data
    this.service.addDepartment(val).subscribe(res=>{
      alert(res.toLocaleString());
    });
  }

  updateDepart(){
      //JSON format
      let val = {
        DepartmentId: this.DepartmentId,
        DepartmentName: this.DepartmentName  
      }
      //call the API method and pass the data
      this.service.updateDepartment(val).subscribe(res=>{
        alert(res.toLocaleString());
      });
  }

}
