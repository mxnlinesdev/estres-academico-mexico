import { Metadata } from "next"
import GuiaPrimerosPasosContent from "./primeros-pasos-content"

export const metadata: Metadata = {
  title: "Guía: Primeros pasos para buscar ayuda profesional hoy",
  description: "Guía accionable paso a paso para acceder a ayuda profesional en salud mental.",
}

export default function GuiaPrimerosPasosPage() {
  return <GuiaPrimerosPasosContent />
}