import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InventoryItem } from '../../yaml/home-table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ServiceInventory } from '../service-inventory/service-inventory';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AddMargin } from '../add-margin';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialog } from '../components/add-item-dialog/add-item-dialog';


@Component({
  selector: 'app-home-inventory',
  imports: [
    ReactiveFormsModule, CommonModule, MatTableModule,
    MatCheckboxModule, MatButtonModule, MatCardModule, AddMargin],
  templateUrl: './home-inventory.html',
  styleUrl: './home-inventory.scss',
})

export class HomeInventory {

  constructor(private api: ServiceInventory, private dialog:MatDialog){

  }

displayedColumns: string[] = [ 
            'cat_tipo',
            'num_inv',
            'sec_pdci',
            'denominazione',
            'matricola',
            'annotazioni',
            'stanza',
            'possessori',
            'update',
            'fuori_uso'
          ];
  footerColumns: string[] =['footer'];

  dataSource = new MatTableDataSource<InventoryItem>();
  searchCtrl = new FormControl('');

  ngOnInit() {
    this.searchCtrl.valueChanges.subscribe(value => {
      console.log("funziona",value);
    });

    this.api.getHomeDataTable().subscribe(data => {
      this.dataSource.data = data;
    })
  }

  addRow(){
    this.dialog.open(AddItemDialog,
      {
        width:'800px',
        height:'70vh'
      }
    );
  }
}
