import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceInventory } from '../../service-inventory/service-inventory';
import { ModelDialog } from '../asset model/model-dialog/model-dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { async, switchMap } from 'rxjs';
import { AddItemDialog } from '../add-item-dialog/add-item-dialog';

@Component({
  selector: 'app-upload-asset-file',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './upload-asset-file.html',
  styleUrl: './upload-asset-file.scss',
})
export class UploadAssetFile {
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
    private serviceInventory: ServiceInventory,
    private dialogRef: MatDialogRef<UploadAssetFile>, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {

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
    this.dialogRef.close();
  }

  openCreateItemDialog(data:any) {
  
      const dialogRef = this.dialog.open(AddItemDialog,
        {
          width: '450px',
          maxWidth: '95vw',
          maxHeight: '90vh',
          data
        }
      );
     /*  dialogRef.afterClosed().pipe(
        switchMap(() => this.serviceInventory.readAssetHome())
      ).subscribe(data => {
        this.dataSource.data = data;
      }) */
    }
}
