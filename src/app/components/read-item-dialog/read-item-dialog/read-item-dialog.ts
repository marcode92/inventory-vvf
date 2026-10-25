import { ChangeDetectorRef, Component, Inject, ViewChild } from '@angular/core';
import { AssetItem, Fields, TipoCampo } from '../../../../yaml/home-table';
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
import { MatSelectModule } from '@angular/material/select';
import { InvItem } from '../../add-item-dialog/inv-item/inv-item';

@Component({
  selector: 'read-item-dialog',
  imports: [ReactiveFormsModule, CommonModule, MatTableModule,
    MatCheckboxModule, MatButtonModule, MatCardModule, AddMargin, MatDialogModule,
    MatFormField, MatLabel, MatIcon, MatInputModule, MatDividerModule, MatSlideToggle,
    MatSelectModule, InvItem],
  templateUrl: './read-item-dialog.html',
  styleUrl: './read-item-dialog.scss',
})
export class ReadItemDialog {

  get fieldsEmptyCtrl(): FormArray<FormGroup> {
    return this.addItemForm.controls.fieldsEmptyCtrl;
  }
  @ViewChild(InvItem) invItem!: InvItem;

  assetFields: Fields[] = [];
  error: string | null = null;
  readonly TipoCampo = TipoCampo;
  tipi: TipoCampo[] = Object.values(TipoCampo);
  formRef: AssetItem = {}
  select: boolean = false

  constructor(private dialogRef: MatDialogRef<ReadItemDialog>,
    @Inject(MAT_DIALOG_DATA) public matricola: string,
    public serviceInventory: ServiceInventory, private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef) {
  }

  addItemForm = new FormGroup({
    matricola: new FormControl({ value: '', disabled: true }, [Validators.required]),
    annotazioni: new FormControl('', [Validators.required]),
    stanza: new FormControl('', [Validators.required]),
    possessori: new FormControl('', [Validators.required]),
    out_of_service: new FormControl(false, [Validators.required]),
    fieldsEmptyCtrl: new FormArray<FormGroup>([]),
  });

  ngOnInit() {
    this.serviceInventory.readAssetFull(this.matricola).subscribe(dataFields => {
       this.formRef = {
        annotazioni: dataFields.annotazioni,
        fuori_uso: dataFields.fuori_uso,
        last_update: dataFields.last_update,
        matricola: dataFields.matricola,
        possessori: dataFields.possessori,
        stanza: dataFields.stanza,
        assetFields: dataFields.assetFields,
        disableMatricola: true
      }
      this.select = true;
      this.cdr.detectChanges();
    })
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

    if (this.invItem.addItemForm.valid) {
      this.invItem.prepareItem(); //salva l'item
    }
  }


  updateItem(itemToSave: AssetItem) {
    this.serviceInventory.updateAsset(itemToSave, this.matricola).subscribe(
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