import { Metadata } from "next"
import { Suspense } from "react"
import { ResultadoMedioContent } from "./medio-content"

export const metadata: Metadata = {
  title: "Resultado: Estrés Medio - Evaluación Académica",
  description: "Tu nivel de estrés académico es medio. Revisa los factores señalados y considera las recomendaciones.",
}

interface PageProps {
  searchParams: Promise<{ prediction: string }>
}

export default async function ResultadoMedioPage({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Cargando...</div>}>
      <ResultadoMedioContent searchParams={searchParams} />
    </Suspense>
  )
}