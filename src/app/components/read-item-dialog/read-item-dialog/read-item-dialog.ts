import { Component, Inject } from '@angular/core';
import { AssetItem, FieldsItem, FieldsModel } from '../../../../yaml/home-table';
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

  get fieldsItemsCtrl(): FormArray<FormControl<string | number | boolean | null>> {
    return this.addItemForm.controls.fieldsItemsCtrl;
  }

  modelFields: FieldsModel[] = [];
  error: string | null = null;
  
  constructor(private dialogRef: MatDialogRef<ReadItemDialog>,
    @Inject(MAT_DIALOG_DATA) public matricola: string,
    public serviceInventory: ServiceInventory, private snackBar: MatSnackBar) {
  }

  addItemForm = new FormGroup({
    cat_tipo: new FormControl('', [Validators.required]),
    num_inv: new FormControl({value:'', disabled:true}, [Validators.required]),
    sec_pdci: new FormControl('', [Validators.required]),
    denominazione: new FormControl('', [Validators.required]),
    matricola: new FormControl({value:'', disabled:true}, [Validators.required]),
    annotazioni: new FormControl('', [Validators.required]),
    stanza: new FormControl('', [Validators.required]),
    possessori: new FormControl('', [Validators.required]),
    out_of_service: new FormControl(false, [Validators.required]),
    fieldsItemsCtrl: new FormArray<FormControl<string | number | boolean | null>>([]),
  });

  ngOnInit() {
    this.serviceInventory.readAssetFull(this.matricola).pipe(
      switchMap(asset =>
        this.serviceInventory.getModelOneName(asset.modelName || '').pipe(
          map(model => ({ asset, model }))
        ))).subscribe(({ asset, model }) => {
          this.addItemForm.get('annotazioni')?.setValue(asset.annotazioni || '')
          this.addItemForm.get('cat_tipo')?.setValue(asset.cat_tipo || '')
          this.addItemForm.get('denominazione')?.setValue(asset.denominazione || '')
          this.addItemForm.get('out_of_service')?.setValue(asset.fuori_uso || false)
          this.addItemForm.get('matricola')?.setValue(asset.matricola || '')
          this.addItemForm.get('num_inv')?.setValue(asset.num_inv || '')
          this.addItemForm.get('possessori')?.setValue(asset.possessori || '')
          this.addItemForm.get('sec_pdci')?.setValue(asset.sec_pdci || '')
          this.addItemForm.get('stanza')?.setValue(asset.stanza || '')

          if (model.campi)
            this.modelFields = model.campi;

          this.modelFields.forEach(field => {

            let initialValue: string | number | boolean | null;

            initialValue =
              asset.fieldsItemToSave?.find(f => f.idField === field.idField)?.value ?? null

            this.fieldsItemsCtrl.push(new FormControl<string | number | boolean | null>
              (initialValue,
                {
                  validators: field.mandatory ? [Validators.required] : []
                }))
          })
        })
  }

  updateAsset(){
    
    let itemToSave: AssetItem;
    let fieldsItemToSave: FieldsItem[] = [];
    
    this.fieldsItemsCtrl.controls.map((ctrl, i) => {
      fieldsItemToSave.push({
        idField: this.modelFields[i].idField || '',
        value: ctrl.value || '',
      })
    })
    
    itemToSave = {
              annotazioni: this.addItemForm.get('annotazioni')?.value || '',
              cat_tipo: this.addItemForm.get('cat_tipo')?.value || '',
              denominazione: this.addItemForm.get('denominazione')?.value || '',
              fuori_uso: this.addItemForm.get('out_of_service')?.value || false,
              last_update: new Date() || '',
              num_inv: this.addItemForm.get('num_inv')?.value || '',
              possessori: this.addItemForm.get('possessori')?.value || '',
              sec_pdci: this.addItemForm.get('sec_pdci')?.value || '',
              stanza: this.addItemForm.get('stanza')?.value || '',
              fieldsItemToSave,
            }
            this.serviceInventory.updateAsset(itemToSave, this.matricola).subscribe(x=>{
              this.dialogRef.close(true);
            })
        
  }
}