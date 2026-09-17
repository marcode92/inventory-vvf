import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InventoryItem } from '../../../../yaml/home-table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AddMargin } from '../../../../directive/add-margin';

@Component({
  selector: 'inv-item',
  imports: [ReactiveFormsModule, CommonModule, MatTableModule,
    MatCheckboxModule, MatButtonModule, MatCardModule, AddMargin, MatDialogModule,
    MatFormField, MatLabel, MatIcon, MatInputModule],
  templateUrl: './inv-item.html',
  styleUrl: './inv-item.scss',
})
export class InvItem {

//itemToAdd: InventoryItem = {};
  
addItemForm = new FormGroup({
    cat_tipo: new FormControl(''),
    num_inv: new FormControl(''),
    sec_pdci: new FormControl(''),
    denominazione: new FormControl(''),
    matricola: new FormControl(''),
    annotazioni: new FormControl(''),
    stanza: new FormControl(''),
    possessori: new FormControl(''),
    //update: new FormControl('')    
  });
}
