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

  readOneAss(num_inv?:string): Observable<InventoryItem>{
    return this.http.get<InventoryItem>(`${this.baseUrl}/inventories/readoneass?num_inv=${num_inv}`)
  }

 /* updHomeDataTable(): Observable<InventoryItem[]> {
    return this.http.update<InventoryItem[]>(`${this.baseUrl}/home-table.json`)
  } */
}
