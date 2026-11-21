import { Metadata } from "next"
import RecursosContent from "./recursos-content"

export const metadata: Metadata = {
  title: "Recursos - Estrés Académico México",
  description: "Biblioteca de recursos: lecturas, talleres, guías, plantillas y checklists para el manejo del estrés académico.",
}

export default function RecursosPage() {
  return <RecursosContent />
}