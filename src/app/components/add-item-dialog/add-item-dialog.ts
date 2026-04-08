import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'add-item-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './add-item-dialog.html',
  styleUrl: './add-item-dialog.scss',
})
export class AddItemDialog {

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

}
