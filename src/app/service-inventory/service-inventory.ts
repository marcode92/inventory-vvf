import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryItem } from '../../yaml/home-table';

@Injectable({
  providedIn: 'root',
})
export class ServiceInventory {

  private baseUrl = '/mock'
  constructor(private http:HttpClient){

  }
  getHomeDataTable(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.baseUrl}/home-table.json`)
  }

  /* addHomeDataTable(): Observable<InventoryItem[]> {
    return this.http.post<InventoryItem[]>(`${this.baseUrl}/home-table.json`)
  } */
 
 /* updHomeDataTable(): Observable<InventoryItem[]> {
    return this.http.update<InventoryItem[]>(`${this.baseUrl}/home-table.json`)
  } */
}
