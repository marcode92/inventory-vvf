import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { AddMargin } from '../../../directive/add-margin';
import { ServiceInventory } from '../../service-inventory/service-inventory';
import { TypeUser } from '../../../yaml/home-table';
import { Router } from '@angular/router';

@Component({
  selector: 'role',
  imports: [ReactiveFormsModule, CommonModule, MatTableModule,
    MatCheckboxModule, MatButtonModule, MatCardModule, AddMargin, MatDialogModule,
    MatFormField, MatLabel, MatIcon, MatInputModule, MatDividerModule, MatSlideToggle,
    MatSelectModule],
  templateUrl: './role.html',
  styleUrl: './role.scss',
})
export class Role {

  constructor(public serviceInventory: ServiceInventory, private router: Router){
    
  }

   loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  login(){
    console.log("test")
  }

  inventoryRole(role: string){
    switch (role) {
      case TypeUser.ADMIN:
        this.router.navigate(['/home', TypeUser.ADMIN])
        break;
    case TypeUser.WATCHER:
       this.router.navigate(['/home', TypeUser.WATCHER])
      break;
      default:
        break;
    }
  }
}
