import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssetModel, FieldsType, InventoryItem } from '../../../../yaml/home-table';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AddMargin } from '../../../../directive/add-margin';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'inv-item',
  imports: [ReactiveFormsModule, CommonModule, MatTableModule,
    MatCheckboxModule, MatButtonModule, MatCardModule, AddMargin, MatDialogModule,
    MatFormField, MatLabel, MatIcon, MatInputModule, MatDividerModule, MatSlideToggle ],
  templateUrl: './inv-item.html',
  styleUrl: './inv-item.scss',
})
export class InvItem {
  fields: FieldsType[] = [];
  
  constructor(private dialogRef: MatDialogRef<InvItem>,  
    @Inject(MAT_DIALOG_DATA) public dataFields: AssetModel){
  }
  addItemForm = new FormGroup({
      cat_tipo: new FormControl(''),
      num_inv: new FormControl(''),
      sec_pdci: new FormControl(''),
      denominazione: new FormControl(''),
      matricola: new FormControl(''),
      annotazioni: new FormControl(''),
      stanza: new FormControl(''),
      possessori: new FormControl(''),
      customFields: new FormArray<FormControl<string | number | boolean | null>>([]),
    });

//itemToAdd: InventoryItem = {};
  ngOnInit(){
   
    if(this.dataFields.campi)
      this.fields = this.dataFields.campi;

    this.fields.forEach(field => {

      let initialValue: string | number | boolean;

      switch(field.tipo_campo){
        case 'Numerico':
          initialValue = 0;
          break;
        case 'Alfanumerico':
          initialValue= ''
          break;
        case 'Decisionale':
          initialValue = false
          break;
        default:
          initialValue = ''
      }

      this.customFields.push(new FormControl<string | number | boolean | null>
        (initialValue,
          {
        validators: field.mandatory ? [Validators.required] : []
      }))
    })
  }

  get customFields(): FormArray<FormControl<string | number | boolean | null>>{
    return this.addItemForm.controls.customFields;
  }

  save(){
    
  }
}
