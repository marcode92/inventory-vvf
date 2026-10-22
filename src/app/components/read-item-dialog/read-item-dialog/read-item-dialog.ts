import { Component, Inject } from '@angular/core';
import { AssetItem, AssetFields, FieldsModel } from '../../../../yaml/home-table';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceInventory } from '../../../service-inventory/service-inventory';
import { map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { AddMargin } from '../../../../directive/add-margin';

@Component({
  selector: 'app-read-item-dialog',
  imports: [ReactiveFormsModule, CommonModule, MatTableModule,
    MatCheckboxModule, MatButtonModule, MatCardModule, AddMargin, MatDialogModule,
    MatFormField, MatLabel, MatIcon, MatInputModule, MatDividerModule, MatSlideToggle,
    MatSnackBarModule],
  templateUrl: './read-item-dialog.html',
  styleUrl: './read-item-dialog.scss',
})
export class ReadItemDialog {

  get fieldsEmptyCtrl(): FormArray<FormGroup> {
   return this.addItemForm.controls.fieldsEmptyCtrl;
 }

  assetFields: AssetFields[] = [];
  error: string | null = null;
  constructor(private dialogRef: MatDialogRef<ReadItemDialog>,
    @Inject(MAT_DIALOG_DATA) public matricola: string,
    public serviceInventory: ServiceInventory, private snackBar: MatSnackBar) {
  }

  addItemForm = new FormGroup({
    matricola: new FormControl({value:'', disabled:true}, [Validators.required]),
    annotazioni: new FormControl('', [Validators.required]),
    stanza: new FormControl('', [Validators.required]),
    possessori: new FormControl('', [Validators.required]),
    out_of_service: new FormControl(false, [Validators.required]),
    fieldsEmptyCtrl: new FormArray<FormGroup>([]),
  });

  ngOnInit() {
    this.serviceInventory.readAssetFull(this.matricola).subscribe( asset => {
          this.addItemForm.get('annotazioni')?.setValue(asset.annotazioni || '')
          this.addItemForm.get('out_of_service')?.setValue(asset.fuori_uso || false)
          this.addItemForm.get('matricola')?.setValue(asset.matricola || '')
          this.addItemForm.get('possessori')?.setValue(asset.possessori || '')
          this.addItemForm.get('stanza')?.setValue(asset.stanza || '')

          if (asset.assetFields)
            this.assetFields =asset.assetFields;

          this.assetFields.forEach(field => {

            let initialValue: string | number | boolean;

            initialValue = field.value || ''

            this.fieldsEmptyCtrl.push(this.createField(field.nome_campo, 
              field.tipo_campo))
          })
        })
  }

 createField(nomeCampo?:string, tipoCampo?: string | undefined ): FormGroup {
    return new FormGroup({
      nome_campo: new FormControl(nomeCampo || '', Validators.required),
      tipo_campo: new FormControl(tipoCampo, Validators.required),
      valore: new FormControl<string|number|boolean |null>(null, Validators.required),
      mandatory: new FormControl(false, Validators.required)
    })
  }

  updateAsset(){
    
    let itemToSave: AssetItem;
    let assetFields: AssetFields[] = [];
    
    this.fieldsEmptyCtrl.controls.map((ctrl, i) => {
      assetFields.push({
        nome_campo: ctrl.get('nome_campo')?.value,
        tipo_campo: ctrl.get('tipo_campo')?.value,
        value: ctrl.value || '',
        mandatory: ctrl.get('mandatory')?.value
      })
    })
    
    itemToSave = {
              annotazioni: this.addItemForm.get('annotazioni')?.value || '',
              fuori_uso: this.addItemForm.get('out_of_service')?.value || false,
              last_update: new Date() || '',
              possessori: this.addItemForm.get('possessori')?.value || '',
              stanza: this.addItemForm.get('stanza')?.value || '',
              assetFields,
            }
            this.serviceInventory.updateAsset(itemToSave, this.matricola).subscribe(x=>{
              this.dialogRef.close(true);
            })
        
  }
}