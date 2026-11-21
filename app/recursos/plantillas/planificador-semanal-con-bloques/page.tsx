import { Metadata } from "next"
import PlanificadorConBloquesContent from "./planificador-con-bloques-content"

export const metadata: Metadata = {
  title: "Plantilla: Planificador semanal con bloques de tiempo",
  description: "Planificador visual semanal con bloques de tiempo para organizar estudio, descanso y autocuidado.",
}

export default function PlanificadorSemanalConBloquesPage() {
  return <PlanificadorConBloquesContent />
}