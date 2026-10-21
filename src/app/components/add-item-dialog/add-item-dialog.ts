import { Component, Inject, ViewChild } from '@angular/core';
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
import { InvItemFile } from './inv-item-file/inv-item-file';

@Component({
  selector: 'add-item-dialog',
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule,
    InvItem, InvItemFile, MatFormField, MatInputModule, MatIconModule, CommonModule, 
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
  modelFields: AssetModel = {}
  @ViewChild(InvItem) invItem!: InvItem;
  
  constructor(private dialogRef: MatDialogRef<AddItemDialog>,
    private serviceInventory: ServiceInventory,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dataFromFile: any,
    private dialog: MatDialog) { }

  param?: string;
  currentPage: boolean = true;
  select: boolean = true;
  selectedModel = ''

  get hasData(): boolean {
  return this.dataFromFile != null &&
         Object.keys(this.dataFromFile).length > 0;
}

  ngOnInit() {
    this.serviceInventory.getModelNames().subscribe(x => {
      this.listModelsName = ['No model',...x,]
      this.selectedModel = this.listModelsName[0];
    })
  }

  search() {
    this.selectedModel = this.modelFormCtrl.value || '';
    this.select = !this.select;
    this.dialogRef.updateSize('900px', '650px');
  }

changeModel(){
  this.select = true;
  this.dialogRef.updateSize('450px', 'auto');
}

save(){
  this.invItem.prepareItem(); //salva l'item
}

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
