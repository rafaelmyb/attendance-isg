import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { LucideIcon } from "lucide-react";

interface LabeledProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const Labeled = ({ label, children, className }: LabeledProps) => {
  return (
    <div className={className}>
      <Label className="text-xs text-neutral-600">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
};

interface NumberFieldProps {
  label: string;
  name: string;
  form: Record<string, string>;
  onChange: (name: string, value: string) => void;
  icon: React.ReactNode;
}

export const NumberField = ({
  label,
  name,
  form,
  onChange,
  icon,
}: NumberFieldProps) => {
  return (
    <Labeled label={label}>
      <div className="relative">
        <Input
          inputMode="numeric"
          value={form[name]}
          onChange={(e) =>
            onChange(name, e.target.value.replace(/[^0-9]/g, ""))
          }
          placeholder="0"
        />
        <div className="absolute right-2 top-2.5 opacity-40">{icon}</div>
      </div>
    </Labeled>
  );
};

interface DividerProps {
  title: string;
}

export const Divider = ({ title }: DividerProps) => {
  return (
    <div className="md:col-span-4 pt-2">
      <div className="text-[11px] uppercase tracking-wide text-neutral-400 mb-2">
        {title}
      </div>
    </div>
  );
};

interface KPIProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export const KPI = ({ title, value, icon }: KPIProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-neutral-500 flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          {value}
        </motion.div>
      </CardContent>
    </Card>
  );
};

interface ToggleRowProps {
  label: string;
}

export const ToggleRow = ({ label }: ToggleRowProps) => {
  const [v, setV] = React.useState(true);
  return (
    <div className="flex items-center justify-between bg-white border rounded-xl px-3 py-2">
      <span className="text-sm">{label}</span>
      <Switch checked={v} onCheckedChange={setV} />
    </div>
  );
};

export const SchemaBlock = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Esquema de Dados (API/DB)</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="text-xs whitespace-pre-wrap leading-5">
          {`// Entidade: ServiceRecord (Postgres/Prisma)
model ServiceRecord {
  id               String   @id @default(cuid())
  date             DateTime
  time             String
  campusId         String
  serviceType      String
  serviceName      String
  minister         String
  presentesTotal   Int
  membrosPresentes Int
  membrosAdultos   Int
  membrosCriancas  Int
  visitantesTotal  Int
  visitantesCriancas Int
  visitantesAdultos  Int
  decisoesAdultos    Int
  decisoesCriancas   Int
  voluntarios        Int
  carrosInterno    Int
  motosInterno     Int
  carrosRua        Int
  motosRua         Int
  responsavelAta   String
  observacoes      String?
  createdAt        DateTime @default(now())
}

// Endpoints (Next.js API Routes)
// GET /api/records?from=YYYY-MM-DD&to=YYYY-MM-DD
// POST /api/records  -> cria um registro
// PUT /api/records/:id -> atualiza
// DELETE /api/records/:id -> remove

// Segurança
// • JWT por organização (multi-tenant)
// • RBAC: Admin, Pastor, Líder, Escriturário
// • Auditoria: whoDid, when, before/after snapshot

// BI
// • Exportador CSV/JSON
// • Webhook: envia cada lançamento para Data Warehouse
// • Tabelas derivadas: d_date, f_attendance, d_service, d_campus
`}
        </pre>
      </CardContent>
    </Card>
  );
};
