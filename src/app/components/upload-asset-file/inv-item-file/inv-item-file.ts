import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceInventory } from '../../../service-inventory/service-inventory';
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { AssetItem, AssetFields, TipoCampo } from '../../../../yaml/home-table';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { AddMargin } from '../../../../directive/add-margin';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'inv-item-file',
  imports: [ReactiveFormsModule, CommonModule, MatTableModule,
    MatCheckboxModule, MatButtonModule, MatCardModule, AddMargin, MatDialogModule,
    MatFormField, MatLabel, MatIcon, MatInputModule, MatDividerModule, MatSlideToggle,
    MatSelectModule],
  templateUrl: './inv-item-file.html',
  styleUrl: './inv-item-file.scss',
})
export class InvItemFile {
  @Input() fileData!: AssetFields[] ;
  @Output() itemToSave = new EventEmitter<AssetItem>();

  get fieldsEmptyCtrl(): FormArray<FormGroup> {
    return this.addItemForm.controls.fieldsEmptyCtrl;
  }

  error: string | null = null;
  assetFields: AssetFields[] = []
  readonly TipoCampo = TipoCampo;
  tipi: TipoCampo[] = Object.values(TipoCampo);

  constructor(public serviceInventory: ServiceInventory,
    private cdr: ChangeDetectorRef, private snackBar: MatSnackBar,
    /* @Inject(MAT_DIALOG_DATA) public dataFields: AssetFields[], */ private dialogRef: DialogRef) { }

  addItemForm = new FormGroup({
    matricola: new FormControl('', [Validators.required]),
    annotazioni: new FormControl('', [Validators.required]),
    stanza: new FormControl('', [Validators.required]),
    possessori: new FormControl('', [Validators.required]),
    out_of_service: new FormControl(false, [Validators.required]),
    fieldsEmptyCtrl: new FormArray<FormGroup>([]),
  });

  ngOnInit() {

    if (this.fileData) {
      this.assetFields = this.fileData;

      this.assetFields.forEach(field => {
        this.fieldsEmptyCtrl.push(this.createField(field.nome_campo,
          field.tipo_campo, field.value))
      })
    }
    this.cdr.detectChanges();

    this.fieldsEmptyCtrl.push(this.createField())
  }

  createField(nomeCampo?: string, tipoCampo?: string | undefined, valore?: string | number | boolean | null): FormGroup {
    return new FormGroup({
      nome_campo: new FormControl(nomeCampo || '', Validators.required),
      tipo_campo: new FormControl(tipoCampo, Validators.required),
      valore: new FormControl(valore, Validators.required),
      /* choose: new FormControl(false) */
    })
  }

  addRow() {
    //const ogg = this.modelloForm.get('fields') as FormArray
    this.fieldsEmptyCtrl.push(this.createField())
  }

  removeRow(index: number) {
    if (this.fieldsEmptyCtrl.length > 1)
      this.fieldsEmptyCtrl.removeAt(index);
    else {
      this.error = "Minimo numero righe 1"
      this.snackBar.open(this.error)
    }
  }

   prepareItem() {
    let itemToSave: AssetItem;
    let assetFields: AssetFields[] = [];
    
        this.fieldsEmptyCtrl.controls.map((ctrl, i) => {
          assetFields.push({
            nome_campo: ctrl.get('nome_campo')?.value,
            tipo_campo:ctrl.get('tipo_campo')?.value,
            value: ctrl.get('valore')?.value,
          })
        })

        itemToSave = {
        annotazioni: this.addItemForm.get('annotazioni')?.value || '',
          fuori_uso: this.addItemForm.get('out_of_service')?.value || false,
          last_update: new Date() || '',
          matricola: this.addItemForm.get('matricola')?.value || '',
          possessori: this.addItemForm.get('possessori')?.value || '',
          stanza: this.addItemForm.get('stanza')?.value || '',
          assetFields,
        }
        this.itemToSave.emit(itemToSave);
      }
}