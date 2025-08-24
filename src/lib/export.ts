import { ServiceRecord } from "@/types";

export function exportCSV(data: ServiceRecord[]) {
  const rows = data.map((r) => ({
    id: r.id,
    date: r.date,
    time: r.time,
    campusId: r.campusId,
    serviceType: r.serviceType,
    serviceName: r.serviceName,
    minister: r.minister,
    presentesTotal: r.totals.presentesTotal,
    membrosPresentes: r.totals.membrosPresentes,
    membrosAdultos: r.totals.membrosAdultos,
    membrosCriancas: r.totals.membrosCriancas,
    visitantesTotal: r.totals.visitantesTotal,
    visitantesCriancas: r.totals.visitantesCriancas,
    visitantesAdultos: r.totals.visitantesAdultos,
    decisoesAdultos: r.totals.decisoesAdultos,
    decisoesCriancas: r.totals.decisoesCriancas,
    voluntarios: r.totals.voluntarios,
    carrosInterno: r.estacionamento.interno.carros,
    motosInterno: r.estacionamento.interno.motos,
    carrosRua: r.estacionamento.rua.carros,
    motosRua: r.estacionamento.rua.motos,
    responsavelAta: r.responsavelAta,
    observacoes: r.observacoes,
  }));

  const header = Object.keys(rows[0] || { id: "id" }).join(",");
  const body = rows.map((r) => Object.values(r).join(",")).join("\n");
  const blob = new Blob([header + "\n" + body], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `isg-frequencia-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
