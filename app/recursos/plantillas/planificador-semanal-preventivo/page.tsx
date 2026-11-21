import { Metadata } from "next"
import PlanificadorPreventivoContent from "./planificador-preventivo-content"

export const metadata: Metadata = {
  title: "Plantilla: Planificador semanal preventivo",
  description: "Planificador visual semanal con bloques de tiempo para organizar estudio, descanso y autocuidado.",
}

export default function PlanificadorSemanalPreventivoPage() {
  return <PlanificadorPreventivoContent />
}