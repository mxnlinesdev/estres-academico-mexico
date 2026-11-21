import { Metadata } from "next"
import LineaVidaContent from "./linea-vida-content"

export const metadata: Metadata = {
  title: "Llamar 800 911 2000 - Línea de la Vida",
  description: "Línea de la Vida CONASAMA: apoyo emocional gratuito, confidencial, 24/7 en todo México.",
}

export default function LineaVidaPage() {
  return <LineaVidaContent />
}