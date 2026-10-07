import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceInventory } from '../../../service-inventory/service-inventory';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Form, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { InvItem } from '../../add-item-dialog/inv-item/inv-item';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { AssetModel, FieldsType } from '../../../../yaml/home-table';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-model-dialog',
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule,
     InvItem, MatFormField, MatInputModule, MatIconModule,
    CommonModule, MatRadioModule, MatSlideToggle, MatSelectModule, MatDialogTitle],
  templateUrl: './model-dialog.html',
  styleUrl: './model-dialog.scss',
})
export class ModelDialog {
  error: string | null = null;
  modelloForm: FormGroup;
  assetsType: AssetModel = { campi: [{}] };

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceInventory: ServiceInventory,
    private dialogRef: MatDialogRef<ModelDialog>, private snackBar: MatSnackBar) {

    this.modelloForm = this.fb.group({
      nome_modello: ['', Validators.required],
      fields: this.fb.array([
        this.createField(),
        this.createField(),
        this.createField()
      ])
    });
  }

  tipi = ['Numerico', 'Alfanumerico', 'Decisionale']

  createField(): FormGroup {
    return this.fb.group({
      nome_campo: ['', Validators.required],
      tipo_campo: ['', Validators.required],
      limite_max: [0, Validators.required],
      mandatory: [false, Validators.required]
    })
  }

  get fields() {
    return this.modelloForm.get('fields') as FormArray;
  }

  addRow() {
    //const ogg = this.modelloForm.get('fields') as FormArray
    this.fields.push(this.createField())
  }

  /* removeRow(index:number){
    this.fields.removeAt(index);
  } */

  save() {

    const fields = this.modelloForm.get('fields') as FormArray;
    const list_fields : FieldsType[] = [];
    
    fields.controls.forEach((x, i) => {
      list_fields[i] = {
        nome_campo : x.get('nome_campo')?.value || '',
        tipo_campo : x.get('tipo_campo')?.value || '',
        mandatory: x.get('mandatory')?.value || false,
      }
    })

    this.assetsType = {
      nome_modello: this.modelloForm.get('nome_modello')?.value || '',
      campi: list_fields
    }

    this.serviceInventory.createAssetType(this.assetsType).subscribe(
      {
        next: () => {
          this.dialogRef.close(true)
        },
        error: () => {
          this.error = "errore durante il salvataggio"
          this.snackBar.open(this.error)
        }
      }
    )
  }
}
