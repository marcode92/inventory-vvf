import { Component } from '@angular/core';

@Component({
  selector: 'tech-item',
  imports: [],
  templateUrl: './tech-item.html',
  styleUrl: './tech-item.scss',
})
export class TechItem {

   displayedColumns: string[] = [
    'nomepc',
    'dominio',
    'uuid',
    'assettag',
    'serialebios',
    'produttorebios',
    'versionebios',
    'modellocomputer',
    'famigliacomputer',
    'tiposistema',
    'chassistype',
    'versionedisplay',
    'buildwindows',
    'architettura',
    'datainstallazioneos',
    'dominiosistemaoperativo',
    'sistemaoperativo',
    'versionesistemaoperativo',
  ];
  
}
