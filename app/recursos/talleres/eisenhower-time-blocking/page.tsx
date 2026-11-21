import { Metadata } from "next"
import TallerEisenhowerContent from "./eisenhower-content"

export const metadata: Metadata = {
  title: "Taller: Matriz de Eisenhower + Time Blocking",
  description: "Taller guiado de 15 minutos para clasificar tareas y bloquear tiempo efectivamente.",
}

export default function TallerEisenhowerPage() {
  return <TallerEisenhowerContent />
}