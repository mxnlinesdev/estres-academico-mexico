import { Metadata } from "next"
import RevisionSemanalContent from "./revision-semanal-content"

export const metadata: Metadata = {
  title: "Checklist: Revisión semanal de hábitos",
  description: "Checklist interactivo de 10 minutos para revisar tu semana y planificar la siguiente.",
}

export default function RevisionSemanalPage() {
  return <RevisionSemanalContent />
}