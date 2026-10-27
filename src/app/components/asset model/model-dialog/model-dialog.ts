import { Component, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceInventory } from '../../../service-inventory/service-inventory';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { InvItem } from '../../add-item-dialog/inv-item/inv-item';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { AssetModel, Fields, TipoCampo } from '../../../../yaml/home-table';
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

  get fieldsModelCtrl(): FormArray<FormGroup> {
    return this.modelloForm.controls.fieldsModelCtrl;
  }

  error: string | null = null;
  assetsType: AssetModel = { campi: [{}] };
  tipi: TipoCampo[] = Object.values(TipoCampo);


  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceInventory: ServiceInventory,
    private dialogRef: MatDialogRef<ModelDialog>, private snackBar: MatSnackBar) { }

  modelloForm = new FormGroup({
    nomeModello: new FormControl('', Validators.required),
    fieldsModelCtrl: new FormArray<FormGroup>([]),
  });

  ngOnInit() {
    this.fieldsModelCtrl.push([
      this.createField(),
      this.createField(),
      this.createField(),
      this.createField()])
  }

  createField(): FormGroup {
    return this.fb.group({
      nome_campo: ['', Validators.required],
      tipo_campo: ['', Validators.required],
    })
  }

  addRow() {
    //const ogg = this.modelloForm.get('fieldsModelCtrl') as FormArray
    this.fieldsModelCtrl.push(this.createField())
  }

  removeRow(index: number) {
    if (this.fieldsModelCtrl.length > 1)
      this.fieldsModelCtrl.removeAt(index);
    else {
      this.error = "Minimo numero righe 1"
      this.snackBar.open(this.error)
    }
  }

  save() {
    const nomeModello = (this.modelloForm.get('nomeModello')?.value)?.toLowerCase()
    this.serviceInventory.getModelOneName(nomeModello || '')
    .subscribe(data => {
      if (data != null) {
        this.modelloForm.get('nomeModello')?.setErrors({
          alreadyExists: true
        })
      } else {
        this.modelloForm.markAllAsTouched();
        if(this.modelloForm.valid){
          const fieldsModelCtrl = this.modelloForm.get('fieldsModelCtrl') as FormArray;
          let list_fields: Fields[] = [];

          fieldsModelCtrl.controls.forEach((x, i) => {
            list_fields[i] = {
              nome_campo: x.get('nome_campo')?.value || '',
              tipo_campo: x.get('tipo_campo')?.value || '',
            }
          })

          this.assetsType = {
            nomeModello: this.modelloForm.get('nomeModello')?.value || '',
            campi: list_fields
          }

          this.serviceInventory.createModel(this.assetsType).subscribe(
            {
              next: () => {
                this.dialogRef.close(true)
              },
              error: () => {
                this.error = "errore durante il salvataggio"
                this.snackBar.open(this.error)
              }
            })
        }}
      }
      )
  }

}
