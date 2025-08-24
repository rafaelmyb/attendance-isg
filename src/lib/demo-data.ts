import { ServiceRecord } from "@/types";
import { uid } from "./constants";

const defaultCampus = { id: "isg-matriz", name: "ISG Matriz" };

export const seed: ServiceRecord[] = [
  {
    id: uid(),
    date: "2025-01-17",
    time: "19:00",
    campusId: defaultCampus.id,
    serviceType: "gsg",
    serviceName: "Culto Geração Holy",
    minister: "Pr. Potthyer Vieira",
    totals: {
      presentesTotal: 157,
      membrosPresentes: 151,
      membrosAdultos: 142,
      membrosCriancas: 9,
      visitantesTotal: 6,
      visitantesCriancas: 0,
      visitantesAdultos: 6,
      decisoesAdultos: 0,
      decisoesCriancas: 0,
      voluntarios: 28,
    },
    estacionamento: {
      interno: { carros: 16, motos: 15 },
      rua: { carros: 11, motos: 1 },
    },
    responsavelAta: "Josiane Nunes",
    observacoes: "Culto com foco em discipulado profético jovem.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uid(),
    date: "2025-01-10",
    time: "19:00",
    campusId: defaultCampus.id,
    serviceType: "celebracao",
    serviceName: "Culto de Celebração",
    minister: "Pr. João Silva",
    totals: {
      presentesTotal: 142,
      membrosPresentes: 135,
      membrosAdultos: 128,
      membrosCriancas: 7,
      visitantesTotal: 7,
      visitantesCriancas: 2,
      visitantesAdultos: 5,
      decisoesAdultos: 2,
      decisoesCriancas: 1,
      voluntarios: 25,
    },
    estacionamento: {
      interno: { carros: 14, motos: 12 },
      rua: { carros: 9, motos: 2 },
    },
    responsavelAta: "Maria Santos",
    observacoes: "Culto com muita adoração e presença de Deus.",
    createdAt: new Date().toISOString(),
  },
];
