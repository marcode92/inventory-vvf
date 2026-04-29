import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceInventory } from '../../service-inventory/service-inventory';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventoryItem } from '../../../yaml/home-table';
import dayjs from 'dayjs';

@Component({
  selector: 'add-item-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './add-item-dialog.html',
  styleUrl: './add-item-dialog.scss',
})
export class AddItemDialog {
loading = false;
error: string | null = null;
itemToAdd: InventoryItem = {}

constructor(private dialogRef: MatDialogRef<AddItemDialog>, 
  private serviceInventory: ServiceInventory, private snackBar: MatSnackBar ){}

  addItemForm = new FormGroup({
    cat_tipo: new FormControl(''),
    num_inv: new FormControl(''),
    sec_pdci: new FormControl(''),
    denominazione: new FormControl(''),
    matricola: new FormControl(''),
    annotazioni: new FormControl(''),
    stanza: new FormControl(''),
    possessori: new FormControl(''),
    //update: new FormControl('')    
});

save(){
  this.itemToAdd = {
    cat_tipo: this.addItemForm.value.cat_tipo || '',
    num_inv: this.addItemForm.value.num_inv || '',
    annotazioni: this.addItemForm.value.annotazioni || '',
    denominazione: this.addItemForm.value.denominazione || '',
    matricola: this.addItemForm.value.matricola || '',
    possessori: this.addItemForm.value.possessori || '',
    sec_pdci: this.addItemForm.value.sec_pdci || '', 
    stanza: this.addItemForm.value.stanza || '',
    update: dayjs().format('YYYY-MM-DD HH:mm'),
    fuori_uso: false,
   }

  this.serviceInventory.addHomeDataTable(this.itemToAdd).subscribe({
    next: (res) =>{
      this.loading = false;
      this.dialogRef.close(true)
    },
    error: (err) =>{
        this.error = "errore durante il salvataggio"
        this.snackBar.open(this.error)
    }
  })
}
}
