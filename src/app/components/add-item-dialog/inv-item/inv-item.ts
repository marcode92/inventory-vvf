import { Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssetModel, CustomField, FieldsType, InventoryItem } from '../../../../yaml/home-table';
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
import { ServiceInventory } from '../../../service-inventory/service-inventory';
  import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'inv-item',
  imports: [ReactiveFormsModule, CommonModule, MatTableModule,
    MatCheckboxModule, MatButtonModule, MatCardModule, AddMargin, MatDialogModule,
    MatFormField, MatLabel, MatIcon, MatInputModule, MatDividerModule, MatSlideToggle,
    MatSnackBarModule ],
  templateUrl: './inv-item.html',
  styleUrl: './inv-item.scss',
})
export class InvItem {
  
  get customFieldsCtrl(): FormArray<FormControl<string | number | boolean | null>>{
    return this.addItemForm.controls.customFields;
  }

  fields: FieldsType[] = [];
  error: string | null = null;

  constructor(private dialogRef: MatDialogRef<InvItem>,  
    @Inject(MAT_DIALOG_DATA) public dataFields: AssetModel, 
    public serviceInventory: ServiceInventory, private snackBar: MatSnackBar){
  }


  addItemForm = new FormGroup({
      cat_tipo: new FormControl('',[Validators.required]),
      num_inv: new FormControl('', [Validators.required]),
      sec_pdci: new FormControl('', [Validators.required]),
      denominazione: new FormControl('', [Validators.required]),
      matricola: new FormControl('', [Validators.required]),
      annotazioni: new FormControl('', [Validators.required]),
      stanza: new FormControl('', [Validators.required]),
      possessori: new FormControl('', [Validators.required]),
      out_of_service: new FormControl(false,[Validators.required]),
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

      this.customFieldsCtrl.push(new FormControl<string | number | boolean | null>
        (initialValue,
          {
        validators: field.mandatory ? [Validators.required] : []
      }))
    })
  }

  save(){
    let itemToSave: InventoryItem;
    let customFields: CustomField[] = []; 
    this.customFieldsCtrl.controls.map((ctrl,i) => {
      customFields.push({
        name: this.fields[i].nome_campo || '',
        type: this.fields[i].tipo_campo || '', 
        value: ctrl.value || '',
      }) 
    })
    
    itemToSave = {
      annotazioni: this.addItemForm.get('annotazioni')?.value || '',
      cat_tipo:this.addItemForm.get('cat_tipo')?.value || '',
      denominazione: this.addItemForm.get('denominazione')?.value || '',
      fuori_uso: this.addItemForm.get('out_of_service')?.value || false,
      last_update: this.addItemForm.get('last_update')?.value || '',
      matricola: this.addItemForm.get('matricola')?.value || '',
      num_inv: this.addItemForm.get('num_inv')?.value || '',
      possessori: this.addItemForm.get('possessori')?.value || '',
      sec_pdci: this.addItemForm.get('sec_pdci')?.value || '',
      stanza: this.addItemForm.get('stanza')?.value || '',
      customFields, 
    }

    this.serviceInventory.createAsset(itemToSave).subscribe(
      {
     next: () => {
       this.dialogRef.close(true)
     },
     error: () => {
       this.error = "errore durante il salvataggio"
       this.snackBar.open(this.error)
     }
   })
  }
}
