import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceInventory } from '../../service-inventory/service-inventory';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InvItem } from './inv-item/inv-item';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { AssetItem, AssetModel } from '../../../yaml/home-table';

@Component({
  selector: 'add-item-dialog',
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule,
    InvItem, MatFormField, MatInputModule, MatIconModule, CommonModule,
    MatSelectModule, MatSnackBarModule],
  templateUrl: './add-item-dialog.html',
  styleUrl: './add-item-dialog.scss',
})
export class AddItemDialog {
  loading = false;
  error: string | null = null;
  modelFormCtrl = new FormControl('');
  invalid_field: string = '';
  listModelsName: string[] = [];
  formRef: AssetItem = {};
  param?: string;
  currentPage: boolean = true;
  select: boolean = true;
  selectedModel = ''

  @ViewChild(InvItem) invItem!: InvItem;

  constructor(private dialogRef: MatDialogRef<AddItemDialog>,
    private serviceInventory: ServiceInventory,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }



  ngOnInit() {
    this.serviceInventory.getModelNames().subscribe(x => {
      this.listModelsName = ['No model', ...x,]
      this.selectedModel = this.listModelsName[0];
    })
  }

  search() {
    this.selectedModel = this.modelFormCtrl.value || '';
    this.serviceInventory.getModelOneName(this.selectedModel || '').subscribe(dataFields => {
      this.formRef = {
        annotazioni: '',
        fuori_uso: false,
        last_update: new Date(),
        matricola: '',
        possessori: '',
        stanza: '',
        assetFields: dataFields && dataFields.campi || undefined,
      }
      this.select = false;
      this.dialogRef.updateSize('900px', '650px');
      this.cdr.detectChanges();
    })
  }

  changeModel() {
    this.select = !this.select;
    this.dialogRef.updateSize('450px', 'auto');

  }

  save() {
    /****QUANDO CAMBI TIPO CAMPO DEVI PULIRE I VALIDATORI */
    this.invItem.addItemForm.markAllAsTouched();
    this.invItem.fieldsEmptyCtrl.controls.forEach(x => {
      if (x.get('tipo_campo')?.value === (this.invItem.TipoCampo.BOOL)) {
        x.get('valore')?.clearValidators();
        x.get('valore')?.updateValueAndValidity();
      }
    })
    const matricola = (this.invItem.addItemForm.get('matricola')?.value)?.toLowerCase()
    this.serviceInventory.readAssetFull(matricola || '').subscribe(x => {
      if (x) {
        this.invItem.addItemForm.get('matricola')?.setErrors({
          alreadyExists: true
        })
      }
      if (this.invItem.addItemForm.valid) {
        this.invItem.prepareItem(); //salva l'item
      }
    })
  }

  createItem(itemToSave: AssetItem) {
    this.serviceInventory.createAsset(itemToSave).subscribe(
      {
        next: () => {
          console.log("test")
          this.dialogRef.close(true)
        },
        error: () => {
          this.error = "errore durante il salvataggio"
          this.snackBar.open(this.error)
        }
      })

  }
}
