import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../Materials/material/material.module';
import { EmployeeService } from '../services/employee.service';
import { NotificationService } from '../services/notification.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmdialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './confirmdialog.component.html',
  styleUrl: './confirmdialog.component.css',
  providers : [EmployeeService,NotificationService]
})
export class ConfirmdialogComponent {

  id : string = this.data.id;

  constructor(private _service : EmployeeService, public _notify : NotificationService,
    public dialogRef: MatDialogRef<ConfirmdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}
  
  yes()
  {
    this._service.saveId(this.id).subscribe();
       this._service.deleteEmployee(this.id).subscribe(data=>{
        this._notify.warn("Deleted Successfully!");
        this.dialogRef.close();
       });
  }
}
