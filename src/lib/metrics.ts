import { ServiceRecord, Metrics } from "@/types";
import { daysFromNow, fmtDate, avgNum, sumOf } from "./utils";

export function buildMetrics(records: ServiceRecord[]): Metrics {
  const last30 = records.filter((r) => daysFromNow(r.date) <= 30);

  const sum = {
    presentes: last30.reduce((a, b) => a + b.totals.presentesTotal, 0),
    visitantes: last30.reduce((a, b) => a + b.totals.visitantesTotal, 0),
    decisoes: last30.reduce(
      (a, b) => a + b.totals.decisoesAdultos + b.totals.decisoesCriancas,
      0
    ),
  };

  const avg = {
    voluntarios: avgNum(last30.map((r) => r.totals.voluntarios)),
  };

  const byDate = [...records]
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((r) => ({
      date: fmtDate(r.date),
      presentesTotal: r.totals.presentesTotal,
    }));

  const composicao = {
    name: "Composição",
    Membros:
      sum.presentes - last30.reduce((a, b) => a + b.totals.visitantesTotal, 0),
    Visitantes: last30.reduce((a, b) => a + b.totals.visitantesTotal, 0),
  };

  const decisionsPie = [
    {
      name: "Adultos",
      value: last30.reduce((a, b) => a + b.totals.decisoesAdultos, 0),
    },
    {
      name: "Crianças",
      value: last30.reduce((a, b) => a + b.totals.decisoesCriancas, 0),
    },
  ];

  const parking = [
    {
      label: "Interno",
      Carros: sumOf(last30.map((r) => r.estacionamento.interno.carros)),
      Motos: sumOf(last30.map((r) => r.estacionamento.interno.motos)),
    },
    {
      label: "Rua",
      Carros: sumOf(last30.map((r) => r.estacionamento.rua.carros)),
      Motos: sumOf(last30.map((r) => r.estacionamento.rua.motos)),
    },
  ];

  return { sum, avg, byDate, composicao, decisionsPie, parking };
}
