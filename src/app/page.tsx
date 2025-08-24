"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Calendar,
  Car,
  Users,
  Baby,
  UserCheck,
  Activity,
  Settings,
  CheckCircle2,
  FileText,
  StickyNote,
  BarChart3,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

import {
  defaultCampus,
  serviceTypes,
  CHART_COLORS,
  uid,
} from "@/lib/constants";
import { buildMetrics } from "@/lib/metrics";
import { exportCSV } from "@/lib/export";
import { seed } from "@/lib/demo-data";
import { ServiceRecord, FormData } from "@/types";
import { labelOf } from "@/lib/utils";
import {
  Labeled,
  NumberField,
  Divider,
  KPI,
  ToggleRow,
  SchemaBlock,
} from "@/components/ui-helpers";

export default function ISGAttendanceApp() {
  const [records, setRecords] = useState<ServiceRecord[]>(seed);
  const [loading, setLoading] = useState(false);
  const [activeCampus, setActiveCampus] = useState(defaultCampus.id);

  const [form, setForm] = useState<FormData>({
    date: new Date().toISOString().slice(0, 10),
    time: "19:00",
    campusId: defaultCampus.id,
    serviceType: "celebracao",
    serviceName: "",
    minister: "",
    presentesTotal: "",
    membrosPresentes: "",
    membrosAdultos: "",
    membrosCriancas: "",
    visitantesTotal: "",
    visitantesCriancas: "",
    visitantesAdultos: "",
    decisoesAdultos: "",
    decisoesCriancas: "",
    voluntarios: "",
    carrosInterno: "",
    motosInterno: "",
    carrosRua: "",
    motosRua: "",
    responsavelAta: "",
    observacoes: "",
  });

  function handleChange(name: string, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate network latency
    setTimeout(() => {
      const rec: ServiceRecord = {
        id: uid(),
        date: form.date,
        time: form.time,
        campusId: form.campusId,
        serviceType: form.serviceType,
        serviceName:
          form.serviceName || labelOf(serviceTypes, form.serviceType),
        minister: form.minister,
        totals: {
          presentesTotal: Number(form.presentesTotal) || 0,
          membrosPresentes: Number(form.membrosPresentes) || 0,
          membrosAdultos: Number(form.membrosAdultos) || 0,
          membrosCriancas: Number(form.membrosCriancas) || 0,
          visitantesTotal: Number(form.visitantesTotal) || 0,
          visitantesCriancas: Number(form.visitantesCriancas) || 0,
          visitantesAdultos: Number(form.visitantesAdultos) || 0,
          decisoesAdultos: Number(form.decisoesAdultos) || 0,
          decisoesCriancas: Number(form.decisoesCriancas) || 0,
          voluntarios: Number(form.voluntarios) || 0,
        },
        estacionamento: {
          interno: {
            carros: Number(form.carrosInterno) || 0,
            motos: Number(form.motosInterno) || 0,
          },
          rua: {
            carros: Number(form.carrosRua) || 0,
            motos: Number(form.motosRua) || 0,
          },
        },
        responsavelAta: form.responsavelAta,
        observacoes: form.observacoes,
        createdAt: new Date().toISOString(),
      };
      setRecords((r) => [rec, ...r]);
      setLoading(false);
    }, 600);
  }

  const metrics = useMemo(
    () => buildMetrics(records.filter((r) => r.campusId === activeCampus)),
    [records, activeCampus]
  );

  return (
    <div className="min-h-screen bg-neutral-50 p-4 md:p-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            ISG • Frequência & BI
          </h1>
          <p className="text-sm text-neutral-500">
            Lançamentos fáceis • Visualização clara • Pronto para BI
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={activeCampus} onValueChange={setActiveCampus}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Campus" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={defaultCampus.id}>
                {defaultCampus.name}
              </SelectItem>
              <SelectItem value="isg-zona-leste">ISG Zona Leste</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => exportCSV(records)}>
            Exportar CSV
          </Button>
        </div>
      </header>

      <Tabs defaultValue="lancar" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="lancar">Lançar</TabsTrigger>
          <TabsTrigger value="registros">Registros</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        {/* Lançar */}
        <TabsContent value="lancar">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Novo Lançamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit}
                className="grid md:grid-cols-4 gap-4"
              >
                <Labeled label="Data">
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                  />
                </Labeled>
                <Labeled label="Hora">
                  <Input
                    type="time"
                    value={form.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                  />
                </Labeled>
                <Labeled label="Tipo de Culto">
                  <Select
                    value={form.serviceType}
                    onValueChange={(v) => handleChange("serviceType", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Labeled>
                <Labeled label="Nome do Culto">
                  <Input
                    value={form.serviceName}
                    onChange={(e) =>
                      handleChange("serviceName", e.target.value)
                    }
                    placeholder="Ex.: Culto Geração Holy"
                  />
                </Labeled>
                <Labeled label="Ministério/Pregador">
                  <Input
                    value={form.minister}
                    onChange={(e) => handleChange("minister", e.target.value)}
                    placeholder="Ex.: Pr. Potthyer Vieira"
                  />
                </Labeled>

                <Divider title="Frequência" />
                <NumberField
                  icon={<Users />}
                  label="Presentes (Total)"
                  name="presentesTotal"
                  form={form}
                  onChange={handleChange}
                />
                <NumberField
                  icon={<Users />}
                  label="Membros Presentes"
                  name="membrosPresentes"
                  form={form}
                  onChange={handleChange}
                />
                <NumberField
                  icon={<UserCheck />}
                  label="Membros Adultos"
                  name="membrosAdultos"
                  form={form}
                  onChange={handleChange}
                />
                <NumberField
                  icon={<Baby />}
                  label="Membros Crianças"
                  name="membrosCriancas"
                  form={form}
                  onChange={handleChange}
                />
                <NumberField
                  icon={<Users />}
                  label="Visitantes (Total)"
                  name="visitantesTotal"
                  form={form}
                  onChange={handleChange}
                />
                <NumberField
                  icon={<Baby />}
                  label="Visitantes Crianças"
                  name="visitantesCriancas"
                  form={form}
                  onChange={handleChange}
                />
                <NumberField
                  icon={<Users />}
                  label="Visitantes Adultos"
                  name="visitantesAdultos"
                  form={form}
                  onChange={handleChange}
                />
                <NumberField
                  icon={<CheckCircle2 />}
                  label="Aceitaram Jesus (Adultos)"
                  name="decisoesAdultos"
                  form={form}
                  onChange={handleChange}
                />
                <NumberField
                  icon={<CheckCircle2 />}
                  label="Aceitaram Jesus (Crianças)"
                  name="decisoesCriancas"
                  form={form}
                  onChange={handleChange}
                />
                <NumberField
                  icon={<Activity />}
                  label="Voluntários Presentes"
                  name="voluntarios"
                  form={form}
                  onChange={handleChange}
                />

                <Divider title="Estacionamento (Interno)" />
                <NumberField
                  icon={<Car />}
                  label="Carros (Frente/Dentro)"
                  name="carrosInterno"
                  form={form}
                  onChange={handleChange}
                />
                <NumberField
                  icon={<Car />}
                  label="Motos (Frente/Dentro)"
                  name="motosInterno"
                  form={form}
                  onChange={handleChange}
                />

                <Divider title="Estacionamento (Rua)" />
                <NumberField
                  icon={<Car />}
                  label="Carros (Rua)"
                  name="carrosRua"
                  form={form}
                  onChange={handleChange}
                />
                <NumberField
                  icon={<Car />}
                  label="Motos (Rua)"
                  name="motosRua"
                  form={form}
                  onChange={handleChange}
                />

                <Labeled className="md:col-span-2" label="Responsável pela Ata">
                  <Input
                    value={form.responsavelAta}
                    onChange={(e) =>
                      handleChange("responsavelAta", e.target.value)
                    }
                    placeholder="Nome completo"
                  />
                </Labeled>
                <Labeled className="md:col-span-4" label="Observações">
                  <Textarea
                    value={form.observacoes}
                    onChange={(e) =>
                      handleChange("observacoes", e.target.value)
                    }
                    placeholder="Informações relevantes do culto"
                  />
                </Labeled>

                <div className="md:col-span-4 flex items-center gap-3">
                  <Button
                    type="submit"
                    className="min-w-[160px]"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : null}
                    Salvar Lançamento
                  </Button>
                  <span className="text-xs text-neutral-500">
                    Dica: após salvar você pode editar no painel "Registros".
                  </span>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Registros */}
        <TabsContent value="registros">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <StickyNote className="h-5 w-5" />
                Registros Recentes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-neutral-500">
                      <th className="p-2">Data</th>
                      <th className="p-2">Culto</th>
                      <th className="p-2">Ministério</th>
                      <th className="p-2">Presentes</th>
                      <th className="p-2">Membros</th>
                      <th className="p-2">Visitantes</th>
                      <th className="p-2">Decisões</th>
                      <th className="p-2">Voluntários</th>
                      <th className="p-2">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records
                      .filter((r) => r.campusId === activeCampus)
                      .map((r) => (
                        <tr key={r.id} className="border-b">
                          <td className="p-2 whitespace-nowrap">
                            {r.date} {r.time}
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            {r.serviceName}
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            {r.minister}
                          </td>
                          <td className="p-2">{r.totals.presentesTotal}</td>
                          <td className="p-2">{r.totals.membrosPresentes}</td>
                          <td className="p-2">{r.totals.visitantesTotal}</td>
                          <td className="p-2">
                            {r.totals.decisoesAdultos +
                              r.totals.decisoesCriancas}
                          </td>
                          <td className="p-2">{r.totals.voluntarios}</td>
                          <td className="p-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                alert("Editar: implemente modal/rota de edição")
                              }
                            >
                              Editar
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dashboard */}
        <TabsContent value="dashboard">
          <div className="grid xl:grid-cols-4 gap-4">
            <KPI
              title="Presentes (30d)"
              value={metrics.sum.presentes}
              icon={<Users />}
            />
            <KPI
              title="Visitantes (30d)"
              value={metrics.sum.visitantes}
              icon={<Users />}
            />
            <KPI
              title="Decisões por Cristo (30d)"
              value={metrics.sum.decisoes}
              icon={<CheckCircle2 />}
            />
            <KPI
              title="Voluntários (média)"
              value={metrics.avg.voluntarios.toFixed(0)}
              icon={<Activity />}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Evolução de Presença
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metrics.byDate}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="presentesTotal"
                      stroke={CHART_COLORS[0]}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Composição de Público</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer>
                  <BarChart data={[metrics.composicao]}>
                    <XAxis dataKey="name" hide />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Membros" fill={CHART_COLORS[1]} />
                    <Bar dataKey="Visitantes" fill={CHART_COLORS[2]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversões</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={metrics.decisionsPie}
                      outerRadius={100}
                      label
                    >
                      {metrics.decisionsPie.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={CHART_COLORS[index % CHART_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estacionamento — Carros x Motos</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer>
                  <BarChart data={metrics.parking}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Carros" fill={CHART_COLORS[3]} />
                    <Bar dataKey="Motos" fill={CHART_COLORS[4]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Admin */}
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Admin & Integrações
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Configurações do Culto</h3>
                <div className="space-y-3">
                  <ToggleRow label="Exigir responsável pela ata" />
                  <ToggleRow label="Permitir edição após 7 dias" />
                  <ToggleRow label="Habilitar multicapus (multi-tenant)" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">BI & Exportação</h3>
                <p className="text-sm text-neutral-600 mb-3">
                  Integre com seu Data Warehouse. Recomendado: Supabase
                  (Postgres) + dbt + Metabase/Power BI. Disponibilize um
                  endpoint /api/records para ETL.
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => alert("Webhook salvo (demo)")}
                  >
                    Salvar Webhook
                  </Button>
                  <Button onClick={() => exportCSV(records)}>
                    Exportar CSV
                  </Button>
                </div>
              </div>

              <div className="md:col-span-2">
                <SchemaBlock />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <footer className="mt-8 text-xs text-neutral-500">
        © {new Date().getFullYear()} ISG — Frequência & BI • Skeleton
      </footer>
    </div>
  );
}
