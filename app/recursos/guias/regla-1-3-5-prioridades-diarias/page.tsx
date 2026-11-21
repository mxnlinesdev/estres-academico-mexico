import { Metadata } from "next"
import GuiaRegla135Content from "./regla-1-3-5-content"

export const metadata: Metadata = {
  title: "Guía: Regla 1-3-5 para prioridades diarias",
  description: "Método simple para definir prioridades diarias: 1 grande, 3 medianas, 5 pequeñas.",
}

export default function GuiaRegla135Page() {
  return <GuiaRegla135Content />
}