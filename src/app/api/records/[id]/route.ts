import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const record = await prisma.serviceRecord.findUnique({
      where: { id: params.id },
    });

    if (!record) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json(record);
  } catch (error) {
    console.error("Error fetching record:", error);
    return NextResponse.json(
      { error: "Failed to fetch record" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const record = await prisma.serviceRecord.update({
      where: { id: params.id },
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

    return NextResponse.json(record);
  } catch (error) {
    console.error("Error updating record:", error);
    return NextResponse.json(
      { error: "Failed to update record" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.serviceRecord.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Record deleted successfully" });
  } catch (error) {
    console.error("Error deleting record:", error);
    return NextResponse.json(
      { error: "Failed to delete record" },
      { status: 500 }
    );
  }
}
