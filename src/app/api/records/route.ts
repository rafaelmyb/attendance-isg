import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const campusId = searchParams.get("campusId");

    const where: any = {};

    if (from || to) {
      where.date = {};
      if (from) where.date.gte = new Date(from);
      if (to) where.date.lte = new Date(to);
    }

    if (campusId) {
      where.campusId = campusId;
    }

    const records = await prisma.serviceRecord.findMany({
      where,
      orderBy: { date: "desc" },
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error("Error fetching records:", error);
    return NextResponse.json(
      { error: "Failed to fetch records" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const record = await prisma.serviceRecord.create({
      data: {
        date: new Date(body.date),
        time: body.time,
        campusId: body.campusId,
        serviceType: body.serviceType,
        serviceName: body.serviceName,
        minister: body.minister,
        presentesTotal: body.presentesTotal,
        membrosPresentes: body.membrosPresentes,
        membrosAdultos: body.membrosAdultos,
        membrosCriancas: body.membrosCriancas,
        visitantesTotal: body.visitantesTotal,
        visitantesCriancas: body.visitantesCriancas,
        visitantesAdultos: body.visitantesAdultos,
        decisoesAdultos: body.decisoesAdultos,
        decisoesCriancas: body.decisoesCriancas,
        voluntarios: body.voluntarios,
        carrosInterno: body.carrosInterno,
        motosInterno: body.motosInterno,
        carrosRua: body.carrosRua,
        motosRua: body.motosRua,
        responsavelAta: body.responsavelAta,
        observacoes: body.observacoes,
      },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Error creating record:", error);
    return NextResponse.json(
      { error: "Failed to create record" },
      { status: 500 }
    );
  }
}
