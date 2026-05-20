import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InventoryItem } from '../../yaml/home-table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServiceInventory } from '../service-inventory/service-inventory';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AddMargin } from '../../directive/add-margin';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ScannerDialog } from '../scanner-dialog/scanner-dialog';
import { AddItemDialog } from '../components/add-item-dialog/add-item-dialog';


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
    'cat_tipo',
    'num_inv',
    'sec_pdci',
    'denominazione',
    'matricola',
    'annotazioni',
    'stanza',
    'possessori',
    'last_update',
    'fuori_uso'
  ];

  dataSource = new MatTableDataSource<InventoryItem>();
  searchCtrl = new FormControl('');

  ngOnInit() {
    this.searchCtrl.valueChanges.subscribe(value => {
      console.log("funziona", value);
    });

    this.serviceInventory.getHomeDataTable().subscribe(data => {
      this.dataSource.data = data;
    })
  }

  openDialog(data?: string) {
    const dialogRef = this.dialog.open(AddItemDialog,
      {
        width: '50%',
        maxWidth: '95vw',
        maxHeight: '90vh',
        data:{
          qrCode:data
        }
      }
    );

    dialogRef.afterClosed().pipe(
      switchMap(() => this.serviceInventory.getHomeDataTable())
    ).subscribe(data => {
      this.dataSource.data = data;
    })
  }

  
  openScanDialog() {
      const dialogRef = this.dialog.open(ScannerDialog,
        {
          width: '50%',
          maxWidth: '95vw',
          maxHeight: '90vh',
          
        }
      );
  
      dialogRef.afterClosed().subscribe(data => {
        this.openDialog(data)
      })
    }
  };

