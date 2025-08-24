export interface ServiceRecord {
  id: string;
  date: string;
  time: string;
  campusId: string;
  serviceType: string;
  serviceName: string;
  minister: string;
  totals: {
    presentesTotal: number;
    membrosPresentes: number;
    membrosAdultos: number;
    membrosCriancas: number;
    visitantesTotal: number;
    visitantesCriancas: number;
    visitantesAdultos: number;
    decisoesAdultos: number;
    decisoesCriancas: number;
    voluntarios: number;
  };
  estacionamento: {
    interno: { carros: number; motos: number };
    rua: { carros: number; motos: number };
  };
  responsavelAta: string;
  observacoes?: string;
  createdAt: string;
}

export interface ServiceType {
  id: string;
  label: string;
}

export interface Campus {
  id: string;
  name: string;
}

export interface FormData {
  date: string;
  time: string;
  campusId: string;
  serviceType: string;
  serviceName: string;
  minister: string;
  presentesTotal: string;
  membrosPresentes: string;
  membrosAdultos: string;
  membrosCriancas: string;
  visitantesTotal: string;
  visitantesCriancas: string;
  visitantesAdultos: string;
  decisoesAdultos: string;
  decisoesCriancas: string;
  voluntarios: string;
  carrosInterno: string;
  motosInterno: string;
  carrosRua: string;
  motosRua: string;
  responsavelAta: string;
  observacoes: string;
  [key: string]: string;
}

export interface Metrics {
  sum: {
    presentes: number;
    visitantes: number;
    decisoes: number;
  };
  avg: {
    voluntarios: number;
  };
  byDate: Array<{
    date: string;
    presentesTotal: number;
  }>;
  composicao: {
    name: string;
    Membros: number;
    Visitantes: number;
  };
  decisionsPie: Array<{
    name: string;
    value: number;
  }>;
  parking: Array<{
    label: string;
    Carros: number;
    Motos: number;
  }>;
}
