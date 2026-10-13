import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetModel, InventoryItem } from '../../yaml/home-table';

@Injectable({
  providedIn: 'root',
})
export class ServiceInventory {

  private baseUrl = 'http://localhost:3000/api'
  constructor(private http:HttpClient){

  }
  getHomeDataTable(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(`${this.baseUrl}/inventories/readlist`)
  }

  createAssetType(body:AssetModel): Observable<AssetModel>{
    return this.http.post<AssetModel>(`${this.baseUrl}/inventories/type`,body)
  }

  addHomeDataTable(itemToAdd: InventoryItem): Observable<InventoryItem> {
    console.log("body:",itemToAdd)
     return this.http.post<InventoryItem>(`${this.baseUrl}/inventories/addass`,itemToAdd)
  }

  readOneAss(num_inv?:string): Observable<InventoryItem>{
    return this.http.get<InventoryItem>(`${this.baseUrl}/inventories/readoneass?num_inv=${num_inv}`)
  }

  getModelNames(): Observable<string[]>{
    return this.http.get<string[]>(`${this.baseUrl}/inventories/modelnames`)
  }

  getModel(name:string): Observable<AssetModel>{
    return this.http.get<AssetModel>(`${this.baseUrl}/inventories/type?modelname=${name}`)
  }

  getModelList(): Observable<AssetModel[]>{
    return this.http.get<AssetModel[]>(`${this.baseUrl}/inventories/typelist`)
  }

 /* updHomeDataTable(): Observable<InventoryItem[]> {
    return this.http.update<InventoryItem[]>(`${this.baseUrl}/home-table.json`)
  } */
}
