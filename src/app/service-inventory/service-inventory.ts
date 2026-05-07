import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryItem } from '../../yaml/home-table';

@Injectable({
  providedIn: 'root',
})
export class ServiceInventory {

  private baseUrl = 'http://localhost:1337/api'
  constructor(private http:HttpClient){

  }
  getHomeDataTable(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.baseUrl}/inventories/readlist`)
  }

  addHomeDataTable(itemToAdd: InventoryItem): Observable<InventoryItem> {
    console.log("body:",itemToAdd)
     return this.http.post<InventoryItem>(`${this.baseUrl}/inventories/addass`,itemToAdd)
  }

 /*remove this when real api will be up */
  getFakeListUpdated(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.baseUrl}/new-item.json`)
  }

 /* updHomeDataTable(): Observable<InventoryItem[]> {
    return this.http.update<InventoryItem[]>(`${this.baseUrl}/home-table.json`)
  } */
}
