import { PrismaClient } from "@prisma/client";
import { seed } from "../src/lib/demo-data";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create campus
  const campus = await prisma.campus.upsert({
    where: { id: "isg-matriz" },
    update: {},
    create: {
      id: "isg-matriz",
      name: "ISG Matriz",
    },
  });

  console.log("✅ Campus created:", campus.name);

  // Create service records
  for (const record of seed) {
    await prisma.serviceRecord.upsert({
      where: { id: record.id },
      update: {},
      create: {
        id: record.id,
        date: new Date(record.date),
        time: record.time,
        campusId: record.campusId,
        serviceType: record.serviceType,
        serviceName: record.serviceName,
        minister: record.minister,
        presentesTotal: record.totals.presentesTotal,
        membrosPresentes: record.totals.membrosPresentes,
        membrosAdultos: record.totals.membrosAdultos,
        membrosCriancas: record.totals.membrosCriancas,
        visitantesTotal: record.totals.visitantesTotal,
        visitantesCriancas: record.totals.visitantesCriancas,
        visitantesAdultos: record.totals.visitantesAdultos,
        decisoesAdultos: record.totals.decisoesAdultos,
        decisoesCriancas: record.totals.decisoesCriancas,
        voluntarios: record.totals.voluntarios,
        carrosInterno: record.estacionamento.interno.carros,
        motosInterno: record.estacionamento.interno.motos,
        carrosRua: record.estacionamento.rua.carros,
        motosRua: record.estacionamento.rua.motos,
        responsavelAta: record.responsavelAta,
        observacoes: record.observacoes,
        createdAt: new Date(record.createdAt),
      },
    });
  }

  console.log(`✅ ${seed.length} service records created`);
  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
