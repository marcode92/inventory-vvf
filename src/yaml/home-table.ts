export interface AssetItem {
  matricola?: string,
  annotazioni?: string,
  stanza?: string,
  possessori?: string,
  last_update?: Date,
  fuori_uso?: boolean,
  assetFields?: Fields[],
}

export interface Fields {
  nome_campo?: string,
  tipo_campo?:string,
  value?:string | number | boolean,
}

export interface AssetModel {
  nome_modello?:string,
  campi?: Fields[],
}

export enum TipoCampo {
  NUME = 'Numerico',
  ALFA = 'Alfanumerico',
  BOOL = 'Decisionale',
}