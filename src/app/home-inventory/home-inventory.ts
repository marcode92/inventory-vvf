import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AssetItem } from '../../yaml/home-table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServiceInventory } from '../service-inventory/service-inventory';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AddMargin } from '../../directive/add-margin';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { switchMap, tap } from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ScannerDialog } from '../scanner-dialog/scanner-dialog';
import { AddItemDialog } from '../components/add-item-dialog/add-item-dialog';
import { ModelDialog } from '../components/asset model/model-dialog/model-dialog';
import { InvItem } from '../components/add-item-dialog/inv-item/inv-item';
import { ReadItemDialog } from '../components/read-item-dialog/read-item-dialog/read-item-dialog';
import { UploadAssetFile } from '../components/upload-asset-file/upload-asset-file';


@Component({
  selector: 'app-home-inventory',
  imports: [
    ReactiveFormsModule, CommonModule, MatTableModule,
    MatCheckboxModule, MatButtonModule, MatCardModule, AddMargin, MatDialogModule,
    MatFormField, MatLabel, MatIcon, MatInputModule],
  templateUrl: './home-inventory.html',
  styleUrl: './home-inventory.scss',
})

export class HomeInventory {
  @ViewChild('barcodeInput')
  barcodeInput!: ElementRef<HTMLInputElement>;

  constructor(private serviceInventory: ServiceInventory,
    private dialog: MatDialog) {

  }

  scannerBuffer = '';
  lastKeyTime = 0;

  displayedColumns: string[] = [
    'matricola',
    'annotazioni',
    'stanza',
    'possessori',
    'last_update',
    'fuori_uso'
  ];

  dataSource = new MatTableDataSource<AssetItem>();
  searchCtrl = new FormControl('');

  ngOnInit() {
    this.searchCtrl.valueChanges.subscribe(value => {
      console.log("funziona", value);
    });

    this.serviceInventory.readAssetHome().subscribe(data => {
      this.dataSource.data = data;
    })
  }
  openCreateItemDialog() {

    const dialogRef = this.dialog.open(AddItemDialog,
      {
        width: '450px',
        maxWidth: '95vw',
        maxHeight: '90vh',
      }
    );
    dialogRef.afterClosed().pipe(
      switchMap(() => this.serviceInventory.readAssetHome())
    ).subscribe(data => {
      this.dataSource.data = data;
    })
  }

  openReadItemDialog(matricola: string) {

    const dialogRef = this.dialog.open(ReadItemDialog,
      {
        width: '900px',
        height: '650px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        data: matricola
      }
    );

    dialogRef.afterClosed().pipe(
      switchMap(() => this.serviceInventory.readAssetHome())
    ).subscribe(data => {
      this.dataSource.data = data;
    })
  }

  openModelDialog() {
    const dialogRef = this.dialog.open(ModelDialog,
      {
        width: '900px',
        maxWidth: '95vw',
        maxHeight: '90vh'
      }
    );
  }

   openReadFile() {
    const dialogRef = this.dialog.open(UploadAssetFile,
      {
        width: '900px',
        maxWidth: '95vw',
        maxHeight: '90vh'
      }
    );
  }
};

