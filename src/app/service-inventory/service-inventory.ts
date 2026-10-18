import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetModel, AssetItem } from '../../yaml/home-table';

@Injectable({
  providedIn: 'root',
})
export class ServiceInventory {

  private baseUrl = 'http://localhost:3000/api'
  constructor(private http:HttpClient){

  }
  getHomeDataTable(): Observable<AssetItem[]> {
    return this.http.get<AssetItem[]>(`${this.baseUrl}/inventories/readlist`)
  }

  addHomeDataTable(itemToAdd: AssetItem): Observable<AssetItem> {
    console.log("body:",itemToAdd)
     return this.http.post<AssetItem>(`${this.baseUrl}/inventories/addass`,itemToAdd)
  }

  readOneAss(num_inv?:string): Observable<AssetItem>{
    return this.http.get<AssetItem>(`${this.baseUrl}/inventories/readoneass?num_inv=${num_inv}`)
  }

/************CRUD MODELS**********************/

//GET NAME LIST MODEL
  getModelNames(): Observable<string[]>{
    return this.http.get<string[]>(`${this.baseUrl}/inventories/modelnames`)
  }

//GET ONE MODEL'S NAME
  getModelOneName(name:string): Observable<AssetModel>{
    return this.http.get<AssetModel>(`${this.baseUrl}/inventories/type?modelname=${name}`)
  }

//GET LIST OF FULL MODELS (name, fields) 
  getModelList(): Observable<AssetModel[]>{
    return this.http.get<AssetModel[]>(`${this.baseUrl}/inventories/typelist`)
  }

//CREATE MODEL
createModel(body:AssetModel): Observable<AssetModel>{
    return this.http.post<AssetModel>(`${this.baseUrl}/inventories/type`,body)
  }
/***********************************************/

/************CRUD ASSETS**********************/
createAsset(body:AssetItem): Observable<[]>{
    return this.http.post<[]>(`${this.baseUrl}/inventories/assets`,body)
  }

readAssetHome(): Observable<AssetItem[]>{
  return this.http.get<AssetItem[]>(`${this.baseUrl}/inventories/assetshome`)
  }  

readAssetFull(matricola:string): Observable<AssetItem>{
  return this.http.get<AssetItem>(`${this.baseUrl}/inventories/assetonefull?matricola=${matricola}`)
  } 
}
