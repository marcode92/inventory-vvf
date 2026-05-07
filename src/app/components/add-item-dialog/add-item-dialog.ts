import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceInventory } from '../../service-inventory/service-inventory';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InventoryItem } from '../../../yaml/home-table';
import { ReactiveFormsModule } from '@angular/forms';
import dayjs from 'dayjs';

@Component({
  selector: 'add-item-dialog',
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule],
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
    cat_tipo: this.addItemForm.get('cat_tipo')?.value || '',
    num_inv: this.addItemForm.get('num_inv')?.value || '',
    annotazioni: this.addItemForm.get('annotazioni')?.value || '',
    denominazione: this.addItemForm.get('denominazione')?.value || '',
    matricola: this.addItemForm.get('matricola')?.value || '',
    possessori: this.addItemForm.get('possessori')?.value || '',
    sec_pdci: this.addItemForm.get('sec_pdci')?.value || '', 
    stanza: this.addItemForm.get('stanza')?.value || '',
    last_update: dayjs().format('YYYY-MM-DD HH:mm'),
    fuori_uso: false,
   }
   console.log("itemtoadd show",this.itemToAdd);

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
