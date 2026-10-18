import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceInventory } from '../../service-inventory/service-inventory';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InvItem } from './inv-item/inv-item';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { AssetModel } from '../../../yaml/home-table';

@Component({
  selector: 'add-item-dialog',
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule,
    InvItem, MatFormField, MatInputModule, MatIconModule, CommonModule, MatSelectModule],
  templateUrl: './add-item-dialog.html',
  styleUrl: './add-item-dialog.scss',
})
export class AddItemDialog {
  loading = false;
  error: string | null = null;
  //itemToAdd: AssetItem = {};
  modelFormCtrl = new FormControl('');
  invalid_field: string = '';
  listModelsName: string[] = [];
  modelFields: AssetModel = {}

  constructor(private dialogRef: MatDialogRef<AddItemDialog>,
    private serviceInventory: ServiceInventory,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog) { }

  param?: string;
  currentPage: boolean = true;
  /*  ngOnInit(){
     console.log("stampa qrcode",this.data.qrCode)
     this.param = this.data.qrCode
   }
 */

  ngOnInit() {
    this.serviceInventory.getModelNames().subscribe(x => {
      this.listModelsName = x
    })
  }

  search() {
    const modelName = this.modelFormCtrl.value || '';
    this.openAssetDialog(modelName);
  }

  openAssetDialog(data: string) {
    this.dialogRef.close(true)
    const dialogRef = this.dialog.open(InvItem,
      {
        width: '900px',
        maxWidth: '95vw',
        height: '650px',
        maxHeight: '90vh',
        panelClass: 'custom-dialog',
        data
      }
    );

    /* dialogRef.afterClosed().pipe(
    ).subscribe(data => {
    }) */
  }
}
