import { Metadata } from "next"
import Lectura7HabitosContent from "./7-habitos-content"

export const metadata: Metadata = {
  title: "Lectura: 7 Hábitos de estudiantes altamente efectivos",
  description: "Lectura guiada de 10 minutos para reforzar y optimizar hábitos académicos.",
}

export default function Lectura7HabitosPage() {
  return <Lectura7HabitosContent />
}