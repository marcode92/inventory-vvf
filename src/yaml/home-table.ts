export interface AssetItem {
  matricola?: string,
  annotazioni?: string,
  stanza?: string,
  possessori?: string,
  last_update?: Date,
  fuori_uso?: boolean,
  assetFields?: Fields[],
  disableMatricola?:boolean,
}

export interface Fields {
  nome_campo?: string,
  tipo_campo?:string,
  value?:string | number | boolean,
}

export interface AssetModel {
  nomeModello?:string,
  campi?: Fields[],
}

export enum TipoCampo {
  NUME = 'Numerico',
  ALFA = 'Alfanumerico',
  BOOL = 'Decisionale',
}

export enum MenuAction {
  CREATE_ASSET = 'createasset',
  CREATE_MODEL = 'createmodel',
  UPLOAD_JSON = 'uploadfile'
}

export enum TypeUser {
  WATCHER = 'watcher', // può solo leggere
  ADMIN = 'admin', // può fare tutto
}