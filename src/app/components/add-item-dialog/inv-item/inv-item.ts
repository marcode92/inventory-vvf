import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AssetModel, FieldsItem, FieldsModel, AssetItem, TipoCampo } from '../../../../yaml/home-table';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'inv-item',
  imports: [ReactiveFormsModule, CommonModule, MatTableModule,
    MatCheckboxModule, MatButtonModule, MatCardModule, AddMargin, MatDialogModule,
    MatFormField, MatLabel, MatIcon, MatInputModule, MatDividerModule, MatSlideToggle,
    MatSelectModule ],
  templateUrl: './inv-item.html',
  styleUrl: './inv-item.scss',
})
export class InvItem {
  @Input() modelName!: string;
  @Output() itemToSave = new EventEmitter<AssetItem>();

  get fieldsItemsCtrl(): FormArray<FormControl<string | number | boolean | null>> {
    return this.addItemForm.controls.fieldsItemsCtrl;
  }

  get fieldsEmptyCtrl(): FormArray<FormGroup> {
    return this.addItemForm.controls.fieldsEmptyCtrl;
  }

  get selectionField(): FormArray<FormGroup> {
    return this.addItemForm.controls.fieldsEmptyCtrl;
  }

  modelFields: FieldsModel[] = [];
  error: string | null = null;
  listModelsName: string[] = [];
  readonly TipoCampo = TipoCampo;
  tipi: TipoCampo[] = Object.values(TipoCampo);

  constructor(
    private fb: FormBuilder,
    public serviceInventory: ServiceInventory,
    private cdr: ChangeDetectorRef, private snackBar: MatSnackBar
  ) {
  }

  addItemForm = new FormGroup({
    cat_tipo: new FormControl('', [Validators.required]),
    num_inv: new FormControl('', [Validators.required]),
    sec_pdci: new FormControl('', [Validators.required]),
    denominazione: new FormControl('', [Validators.required]),
    matricola: new FormControl('', [Validators.required]),
    annotazioni: new FormControl('', [Validators.required]),
    stanza: new FormControl('', [Validators.required]),
    possessori: new FormControl('', [Validators.required]),
    out_of_service: new FormControl(false, [Validators.required]),
    fieldsItemsCtrl: new FormArray<FormControl<string | number | boolean | null>>([]),
    fieldsEmptyCtrl: new FormArray<FormGroup>([]),
  });

  ngOnInit() {
    this.serviceInventory.getModelOneName(this.modelName || '').subscribe(dataFields => {

      if (dataFields && dataFields.campi){
        this.modelFields = dataFields.campi;

      this.modelFields.forEach(field => {

        let initialValue: string | number | boolean;

        switch (field.tipo_campo) {
          case 'Numerico':
            initialValue = 0;
            break;
          case 'Alfanumerico':
            initialValue = ''
            break;
          case 'Decisionale':
            initialValue = false
            break;
          default:
            initialValue = ''
        }

        this.fieldsItemsCtrl.push(new FormControl<string | number | boolean | null>
          (initialValue,
            {
              validators: field.mandatory ? [Validators.required] : []
            }))

          this.fieldsEmptyCtrl.push(this.createField(field.nome_campo, 
              field.tipo_campo))
          })
          this.fieldsEmptyCtrl.push(this.createField())

        }
      this.cdr.detectChanges();
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

addRow() {
    //const ogg = this.modelloForm.get('fields') as FormArray
    this.fieldsEmptyCtrl.push(this.createField())
  }

  removeRow(index:number){
    if(this.fieldsEmptyCtrl.length > 1)
      this.fieldsEmptyCtrl.removeAt(index);
    else
    {
      this.error = "Minimo numero righe 1"
          this.snackBar.open(this.error)
    }
  }

  prepareItem() {
    let itemToSave: AssetItem;
    let fieldsItemToSave: FieldsItem[] = [];
    this.serviceInventory.readAssetFull(this.addItemForm.get('matricola')?.value || '').subscribe(x => {
      if (x) {
        this.addItemForm.get('matricola')?.setErrors({
          alreadyExists: true
        })
      } else {

        this.fieldsEmptyCtrl.controls.map((ctrl, i) => {
          fieldsItemToSave.push({
            nome_campo: ctrl.get('nome_campo')?.value,
            tipo_campo:ctrl.get('tipo_campo')?.value,
            value: ctrl.get('valore')?.value,
          })
        })

        itemToSave = {
          annotazioni: this.addItemForm.get('annotazioni')?.value || '',
          cat_tipo: this.addItemForm.get('cat_tipo')?.value || '',
          denominazione: this.addItemForm.get('denominazione')?.value || '',
          fuori_uso: this.addItemForm.get('out_of_service')?.value || false,
          last_update: new Date() || '',
          matricola: this.addItemForm.get('matricola')?.value || '',
          num_inv: this.addItemForm.get('num_inv')?.value || '',
          possessori: this.addItemForm.get('possessori')?.value || '',
          sec_pdci: this.addItemForm.get('sec_pdci')?.value || '',
          stanza: this.addItemForm.get('stanza')?.value || '',
          fieldsItemToSave,
          modelName: this.modelName
        }
        this.itemToSave.emit(itemToSave);
      }
    })
  }
}
