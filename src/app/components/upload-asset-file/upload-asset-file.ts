import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceInventory } from '../../service-inventory/service-inventory';
import { ModelDialog } from '../asset model/model-dialog/model-dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { async, switchMap } from 'rxjs';
import { AddItemDialog } from '../add-item-dialog/add-item-dialog';
import { AssetFields, AssetItem, TipoCampo } from '../../../yaml/home-table';
import { InvItemFile } from './inv-item-file/inv-item-file';

@Component({
  selector: 'app-upload-asset-file',
  imports: [MatDialogModule, MatButtonModule, CommonModule, InvItemFile],
  templateUrl: './upload-asset-file.html',
  styleUrl: './upload-asset-file.scss',
})
export class UploadAssetFile {
  select: boolean = false;
  selectedFile: File | null = null;
    @ViewChild(InvItemFile) invItemFile!: InvItemFile;
    error: string | null = null;
  assetFields: AssetFields[] = [];

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceInventory: ServiceInventory,
    private dialogRef: MatDialogRef<UploadAssetFile>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,   private cdr: ChangeDetectorRef
) {

  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async addItem() {
    if (!this.selectedFile) return;
    const content = await this.selectedFile.text();
    const json = JSON.parse(content);
    console.log(json);
    this.openCreateItemDialog(json)
  }

  openCreateItemDialog(data: any) {
    Object.entries(data).forEach(([key, value]) => {

      switch (typeof value) {
        case 'string':
          this.assetFields.push({ nome_campo: key, value: value, tipo_campo: TipoCampo.ALFA })
          break;
        case 'number':
          this.assetFields.push({ nome_campo: key, value: value, tipo_campo: TipoCampo.NUME })
          break;
      }
    });
    this.select = true;
    this.cdr.detectChanges();
    this.dialogRef.updateSize('900px', '650px');
  }

  
  save(){
    console.log(this.invItemFile.addItemForm.get('matricola')?.errors);
    /****QUANDO CAMBI TIPO CAMPO DEVI PULIRE I VALIDATORI */
    this.invItemFile.addItemForm.markAllAsTouched();
    this.invItemFile.fieldsEmptyCtrl.controls.forEach(x => {
      if(x.get('tipo_campo')?.value === (this.invItemFile.TipoCampo.BOOL)){
       x.get('valore')?.clearValidators();
       x.get('valore')?.updateValueAndValidity();
      }
    })
  
    this.serviceInventory.readAssetFull(this.invItemFile.addItemForm.get('matricola')?.value || '').subscribe(x => {
        if (x) {
          this.invItemFile.addItemForm.get('matricola')?.setErrors({
            alreadyExists: true
          })
        } 
        if(this.invItemFile.addItemForm.valid){
          this.invItemFile.prepareItem(); //salva l'item
          }
  })}
  
  createItem(itemToSave: AssetItem){
    this.serviceInventory.createAsset(itemToSave).subscribe(
      {
        next: () => { console.log("test")
          this.dialogRef.close(true)
        },
        error: () => {
          this.error = "errore durante il salvataggio"
          this.snackBar.open(this.error)
        }
      })
  
  }  
  
}
