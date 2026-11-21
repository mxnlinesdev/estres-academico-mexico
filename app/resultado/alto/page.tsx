import { Metadata } from "next"
import { Suspense } from "react"
import { ResultadoAltoContent } from "./alto-content"

export const metadata: Metadata = {
  title: "Resultado: Estrés Alto - Evaluación Académica",
  description: "Tu nivel de estrés académico es alto. Te recomendamos buscar apoyo profesional. Línea de la Vida: 800 911 2000 (24/7).",
}

interface PageProps {
  searchParams: Promise<{ prediction: string }>
}

export default async function ResultadoAltoPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ResultadoAltoContent searchParams={searchParams} />
    </Suspense>
  )
}