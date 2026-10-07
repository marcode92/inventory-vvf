import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiceInventory } from '../../service-inventory/service-inventory';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InvItem } from './inv-item/inv-item';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-item-dialog',
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, 
    InvItem, MatFormField, MatInputModule, MatIconModule, CommonModule],
  templateUrl: './add-item-dialog.html',
  styleUrl: './add-item-dialog.scss',
})
export class AddItemDialog {
  loading = false;
  error: string | null = null;
  //itemToAdd: InventoryItem = {};
  invalid_field: string = '';
  listModel: FormGroup;

  constructor(private dialogRef: MatDialogRef<AddItemDialog>,
    private serviceInventory: ServiceInventory, private snackBar: MatSnackBar, 
    private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data:any) { }

    param?: string;
    currentPage: boolean = true;
   /*  ngOnInit(){
      console.log("stampa qrcode",this.data.qrCode)
      this.param = this.data.qrCode
    }
 

  save() {
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


    this.serviceInventory.readOneAss(this.itemToAdd.num_inv).pipe(
      switchMap((res: any) => {
        if (res && res.length > 0) {
          this.invalid_field = 'error';
          return throwError(() => new Error());
        }
        return this.serviceInventory.addHomeDataTable(this.itemToAdd);
      }),
    ).subscribe({
      next: () => {
        this.loading = false;
        this.dialogRef.close(true)
      },
      error: () => {
        this.error = "errore durante il salvataggio"
        this.snackBar.open(this.error)
      }
    })

  } */
    
    this.listModel = this.fb.group({
      nome_modello: ['', Validators.required],
      fields: this.fb.array([
        this.createField(),
        this.createField(),
        this.createField()
      ])
    });
    ngOnInit(){
      const name='marco'
      this.serviceInventory.getModelList().subscribe(x => {
        console.log(x.nome_modello);
      })
    }
    changePage(){
      this.currentPage = !this.currentPage;
    }
}
