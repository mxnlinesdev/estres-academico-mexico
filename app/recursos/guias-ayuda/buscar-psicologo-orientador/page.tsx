import { Metadata } from "next"
import BuscarPsicologoContent from "./buscar-psicologo-content"

export const metadata: Metadata = {
  title: "Buscar psicólogo / orientador escolar cercano",
  description: "Guía para encontrar psicólogo, orientador escolar o terapeuta cerca de ti. Opciones públicas y privadas.",
}

export default function BuscarPsicologoPage() {
  return <BuscarPsicologoContent />
}