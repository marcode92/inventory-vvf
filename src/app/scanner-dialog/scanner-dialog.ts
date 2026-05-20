import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import {
  Html5Qrcode
} from 'html5-qrcode';

@Component({
  selector: 'app-scanner-dialog',
  imports: [MatDialogModule],
  templateUrl: './scanner-dialog.html',
  styleUrl: './scanner-dialog.scss',
})
export class ScannerDialog implements OnInit, OnDestroy {

  private qrCode!:Html5Qrcode;

  constructor(private dialog:MatDialog,private dialogRef: MatDialogRef<ScannerDialog>,){

  }

  ngOnInit(){
    console.log("start scanner")
    this.startScanner();
  }

    async startScanner(): Promise<void>
  {
    try {
      this.qrCode = new Html5Qrcode("qr-reader");
      const devices = await Html5Qrcode.getCameras();

      if(!devices || devices.length==0){
        console.log("error")
        return;
      }

      const cameraId = devices[0].id

      await this.qrCode.start(
        cameraId,
        {
          fps:10,
          qrbox:{
            width:250,
            height:250,
          }
        },
        (decodedText)=>{
          console.log("qr code",decodedText);
          this.dialogRef.close(decodedText);
        },
        (errorMessage)=>{
          console.warn(errorMessage);
        }
      )
    }
    catch(error){
      console.log(error);
    }
  }


  async close(): Promise<void>{
    if(this.qrCode?.isScanning){
      await this.qrCode.stop();
    }
     this.dialogRef.close(true)
  }

  async ngOnDestroy(): Promise<void>{
    if(this.qrCode?.isScanning){
      await this.qrCode.stop();
    }
  }
}
