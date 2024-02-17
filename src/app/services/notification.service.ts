import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import {MatSnackBar,MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class NotificationService { 
  constructor(public _matsnack : MatSnackBar) { }
  config : MatSnackBarConfig = {
    duration:2000,
    horizontalPosition : 'right',
    verticalPosition : 'top'
  }
  config2 : MatSnackBarConfig = {
    duration:2000,
    horizontalPosition : 'center',
    verticalPosition : 'top'
  }
success(msg: string){
  this.config['panelClass'] = ['custom-notification1','success'];
  this._matsnack.open(msg,'',this.config);
}

warn(msg:string){
  this.config['panelClass']=['custom-notification2','warn'];
  this._matsnack.open(msg,'',this.config);
}

login(msg:string){
  this.config2['panelClass']=['custom-notification3','login'];
  this._matsnack.open(msg,'',this.config2); 
}
}
