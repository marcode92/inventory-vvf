import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'add-item-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './add-item-dialog.html',
  styleUrl: './add-item-dialog.scss',
})
export class AddItemDialog {

  
}
