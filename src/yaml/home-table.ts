export interface AssetItem {
  cat_tipo?: string,
  num_inv?: string,
  sec_pdci?: string,
  denominazione?: string,
  matricola?: string,
  annotazioni?: string,
  stanza?: string,
  possessori?: string,
  last_update?: Date,
  fuori_uso?: boolean,
  fieldsItemToSave?: FieldsItem[],
  modelName?: string;
}

export interface FieldsItem {
  idField?:string;
  value?:string | number | boolean,
}

/* export interface AssetItem {
  PC: {
    NomePC: string,
    Dominio: string,
    UUID: string,
    AssetTag: string,
    SerialeBIOS: string,
    ProduttoreBIOS: string
    VersioneBIOS: string,
    ModelloComputer: string,
    FamigliaComputer: string,
    TipoSistema: string,
    ChassisType: string,
  },
  OS: {
    VersioneDisplay: string,
    BuildWindows: string,
    Architettura: string,
    DataInstallazioneOS: string,
    DominioSistemaOperativo: string,
    SistemaOperativo: string,
    VersioneSistemaOperativo: string,
  },
  CPU: {
    SocketCPU: string,
    ThreadCPU: string,
    ModelloCPU: string,
    ProduttoreCPU: string,
    VelocitaCPU_MHz: string,
    Core: number,
  },
  RAM: {
    RAMTotaleMB: number,
    NumeroModuliRAMInUso: number,
    Moduli: {
      Produttore: string,
      PartNumber: string,
      Seriale: string,
      CapacitaMB: number,
      VelocitaMHz: number,
      Tipo: string,
    },
  }
  HDD: {
    Modello: string,
    Seriale: string,
    Firmware: string,
    CapacitaGB: number,
    BusType: string,
    MediaType: string,
  },
  MTB: {
    Produttore: string,
    Modello: string,
    Versione: string
  },
  VIDEOINFO: [
    {
      Produttore: string,
      Modello: string,
      Tipo: string
    },
    {
      Produttore: string,
      Modello: string,
      Tipo: string
    }
  ],
  NETINFO: {
    Produttore: string,
    Modello: string,
    Tecnologia: string,
    MACAddress: string,
    VelocitaMassimaMbps: number
  },
  SCREENINFO: {
    Produttore: string,
    Modello: string,
    NumeroSerie: string
  }

} */

export interface AssetModel {
  nome_modello?:string,
  campi?: FieldsModel[],
}

export interface FieldsModel {
    idField?:string,
    nome_campo?: string,
    tipo_campo?:string,
    mandatory?: boolean,
}